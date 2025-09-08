import { CheerioAPI, load as parseHTML } from 'cheerio';
import { fetchApi } from '@libs/fetch';
import { Filters, FilterTypes } from '@libs/filterInputs';
import { Plugin } from '@typings/plugin';

class NovelUpdates implements Plugin.PluginBase {
  id = 'novelupdates';
  name = 'Novel Updates';
  version = '0.9.1';
  icon = 'src/en/novelupdates/icon.png';
  customCSS = 'src/en/novelupdates/customCSS.css';
  site = 'https://www.novelupdates.com/';

  parseNovels(loadedCheerio: CheerioAPI) {
    const novels: Plugin.NovelItem[] = [];
    loadedCheerio('div.search_main_box_nu').each((_, el) => {
      const novelUrl = loadedCheerio(el).find('.search_title > a').attr('href');
      if (!novelUrl) return;
      novels.push({
        name: loadedCheerio(el).find('.search_title > a').text(),
        cover: loadedCheerio(el).find('img').attr('src'),
        path: novelUrl.replace(this.site, ''),
      });
    });
    return novels;
  }

  async popularNovels(
    page: number,
    {
      showLatestNovels,
      filters,
    }: Plugin.PopularNovelsOptions<typeof this.filters>,
  ): Promise<Plugin.NovelItem[]> {
    let url = this.site;

    // Build the URL based on filters
    if (showLatestNovels) {
      url += 'series-finder/?sf=1&sort=sdate&order=desc';
    } else if (
      filters?.sort.value === 'popmonth' ||
      filters?.sort.value === 'popular'
    ) {
      url += 'series-ranking/?rank=' + filters.sort.value;
    } else {
      url += 'series-finder/?sf=1';
      if (
        filters?.genres.value.include?.length ||
        filters?.genres.value.exclude?.length
      ) {
        url += '&mgi=' + filters.genre_operator.value;
      }
      if (filters?.novelType.value.length) {
        url += '&nt=' + filters.novelType.value.join(',');
      }
      if (filters?.reading_lists.value.length) {
        url += '&hd=' + filters?.reading_lists.value.join(',');
        url += '&mRLi=' + filters?.reading_list_operator.value;
      }
      url += '&sort=' + filters?.sort.value;
      url += '&order=' + filters?.order.value;
    }

    // Add common filters
    if (filters?.language.value.length)
      url += '&org=' + filters.language.value.join(',');
    if (filters?.genres.value.include?.length)
      url += '&gi=' + filters.genres.value.include.join(',');
    if (filters?.genres.value.exclude?.length)
      url += '&ge=' + filters.genres.value.exclude.join(',');
    if (filters?.storyStatus.value) url += '&ss=' + filters.storyStatus.value;

    url += '&pg=' + page;

    const result = await fetchApi(url);
    const body = await result.text();
    const loadedCheerio = parseHTML(body);
    return this.parseNovels(loadedCheerio);
  }

  async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    const url = this.site + novelPath;
    const result = await fetchApi(url);
    const body = await result.text();
    const loadedCheerio = parseHTML(body);

    const novel: Plugin.SourceNovel = {
      path: novelPath,
      name: loadedCheerio('.seriestitlenu').text() || 'Untitled',
      cover: loadedCheerio('.wpb_wrapper img').attr('src'),
      chapters: [],
    };
    novel.author = loadedCheerio('#authtag')
      .map((_, el) => loadedCheerio(el).text().trim())
      .toArray()
      .join(', ');
    novel.genres = loadedCheerio('#seriesgenre')
      .children('a')
      .map((_, el) => loadedCheerio(el).text())
      .toArray()
      .join(',');
    novel.status = loadedCheerio('#editstatus').text().includes('Ongoing')
      ? 'Ongoing'
      : 'Completed';

    const type = loadedCheerio('#showtype').text().trim();
    const summary = loadedCheerio('#editdescription').text().trim();
    novel.summary = summary + `\n\nType: ${type}`;
    const rating = loadedCheerio('.seriesother .uvotes')
      .text()
      .match(/(\d+\.\d+) \/ \d+\.\d+/)?.[1];
    if (rating) {
      novel.rating = parseFloat(rating);
    }

