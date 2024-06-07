import { Parser } from 'htmlparser2';
import { fetchFile } from '@libs/fetch';
import { Plugin } from '@typings/plugin';
import { NovelStatus } from '@libs/novelStatus';
import { Filters, FilterTypes } from '@libs/filterInputs';

class Webnovel implements Plugin.PluginBase {
  id = 'webnovel';
  name = 'Webnovel';
  icon = 'src/en/webnovel/icon.png';
  site = 'https://www.webnovel.com';
  version = '1.0.0';

  parseNovels(url: string) {
    return fetch(url)
      .then(res => res.text())
      .then(html => {
        let isParsingNovel = false;
        let tempNovel = {} as Plugin.NovelItem;
        const novels: Plugin.NovelItem[] = [];
        const parser = new Parser({
          onopentag(name, attribs) {
            if (name === 'li' && attribs['class']?.includes('fl')) {
              isParsingNovel = true;
            }
            if (isParsingNovel) {
              switch (name) {
                case 'a':
                  tempNovel.path = attribs['href'].trim();
                  tempNovel.name = attribs['title'].trim();
                  break;
                case 'img':
                  tempNovel.cover = attribs['data-original'];
                  break;
              }
              if (tempNovel.path && tempNovel.name && tempNovel.cover) {
                novels.push(tempNovel);
                tempNovel = {} as Plugin.NovelItem;
                isParsingNovel = false;
              }
            }
          },
        });
        parser.write(html);
        parser.end();
        return novels;
      });
  }

  popularNovels(
    pageNo: number,
    {
      showLatestNovels,
      filters,
    }: Plugin.PopularNovelsOptions<typeof this.filters>,
  ): Promise<Plugin.NovelItem[]> {
    let link = this.site + '/stories';
    if (showLatestNovels) {
      link += '/novel?sourceType=0&bookStatus=0&orderBy=5';
    } else if (filters) {
      const params = new URLSearchParams();
      for (const genre of filters.genres.value) {
        params.append('genre[]', genre);
      }
      for (const type of filters.type.value) {
        params.append('type[]', type);
      }
      params.append('status', filters.status.value);
      params.append('order', filters.sort.value);
      link += '/?' + params.toString() + '&page=' + pageNo;
    } else {
      link += '/?page=' + pageNo;
    }
    return this.parseNovels(link);
  }

  parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    function getChapters(url: string): Promise<Plugin.ChapterItem[]> {
      return fetch(url)
        .then(res => res.text())
        .then(html => {
          let isParsingChapterList = false;
          let isReadingChapter = false;
          let isReadingChapterNumber = false;
          const chapters: Plugin.ChapterItem[] = [];
          let tempChapter = {} as Plugin.ChapterItem;
          const parser = new Parser({
            onopentag(name, attribs) {
              if (attribs['class']?.includes('content-list')) {
                isParsingChapterList = true;
              } else if (isParsingChapterList && name === 'li') {
                isReadingChapter = true;
                tempChapter.path = attribs['href'];
                tempChapter.name = attribs['title'];
              } else if (isReadingChapter && name === 'i') {
                isReadingChapterNumber = true;
              }
            },
            ontext(data) {
              if (isReadingChapterNumber) {
                tempChapter.name = `Chapter ${data}: ${tempChapter.name}`;
              }
            },
            onclosetag(name) {
              if (isParsingChapterList && name === 'ol') {
                isParsingChapterList = false;
              } else if (isReadingChapter && name === 'li') {
                isReadingChapter = false;
                if (!isReadingChapterNumber) {
                  tempChapter.name = `Chapter: ${tempChapter.name}`;
                } else {
                  isReadingChapterNumber = false;
                }
                chapters.push(tempChapter);
                tempChapter = {} as Plugin.ChapterItem;
              }
            },
          });
          parser.write(html);
          parser.end();

          return chapters;
        });
    }
    return fetch(this.site + novelPath)
      .then(res => res.text())
      .then(async html => {
        const novel: Plugin.SourceNovel = {
          path: novelPath,
          name: '',
          genres: '',
          summary: '',
          author: '',
          status: '',
          chapters: [] as Plugin.ChapterItem[],
        };
        let isParsingNameAndCover = false;
        let isParsingGenreAndStatus = false;
        let isReadingStatus = false;
        let isParsingAuthor = false;
        let isReadingAuthor = false;
        let isReadingSummary = false;
        const parser = new Parser({
          onopentag(name, attribs) {
            // name and cover
            if (attribs['class']?.includes('det-info')) {
              isParsingNameAndCover = true;
            } else if (isParsingNameAndCover && name === 'img') {
              novel.cover = attribs['src'];
              novel.name = attribs['title'];
              isParsingNameAndCover = false;
            }
            // genre and status
            else if (attribs['class']?.includes('det-hd-detail')) {
              isParsingGenreAndStatus = true;
            } else if (
              isParsingGenreAndStatus &&
              attribs['class'].includes('det-hd-tag')
            ) {
              novel.genres = attribs['title'];
            } else if (
              isParsingGenreAndStatus &&
              attribs['title'].toLowerCase().includes('status')
            ) {
              isReadingStatus = true;
            }
            // author
            else if (name === 'h2' && attribs['class'].includes('ell')) {
              isParsingAuthor = true;
            }
            // summary
            else if (attribs['class'].includes('j_synopsis')) {
              isReadingSummary = true;
            } else if (isReadingSummary) {
              novel.summary += `<${name}>`;
            }
          },
          ontext(data) {
            // status
            if (isReadingStatus) {
              novel.status = data.trim();
              isReadingStatus = false;
            }
            // author
            else if (
              isParsingAuthor &&
              data.toLowerCase().trim() === 'author:'
            ) {
              isParsingAuthor = false;
              isReadingAuthor = true;
            } else if (isReadingAuthor) {
              novel.author += data.trim();
              isReadingAuthor = false;
            }
          },
          onclosetag(name) {
            // genre and status
            if (isParsingGenreAndStatus && name === ('h2' || 'div')) {
              isParsingGenreAndStatus = false;
            }
            // summary
            else if (isReadingSummary) {
              if (name === 'br') {
                novel.summary += '<br>';
              } else if (name === 'div') {
                isReadingSummary = false;
              }
            }
          },
        });
        parser.write(html);
        parser.end();
        novel.chapters = await getChapters(this.site + novelPath + '/catalog');
        switch (novel.status?.trim()) {
          case 'Ongoing':
            novel.status = NovelStatus.Ongoing;
            break;
          case 'Hiatus':
            novel.status = NovelStatus.OnHiatus;
            break;
          case 'Completed':
            novel.status = NovelStatus.Completed;
            break;
          default:
            novel.status = NovelStatus.Unknown;
        }
        return novel;
      });
  }

  parseChapter(chapterPath: string): Promise<string> {
    return fetch(this.site + chapterPath)
      .then(res => res.text())
      .then(html => {
        let isParsingTitleBlock = false;
        let isParsingTitle = false;
        let isParsingSubtitle = false;
        let isParsingContent = false;
        let chapterContent = '';
        let notContent = false;

        const parser = new Parser({
          onopentag(name, attribs) {
            if (attribs['class']?.includes('epheader')) {
              chapterContent += `<h2>`;
              isParsingTitleBlock = true;
              isParsingTitle = true;
            }
            if (isParsingSubtitle) {
              chapterContent += ' | ';
            }
            if (attribs['class']?.includes('entry-content')) {
              isParsingContent = true;
            }
            if (isParsingContent && !notContent) {
              chapterContent += `<${name}`;
              for (let attrib in attribs) {
                chapterContent += ` ${attrib}="${attribs[attrib]}"`;
              }
              chapterContent += `>`;
            }
            if (attribs['class']?.includes('mb-center')) {
              notContent = true;
            }
          },
          ontext(data) {
            if (isParsingTitle) {
              chapterContent += data;
            }
            if (isParsingSubtitle) {
              chapterContent += data;
            }
            if (isParsingContent && !notContent) {
              chapterContent += data;
            }
          },
          onclosetag(name) {
            if (isParsingTitle && name === 'h1') {
              isParsingTitle = false;
              isParsingSubtitle = true;
            }
            if (isParsingSubtitle && name === 'div') {
              isParsingSubtitle = false;
            }
            if (isParsingTitleBlock && !isParsingTitle && !isParsingSubtitle) {
              chapterContent += `</h2><br>`;
              isParsingTitleBlock = false;
            }
            if (isParsingContent && !notContent) {
              chapterContent += `</${name}>`;
            }
            if (notContent && name === 'span') {
              notContent = false;
            }
            if (isParsingContent && name === 'div') {
              isParsingContent = false;
            }
          },
        });
        parser.write(html);
        parser.end();
        return chapterContent.trim();
      });
  }

  searchNovels(
    searchTerm: string,
    pageNo: number,
  ): Promise<Plugin.NovelItem[]> {
    const url = this.site + '/?s=' + searchTerm + '&page=' + pageNo;
    return this.parseNovels(url);
  }

  fetchImage(url: string): Promise<string | undefined> {
    // if your plugin has images, and they won't load
    // this is the function to fiddle with
    return fetchFile(url);
  }

  filters = {
    genres: {
      type: FilterTypes.CheckboxGroup,
      label: 'Genres',
      value: [],
      options: [
        { label: 'Action', value: 'action' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'Comedy', value: 'comedy' },
        { label: 'Drama', value: 'drama' },
        { label: 'Ecchi', value: 'ecchi' },
        { label: 'Fantasy', value: 'fantasy' },
        { label: 'Gender Bender', value: 'gender-bender' },
        { label: 'Harem', value: 'harem' },
        { label: 'Martial Arts', value: 'martial-arts' },
        { label: 'Mature', value: 'mature' },
        { label: 'Mystery', value: 'mystery' },
        { label: 'Psychological', value: 'psychological' },
        { label: 'Romance', value: 'romance' },
        { label: 'School Life', value: 'school-life' },
        { label: 'Seinen', value: 'seinen' },
        { label: 'Shounen', value: 'shounen' },
        { label: 'Slice of Life', value: 'slice-of-life' },
        { label: 'Supernatural', value: 'supernatural' },
        { label: 'Tragedy', value: 'tragedy' },
      ],
    },
    type: {
      type: FilterTypes.CheckboxGroup,
      label: 'Type',
      value: [],
      options: [
        { label: 'Japanese Web Novel', value: 'japanese-web-novel' },
        { label: 'Korean Web Novel', value: 'korean-web-novel' },
        { label: 'Light Novel (JP)', value: 'light-novel-jp' },
        { label: 'Web Novel', value: 'web-novel' },
      ],
    },
    status: {
      type: FilterTypes.Picker,
      label: 'Status',
      value: '',
      options: [
        { label: 'All', value: '' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Hiatus', value: 'hiatus' },
        { label: 'Completed', value: 'completed' },
      ],
    },
    sort: {
      type: FilterTypes.Picker,
      label: 'Sort',
      value: 'popular',
      options: [
        { label: 'Popular', value: 'popular' },
        { label: 'A-Z', value: 'title' },
        { label: 'Z-A', value: 'titlereverse' },
        { label: 'Latest Update', value: 'update' },
        { label: 'Latest Added', value: 'latest' },
        { label: 'Rating', value: 'rating' },
      ],
    },
  } satisfies Filters;
}

export default new Webnovel();
