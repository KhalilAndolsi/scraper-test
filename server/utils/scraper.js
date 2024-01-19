const puppeteer = require("puppeteer");

const products = async (pageUrl) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(pageUrl);

  const pages = await page.evaluate(() => {
    const lis = document.querySelectorAll("ul.page-list li");
    const myTargetLi = lis[lis.length - 2].firstElementChild.innerText;
    return myTargetLi;
  });

  const prices = await page.evaluate(() => {
    const titleNodes = document.querySelectorAll("span.price");
    return Array.from(titleNodes, (titleNode) => titleNode.innerText);
  });
  const products_name = await page.evaluate(() => {
    const names = document.querySelectorAll(".product-title a");
    return Array.from(names, (name) => name.innerText);
  });
  const product_reference = await page.evaluate(() => {
    const refs = document.querySelectorAll("span.product-reference");
    return Array.from(refs, (ref) => ref.innerText);
  });
  const product_image = await page.evaluate(() => {
    const images = document.querySelectorAll(
      "a.product-thumbnail > img:first-child"
    );
    return Array.from(images, (image) => image.getAttribute("src"));
  });

  data = {
    pages: +pages,
    data: products_name.map((item, i) => ({
      product_name: item,
      price: prices[i],
      product_reference: product_reference[i],
      product_image: product_image[i],
    })),
  };

  await browser.close();
  return data;
};

const categories = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  try {
    const page = await browser.newPage();

    // Navigate to the Amazon search page
    await page.goto("https://www.tunisianet.com.tn/");

    const categories = await page.evaluate(() => {
      const categories = document.querySelectorAll(".menu-item.item-header  a");
      return Array.from(categories, (category) => ({
        category: category.innerText,
        url: `/api/v1/category${
          new URL(category.getAttribute("href")).pathname
        }`,
      }));
    });
    //console.log(page);
    //console.log(categories);
    return categories;
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
};

module.exports = { products, categories };
