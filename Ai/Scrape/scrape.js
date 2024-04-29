const puppeteer = require("puppeteer");
const fs = require("fs");
//mongoose

const urlGeneric = "https://www.ouedkniss.com/automobiles/";
const pageStop = 1;

const scrapeUntilEnd = async (page) => {
  try {
    let previousHeight = -1;
    // let pageHeight = await page.evaluate("document.body.scrollHeight");
    let pageHeight = 10000;
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
    const page = await browser.newPage();
    const allArticles = [];
    for (let i = 1; i <= pageStop; i++) {
      const url = urlGeneric + i + "?hasPrice=true";
      await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

      await scrapeUntilEnd(page);

      await page.waitForSelector(
        "div.v-col-sm-6.v-col-md-4.v-col-lg-3.v-col-12",
      );
      allArticles[i - 1] = await page.evaluate(() => {
        const articles = document.querySelectorAll(
          "div.v-col-sm-6.v-col-md-4.v-col-lg-3.v-col-12",
        );
        return Array.from(articles).map((article) => {
          const anchor = article.querySelector("a");
          const price = article
            .querySelector(".price")
            ?.innerText.trim()
            .replace(/\n/g, " ");
          const url = anchor ? anchor.href : null;
          return {
            url,
            price,
          };
        });
      });
      console.log("getting urls from page : ", i);
    }
    await page.close();
    return allArticles;
  } catch (error) {
    console.error("Error during scraping:", error);
  }
}
async function scrapeUrls(allArticles, browser) {
  let data = [];
  const page = await browser.newPage();
  for (const articles of allArticles) {
    for (const article of articles) {
      if (article.url) {
        data.push(await scrapeArticle(article.url, page, article.price));
      }
    }
  }
  return data;
}
let carNumber = 0;

async function scrapeArticle(url, page, price) {
  await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
  try {
    await page.waitForSelector("div.v-row.v-row--dense");
  } catch (error) {
    console.error("Error while waiting for selector:", error);
    return;
  }
  let data = await page.evaluate(() => {
    const labels = document.querySelectorAll(
      // "div.v-card.v-theme--dark.v-card--density-default.elevation-1.v-card--variant-elevated.o-announ-specs.mt-2",
      "div.v-col-sm-3.v-col-5.spec-name",
    );
    const values = document.querySelectorAll("div.v-col-sm-9.v-col-7");
    let options = document.querySelectorAll("div.v-chip__content");
    options = Array.from(options).map((option) => option.innerText);
    options = options.filter((option) => {
      return !(
        option.includes(".com") ||
        option.includes(".COM") ||
        option.includes("gmail") ||
        option.includes("hotmail") ||
        option.includes("annonces") ||
        option.includes("abonnés")
      );
    });
    const data = {};
    for (let i = 0; i < labels.length; i++) {
      let label;
      try {
        label = labels[i].innerText.replace(/\n/g, " ");
      } catch (error) {
        console.error("Error while getting label:", error);
        continue;
      }
      label = label.replace("é", "e");
      label = label.replace("è", "e");
      label = label.replace("ê", "e");
      label = label.replace("à", "a");
      let value;
      try {
        value = values[i].innerText.replace(/\n/g, " ");
      } catch (error) {
        console.error("Error while getting value:", error);
        continue;
      }
      if (label != "Options de voiture" && label != "Numero")
        data[`${label}`] = value;
    }
    data["options"] = options;
    return data;
  });
  data["price"] = price;
  // write the data to the file
  fs.appendFileSync("data.json", JSON.stringify(data) + "\n");
  console.log("scraped car number : ", ++carNumber);
  return data;
}

async function main() {
  try {
    // delete all entries in the database before starting
    const browser = await puppeteer.launch({
      defaultViewport: { width: 1280, height: 800 },
    });
    const Articles = await scrape(browser);
    await scrapeUrls(Articles, browser);
    await browser.close();
  } catch (error) {
    console.error("Error during main execution:", error);
  }
}

main();