    const novelId = loadedCheerio('input#mypostid').attr('value')!;
    const formData = new FormData();
    formData.append('action', 'nd_getchapters');
    formData.append('mygrr', '0');
    formData.append('mypostid', novelId);

    const chaptersHtml = await fetchApi(`${this.site}wp-admin/admin-ajax.php`, {
      method: 'POST',
      body: formData,
    }).then(data => data.text());

    const chaptersCheerio = parseHTML(chaptersHtml);
    const chapters: Plugin.ChapterItem[] = [];

    chaptersCheerio('li.sp_li_chp').each((_, el) => {
      const chapterName = chaptersCheerio(el)
        .text()
        .replace('v', 'volume ')
        .replace('c', ' chapter ')
        .replace('part', 'part ')
        .replace('ss', 'SS')
        .replace(/\b\w/g, l => l.toUpperCase())
        .trim();

      const chapterPath =
        'https:' + chaptersCheerio(el).find('a').first().next().attr('href');

      if (chapterPath)
        chapters.push({
          name: chapterName,
          path: chapterPath.replace(this.site, ''),
        });
    });

    novel.chapters = chapters.reverse();
    return novel;
  }

  getLocation(href: string) {
    const match = href.match(
      /^(https?:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/,
    );
    return match && `${match[1]}//${match[3]}`;
  }

  async getChapterBody(
    loadedCheerio: CheerioAPI,
    domain: string[],
    chapterPath: string,
  ) {
    // Remove common bloat elements
    const bloatElements = [
      'nav',
      'header',
      'footer',
      '.hidden',
      '.ad',
      '.ads',
      '.advertisement',
      '.social-share',
      '.comments',
      '.related-posts',
      '.sidebar',
      '.menu',
      '.navigation',
      'script',
      'style',
      'noscript',
      'iframe',
    ];
    bloatElements.forEach(tag => loadedCheerio(tag).remove());

    // Find the element with the most text content
    let maxTextLength = 0;
    let contentElement = null;

    // Search through main content containers
    const mainContainers = loadedCheerio(
      'main, article, .content, .entry-content, #content, .post-content, .chapter-content',
    );

    mainContainers.each((_, el) => {
      const $el = loadedCheerio(el);
      // Get direct children only (depth 1)
      const children = $el.children();
      let totalTextLength = 0;

      children.each((_, child) => {
        const text = loadedCheerio(child).text().trim();
        totalTextLength += text.length;
      });

      if (totalTextLength > maxTextLength) {
        maxTextLength = totalTextLength;
        contentElement = el;
      }
    });

    if (!contentElement) {
      // Fallback: search through all divs if no main container found
      loadedCheerio('div').each((_, el) => {
        const text = loadedCheerio(el).text().trim();
        if (text.length > maxTextLength) {
          maxTextLength = text.length;
          contentElement = el;
        }
      });
    }

    if (!contentElement) {
      throw new Error('Could not find chapter content');
    }

    // Get chapter title if available
    const titleElement = loadedCheerio(
      'h1, h2, .chapter-title, .entry-title',
    ).first();
    const chapterTitle = titleElement.length ? titleElement.text() : '';

    // Format the content
    let chapterText = loadedCheerio(contentElement).html()!;
    if (chapterTitle) {
      chapterText = `<h2>${chapterTitle}</h2><hr><br>${chapterText}`;
    }

    return chapterText;
  }

  async parseChapter(chapterPath: string): Promise<string> {
    let chapterText;

    const result = await fetchApi(this.site + chapterPath);
    const body = await result.text();
    const url = result.url;
    const domainParts = url.toLowerCase().split('/')[2].split('.');

    const loadedCheerio = parseHTML(body);

    // Handle CAPTCHA cases
    const blockedTitles = [
      'bot verification',
      'just a moment...',
      'redirecting...',
      'un instant...',
      'you are being redirected...',
    ];
    const title = loadedCheerio('title').text().trim().toLowerCase();
    if (blockedTitles.includes(title)) {
      throw new Error('Captcha detected, please open in webview.');
    }

    // Check if chapter url is wrong or site is down
    if (!result.ok) {
      throw new Error(
        `Failed to fetch ${result.url}: ${result.status} ${result.statusText}`,
      );
    }

    // Detect platforms
    let isBlogspot = ['blogspot', 'blogger'].some(keyword =>
      [
        loadedCheerio('meta[name="google-adsense-platform-domain"]').attr(
          'content',
        ),
        loadedCheerio('meta[name="generator"]').attr('content'),
      ].some(meta => meta?.toLowerCase().includes(keyword)),
    );

    let isWordPress = ['wordpress', 'site kit by google'].some(keyword =>
      [
        loadedCheerio('#dcl_comments-js-extra').html(),
        loadedCheerio('meta[name="generator"]').attr('content'),
        loadedCheerio('.powered-by').text(),
        loadedCheerio('footer').text(),
      ].some(meta => meta?.toLowerCase().includes(keyword)),
    );

    // Manually set WordPress flag for known sites
    const manualWordPress = ['etherreads', 'greenztl2', 'soafp'];
    if (!isWordPress && domainParts.some(wp => manualWordPress.includes(wp))) {
      isWordPress = true;
    }

    // Handle outlier sites
    const outliers = [
      'anotivereads',
      'arcanetranslations',
      'asuratls',
      'darkstartranslations',
      'fictionread',
      'helscans',
      'infinitenoveltranslations',
      'mirilu',
      'novelworldtranslations',
      'sacredtexttranslations',
      'stabbingwithasyringe',
      'tinytranslation',
      'vampiramtl',
      'zetrotranslation',
    ];
    if (domainParts.some(d => outliers.includes(d))) {
      isWordPress = false;
      isBlogspot = false;
    }

    // Last edited in 0.9.0 - 19/03/2025
    /**
     * Blogspot sites:
     * - ¼-Assed
     * - AsuraTls (Outlier)
     * - FictionRead (Outlier)
     * - Novel World Translations (Outlier)
     * - SacredText TL (Outlier)
     * - Toasteful
     *
     * WordPress sites:
     * - Anomlaously Creative (Outlier)
     * - Arcane Translations (Outlier)
     * - Blossom Translation
     * - Darkstar Translations (Outlier)
     * - Dumahs Translations
     * - ElloMTL
     * - Femme Fables
     * - Gadgetized Panda Translation
     * - Gem Novels
     * - Goblinslate
     * - GreenzTL
     * - Hel Scans (Outlier)
     * - ippotranslations
     * - JATranslations
     * - Light Novels Translations
     * - Mirilu - Novel Reader Attempts Translating (Outlier)
     * - Neosekai Translations
     * - Shanghai Fantasy
     * - Soafp (Manually added)
     * - Stabbing with a Syringe (Outlier)
     * - StoneScape
     * - TinyTL (Outlier)
     * - VampiraMTL (Outlier)
     * - Wonder Novels
     * - Yong Library
     * - Zetro Translation (Outlier)
     */

    // Fetch chapter content based on detected platform
    if (!isWordPress && !isBlogspot) {
      chapterText = await this.getChapterBody(loadedCheerio, domainParts, url);
    } else {
      const bloatElements = isBlogspot
        ? ['.button-container', '.ChapterNav', '.ch-bottom', '.separator']
        : [
            '.ad',
            '.author-avatar',
            '.chapter-warning',
            '.entry-meta',
            '.ezoic-ad',
            '.mb-center',
            '.modern-footnotes-footnote__note',
            '.patreon-widget',
            '.post-cats',
            '.pre-bar',
            '.sharedaddy',
            '.sidebar',
            '.swg-button-v2-light',
            '.wp-block-buttons',
            //'.wp-block-columns',
            '.wp-dark-mode-switcher',
            '.wp-next-post-navi',
            '#hpk',
            '#jp-post-flair',
            '#textbox',
          ];

      bloatElements.forEach(tag => loadedCheerio(tag).remove());

      // Extract title
      const titleSelectors = isBlogspot
        ? ['.entry-title', '.post-title', 'head title']
        : [
            '.entry-title',
            '.chapter__title',
            '.title-content',
            '.wp-block-post-title',
            '.title_story',
            '#chapter-heading',
            'head title',
            'h1:first-of-type',
            'h2:first-of-type',
            '.active',
          ];
      let chapterTitle = titleSelectors
        .map(sel => loadedCheerio(sel).first().text())
        .find(text => text);

      // Extract subtitle (if any)
      const chapterSubtitle =
        loadedCheerio('.cat-series').first().text() ||
        loadedCheerio('h1.leading-none ~ span').first().text();
      if (chapterSubtitle) chapterTitle = chapterSubtitle;

      // Extract content
      const contentSelectors = isBlogspot
        ? ['.content-post', '.entry-content', '.post-body']
        : [
            '.chapter__content',
            '.entry-content',
            '.text_story',
            '.post-content',
            '.contenta',
            '.single_post',
            '.main-content',
            '.reader-content',
            '#content',
            '#the-content',
            'article.post',
          ];
      const chapterContent = contentSelectors
        .map(sel => loadedCheerio(sel).html()!)
        .find(html => html);

      if (chapterTitle) {
        chapterText = `<h2>${chapterTitle}</h2><hr><br>${chapterContent}`;
      } else {
        chapterText = chapterContent;
      }
    }

    // Fallback content extraction
    if (!chapterText) {
      ['nav', 'header', 'footer', '.hidden'].forEach(tag =>
        loadedCheerio(tag).remove(),
      );
      chapterText = loadedCheerio('body').html()!;
    }

    // Convert relative URLs to absolute
    chapterText = chapterText.replace(
      /href="\//g,
      `href="${this.getLocation(result.url)}/`,
    );

    // Process images
    const chapterCheerio = parseHTML(chapterText);
    chapterCheerio('noscript').remove();

    chapterCheerio('img').each((_, el) => {
      const $el = chapterCheerio(el);

      // Only update if the lazy-loaded attribute exists
      if ($el.attr('data-lazy-src')) {
        $el.attr('src', $el.attr('data-lazy-src'));
      }
      if ($el.attr('data-lazy-srcset')) {
        $el.attr('srcset', $el.attr('data-lazy-srcset'));
      }

      // Remove lazy-loading class if it exists
      if ($el.hasClass('lazyloaded')) {
        $el.removeClass('lazyloaded');
      }
    });

    return chapterCheerio.html()!;
  }

  async searchNovels(
    searchTerm: string,
    page: number,
  ): Promise<Plugin.NovelItem[]> {
    // Split searchTerm by specific special characters and find the longest split
    const splits = searchTerm.split('*');
    const longestSearchTerm = splits.reduce(
      (a, b) => (a.length > b.length ? a : b),
      '',
    );
    searchTerm = longestSearchTerm.replace(/[‘’]/g, "'").replace(/\s+/g, '+');

    const url = `${this.site}series-finder/?sf=1&sh=${searchTerm}&sort=srank&order=asc&pg=${page}`;
    const result = await fetchApi(url);
    const body = await result.text();

    const loadedCheerio = parseHTML(body);

    return this.parseNovels(loadedCheerio);
  }

  filters = {
    sort: {
      label: 'Sort Results By',
      value: 'popmonth',
      options: [
        { label: 'Popular (Month)', value: 'popmonth' },
        { label: 'Popular (All)', value: 'popular' },
        { label: 'Last Updated', value: 'sdate' },
        { label: 'Rating', value: 'srate' },
        { label: 'Rank', value: 'srank' },
        { label: 'Reviews', value: 'sreview' },
        { label: 'Chapters', value: 'srel' },
        { label: 'Title', value: 'abc' },
        { label: 'Readers', value: 'sread' },
        { label: 'Frequency', value: 'sfrel' },
      ],
      type: FilterTypes.Picker,
    },
    order: {
      label: 'Order (Not for Popular)',
      value: 'desc',
      options: [
        { label: 'Descending', value: 'desc' },
        { label: 'Ascending', value: 'asc' },
      ],
      type: FilterTypes.Picker,
    },
    storyStatus: {
      label: 'Story Status (Translation)',
      value: '',
      options: [
        { label: 'All', value: '' },
        { label: 'Completed', value: '2' },
        { label: 'Ongoing', value: '3' },
        { label: 'Hiatus', value: '4' },
      ],
      type: FilterTypes.Picker,
    },
    genre_operator: {
      label: 'Genre (And/Or) (Not for Popular)',
      value: 'and',
      options: [
        { label: 'And', value: 'and' },
        { label: 'Or', value: 'or' },
      ],
      type: FilterTypes.Picker,
    },
    genres: {
      label: 'Genres',
      type: FilterTypes.ExcludableCheckboxGroup,
      value: {
        include: [],
        exclude: [],
      },
      options: [
        { label: 'Action', value: '8' },
        { label: 'Adult', value: '280' },
        { label: 'Adventure', value: '13' },
        { label: 'Comedy', value: '17' },
        { label: 'Drama', value: '9' },
        { label: 'Ecchi', value: '292' },
        { label: 'Fantasy', value: '5' },
        { label: 'Gender Bender', value: '168' },
        { label: 'Harem', value: '3' },
        { label: 'Historical', value: '330' },
        { label: 'Horror', value: '343' },
        { label: 'Josei', value: '324' },
        { label: 'Martial Arts', value: '14' },
        { label: 'Mature', value: '4' },
        { label: 'Mecha', value: '10' },
        { label: 'Mystery', value: '245' },
        { label: 'Psychoical', value: '486' },
        { label: 'Romance', value: '15' },
        { label: 'School Life', value: '6' },
        { label: 'Sci-fi', value: '11' },
        { label: 'Seinen', value: '18' },
        { label: 'Shoujo', value: '157' },
        { label: 'Shoujo Ai', value: '851' },
        { label: 'Shounen', value: '12' },
        { label: 'Shounen Ai', value: '1692' },
        { label: 'Slice of Life', value: '7' },
        { label: 'Smut', value: '281' },
        { label: 'Sports', value: '1357' },
        { label: 'Supernatural', value: '16' },
        { label: 'Tragedy', value: '132' },
        { label: 'Wuxia', value: '479' },
        { label: 'Xianxia', value: '480' },
        { label: 'Xuanhuan', value: '3954' },
        { label: 'Yaoi', value: '560' },
        { label: 'Yuri', value: '922' },
      ],
    },
    language: {
      label: 'Language',
      value: [],
      options: [
        { label: 'Chinese', value: '495' },
        { label: 'Filipino', value: '9181' },
        { label: 'Indonesian', value: '9179' },
        { label: 'Japanese', value: '496' },
        { label: 'Khmer', value: '18657' },
        { label: 'Korean', value: '497' },
        { label: 'Malaysian', value: '9183' },
        { label: 'Thai', value: '9954' },
        { label: 'Vietnamese', value: '9177' },
      ],
      type: FilterTypes.CheckboxGroup,
    },
    novelType: {
      label: 'Novel Type (Not for Popular)',
      value: [],
      options: [
        { label: 'Light Novel', value: '2443' },
        { label: 'Published Novel', value: '26874' },
        { label: 'Web Novel', value: '2444' },
      ],
      type: FilterTypes.CheckboxGroup,
    },
    reading_list_operator: {
      label: 'Reading List (Include/Exclude) (Not for Popular)',
      value: 'include',
      options: [
        { label: 'Include', value: 'include' },
        { label: 'Exclude', value: 'exclude' },
      ],
      type: FilterTypes.Picker,
    },
    reading_lists: {
      label: 'Reading Lists (Not for Popular)',
      value: [],
      options: [{ label: 'All Reading Lists', value: '-1' }],
      type: FilterTypes.CheckboxGroup,
    },
  } satisfies Filters;
}

export default new NovelUpdates();
