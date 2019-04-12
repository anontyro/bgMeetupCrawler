import crawl from './crawler';

// const OUTPUT_DIR = './output/';
// const URL =
//   'https://www.meetup.com/Boardgames-Singapore/boards/forum/990803?pager.offset=0';

// const POST_URL_REGEX = /https:\/\/([^"]*)/gi;
// const POST_TITLE = /messageTopic[^>]*([^<]*)/gi;

// const makeList = () => {
//   const list = Array.from(document.querySelectorAll('tr'));
//   list.shift();

//   const cleaned = list.map(item => {
//     const raw = item.cells[2].innerHTML;
//     const url = raw.match(POST_URL_REGEX);
//     const title = raw.match(POST_TITLE);
//     return {
//       url,
//       title: title,
//     };
//   });
//   console.log(cleaned);
// };

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
