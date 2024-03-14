const puppeteer = require("puppeteer");

const url = "https://www.ouedkniss.com/s/1?keywords=voiture";

const scrapeUntilEnd = async (page) => {
  try {
    let previousHeight = -1;
    while (true) {
      const newHeight = await page.evaluate("document.body.scrollHeight");
      await page.evaluate(`window.scrollTo(0, ${newHeight + 100})`);
      if (newHeight === previousHeight) {
        break;
      }
      previousHeight = newHeight;
    }
  } catch (error) {
    console.error("Error while scrolling:", error);
  }
};

async function scrape(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 926 });

  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });

    await scrapeUntilEnd(page);

    await page.waitForSelector("div.col-sm-6.col-md-4.col-lg-3.col-12");
    const allArticles = await page.evaluate(() => {
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

    console.log(allArticles);
  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    await browser.close();
  }
}

scrape(url);
