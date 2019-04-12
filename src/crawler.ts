import * as puppeteer from 'puppeteer';
import {mkdirSync, existsSync} from 'fs';

const OUTPUT_DIR = './output/';
const URL =
  'https://www.meetup.com/Boardgames-Singapore/boards/forum/990803?pager.offset=0';

const crawl = async (dirname: string = OUTPUT_DIR, url: string = URL) => {
  const extractPageInfo = async (url: string) => {
    console.log(`Crawling...`);
    const page = await browser.newPage();
    await page.goto(url);
    const postList = await page.evaluate(() => {
      const raw = Array.from(document.querySelectorAll('tr td.D_subject'));
      const titles = raw.map((val: HTMLElement) => {
        const title = val.innerText;
        const url = val.innerHTML.match(/https:\/\/([^"]*)/gi);
        return {
          title,
          url: url[0],
        };
      });
      return titles;
    });
    await page.close();
    return postList;
  };

  console.log('starting crawl');
  if (!existsSync(dirname)) {
    mkdirSync(dirname);
  }
  const browser = await puppeteer.launch({});

  const list = await extractPageInfo(url);

  console.log(list);

  // await page.screenshot({path: `${OUTPUT_DIR}example.png`});

  await browser.close();
};

export default crawl;
