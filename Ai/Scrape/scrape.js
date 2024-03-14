const puppeteer = require("puppeteer");

const urlGeneric = "https://www.ouedkniss.com/automobiles/";
const pageStop = 5;

const scrapeUntilEnd = async (page) => {
  try {
    let previousHeight = -1;
    let pageHeight = await page.evaluate("document.body.scrollHeight");
    // eslint-disable-next-line no-constant-condition
    while (true) {
      let newHeight = previousHeight + 1;
      await page.evaluate(`window.scrollTo(0, ${newHeight})`);
      if (newHeight >= pageHeight) {
        break;
      }
      previousHeight = newHeight;
    }
  } catch (error) {
    console.error("Error while scrolling:", error);
  }
};

async function scrape(browser) {
  try {
    const allArticles = [];
    for (let i = 1; i < pageStop; i++) {
      const url = urlGeneric + i;
      console.log("Scraping page:", url);
      const page = await browser.newPage();
      // Set the viewport to a specific size
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

      await scrapeUntilEnd(page);

      await page.waitForSelector("div.col-sm-6.col-md-4.col-lg-3.col-12");
      allArticles[i - 1] = await page.evaluate(() => {
        const articles = document.querySelectorAll(
          "div.col-sm-6.col-md-4.col-lg-3.col-12",
        );
        return Array.from(articles).map((article) => {
          const anchor = article.querySelector("a");
          const url = anchor ? anchor.href : null;
          const title = article
            .querySelector("div.mx-2 h2.mb-1")
            ?.innerText.trim();
          const price = article.querySelector(".price")?.innerText.trim();
          const location = article
            .querySelector(".line-height-1 span")
            ?.innerText.trim();
          const postedTime = article
            .querySelectorAll(".line-height-1 span")[1]
            ?.innerText.trim();
          const storeName = article
            .querySelector(".text-capitalize.font-weight-bold.ms-2")
            ?.innerText.trim();
          return {
            title,
            url,
            price,
            location,
            postedTime,
            storeName,
          };
        });
      });
      await page.close();
    }

    console.log(allArticles);
  } catch (error) {
    console.error("Error during scraping:", error);
  }
}

const main = async () => {
  const browser = await puppeteer.launch();
  await scrape(browser);
  await browser.close();
};
main();
