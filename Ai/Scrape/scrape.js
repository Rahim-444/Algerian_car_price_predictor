const puppeteer = require("puppeteer");
require("dotenv").config("./.env");
//mongoose
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MOMONGODB_URI;
mongoose.connect(MONGODB_URI);

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

const carSchema = new mongoose.Schema({
  price: String,
  Marque: String,
  Modele: String,
  Annee: String,
  Energie: String,
  Boite_de_vitesse: String,
  Puissance_fiscale: String,
  Kilometrage: String,
  Couleur: String,
  Portes: String,
  options: [String],
});

const urlGeneric = "https://www.ouedkniss.com/automobiles/";
const pageStop = 2;

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
    for (let i = 1; i <= pageStop; i++) {
      const url = urlGeneric + i + "?hasPrice=true";
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

      await scrapeUntilEnd(page);

      await page.waitForSelector("div.col-sm-6.col-md-4.col-lg-3.col-12");
      allArticles[i - 1] = await page.evaluate(() => {
        const articles = document.querySelectorAll(
          "div.col-sm-6.col-md-4.col-lg-3.col-12",
        );
        return Array.from(articles).map((article) => {
          const anchor = article.querySelector("a");
          const price = article.querySelector(".price")?.innerText.trim();
          const url = anchor ? anchor.href : null;
          return {
            url,
            price,
          };
        });
      });
      await page.close();
    }

    return allArticles;
  } catch (error) {
    console.error("Error during scraping:", error);
  }
}
async function scrapeUrls(allArticles, browser) {
  let data = [];
  for (const articles of allArticles) {
    for (const article of articles) {
      if (article.url) {
        data.push(await scrapeArticle(article.url, browser, article.price));
      }
    }
  }
  return data;
}

async function scrapeArticle(url, browser, price) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
  try {
    await page.waitForSelector(
      "div.o-announ-specs.mt-2.elevation-1.v-card.v-sheet",
    );
  } catch (error) {
    console.error("Error while waiting for selector:", error);
    return;
  }
  let data = await page.evaluate(() => {
    const labels = document.querySelectorAll("div.spec-name.col-sm-3.col-5");
    const values = document.querySelectorAll("div.col-sm-9.col-7");
    let options = document.querySelectorAll("span.v-chip__content");
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
      let label = labels[i].innerText.trim();
      label = label.replace("é", "e");
      label = label.replace("è", "e");
      const value = values[i].innerText.trim();
      if (label != "Options de voiture" && label != "Numero")
        data[`${label}`] = value;
    }
    data["options"] = options;
    return data;
  });
  data["price"] = price;
  await page.close();
  //write the data to the database
  const Car = mongoose.model("Car", carSchema);
  const car = new Car(data);
  await car.save();
  return data;
}

async function main() {
  try {
    const browser = await puppeteer.launch();
    const Articles = await scrape(browser);
    await scrapeUrls(Articles, browser);
    await browser.close();
  } catch (error) {
    console.error("Error during main execution:", error);
  }
}

main();
