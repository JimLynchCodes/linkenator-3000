const puppeteer = require('puppeteer');

const THEATER_MODE = true;

(async () => {

  const wsChromeEndpoint = 'ws://127.0.0.1:9222/devtools/browser/28c45c6b-e2a7-4794-a979-ecb96d275b19'

  const browser = await puppeteer.connect({ browserWSEndpoint: wsChromeEndpoint });
  console.info(browser);
  
  const defaultContext = browser.defaultBrowserContext();
  console.info('Is incognito? ' + defaultContext.isIncognito()); // False
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800});

  // theater wait - if THEATER_MODE flag is true, pauses puppeteer for amount (1 second default)
  async function t_wait(amount) {
    return new Promise(r => setTimeout(r, amount || 1000));
  }

  async function clickSearchIcon() {
    return await (await page.waitForSelector('input.search-global-typeahead__input')).click()
    // small screens -> return await (await page.waitForSelector('button.search-global-typeahead__collapsed-search-button')).click()
  }

  await t_wait();
  
  // Instructs the blank page to navigate a URL
  await page.goto('https://www.linkedin.com/search/results/people/?geoUrn=%5B%22103644278%22%5D&keywords=pair%20programming&network=%5B%22F%22%5D&origin=FACETED_SEARCH&sid=o2k');
  
  await t_wait();
  // Fetches page's title
  // const title = await page.title();
  // console.info(`The title is: ${title}`);

  // const [signInButton] = await page.$x("//button[contains(., 'Sign in')]");
  // console.log({ "Sign in": signInButton })
  
  // if (signInButton) {
  //   await signInButton.click();
  // }
  
  // await clickSearchIcon();
  
  await t_wait();
  // const el = await page.evaluateHandle(() => document.activeElement);
  await t_wait();
  // await el.type('pair programming');

  await t_wait();

  // await page.keyboard.press('Enter');
  
  await t_wait();

  // const [peoplePill] = await page.$x('//button[contains(., "People")]');
  // const [msgBtn1, msgBtn2] = await page.waitForSelector('button[contains(Message)]');
  
  
  
  // const [msgBtn1, msgBtn2] = await page.waitForSelector('button');

  const elements = await page.waitForSelector('button[contains(text(), "Message"]');
  // const elements = await page.$$('button[text()="Message"]');

  elements.forEach(async element => {
    
    console.log({ element })
    // await element.click();
  });


  // console.log(msgBtn1)
  // console.log(msgBtn2)

  // console.log({ peoplePill })
  // console.log({ peoplePill2 })

  // if (peoplePill)
  //   await peoplePill.click()

  await t_wait();
  
  // const [signInWithGoogleButton] = await page.$x("//button[contains(., 'Sign in with Google')]");
  // console.log({ "Sign in with Google": signInWithGoogleButton })
  
  // if (signInWithGoogleButton) {
  //   await signInWithGoogleButton.click();
  // }

  await t_wait();

  
  await t_wait(30_000);
  await page.close();

  return;
})();
