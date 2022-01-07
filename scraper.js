/* RESTRICTIONS

1. one page at a time!
might add functionality to do multiple pages but 
the idea is that the more specific you are about what you
want, the better your personal shopping experience will be. 
respect yoox, webmasters, bots... instead of searching through
62000 sale items why not ask
yourself what you actually want and do a few searches based on that?
like blue leather jackets size small, proenza ankle booties size 10, 
pink tube tops, floral silk dresses, etc.

2. not tested on non-sale items so start on the sale page

<3

*/

const { chromium } = require("playwright");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("link goes here"
  );
  const content = await page.evaluate(() => {
    document.querySelector(".col-16-24").scrollIntoView({behavior:'smooth'});
    let data = [];

    let elements = document.querySelectorAll(".itemlink");
    elements.forEach((elem) => {
      let designer = elem.querySelector(".brand").innerText;
      let href = elem.href;
      //actual href = elem.attributes.href.value;
      let oldprice = elem.querySelector(".oldprice").innerText;
      let newprice = elem.querySelector(".newprice").innerText;
      data.push({
            designer,
            href,
            oldprice,
            newprice
        })
      }


        );
        return data;
     });

  const jsonData = JSON.stringify(content);
  fs.writeFileSync("shopper.json", jsonData);
  await browser.close();
})();
