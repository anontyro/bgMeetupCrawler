import * as puppeteer from 'puppeteer';
import {mkdirSync, existsSync} from 'fs';

const OUTPUT_DIR = './output/';
const URL =
  'https://www.meetup.com/Boardgames-Singapore/boards/forum/990803?pager.offset=0';

const POST_URL_REGEX = /https:\/\/([^"]*)/gi;
const POST_TITLE = /messageTopic[^>]*([^<]*)/gi;

const makeList = () => {
  const list = Array.from(document.querySelectorAll('tr'));
  list.shift();

  const cleaned = list.map(item => {
    const raw = item.cells[2].innerHTML;
    const url = raw.match(POST_URL_REGEX);
    const title = raw.match(POST_TITLE);
    return {
      url,
      title: title,
    };
  });
  console.log(cleaned);
};

const crawl = async (dirname: string = OUTPUT_DIR) => {
  console.log('starting crawl');
  if (!existsSync(dirname)) {
    mkdirSync(dirname);
  }
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto(URL);
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

  console.log(postList);

  // await page.screenshot({path: `${OUTPUT_DIR}example.png`});

  await browser.close();
};

crawl();

/*
const raw = Array.from(document.querySelectorAll('tr'));
raw.shift();

const cleaned = list.map(item =>{
 const raw = item.cells[2].innerHTML;
 const url = raw.match(POST_URL_REGEX);
 const title = POST_TITLE.exec(raw);
 return {
   url,
   title: title[1],
 }
})
*/
