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
  
  // await t_wait();
  // const el = await page.evaluateHandle(() => document.activeElement);
  // await t_wait();
  // await el.type('pair programming');

  // await t_wait();

  // await page.keyboard.press('Enter');
  
  await t_wait();

  // const [peoplePill] = await page.$x('//button[contains(., "People")]');
  // const [msgBtn1, msgBtn2] = await page.waitForSelector('button[contains(Message)]');
  
  
  
  // const elements = await page.waitForSelector('div.entity-result');

  // const elements = await page.$x('//button[contains(., "Message")]');
  // const elements = await page.$$('button[text()="Message"]');

  // const elements = await page.$x("//*[contains(text(), 'Message')]");

  // console.log({ elements })

  // const text = await page.evaluate(() => {
    
  //   console.log({ 'evaluating...': 'ok' })

  //   const entityResults = document.querySelectorAll('div.entity-result');
    
  //   console.log({ entityResults })

    // console.log(element.textContent)

    // const button = await element.waitForSelector('button');
    
    // await button.click()
  // });


  async function getButtonsContaining(text) {
    
    const gudButtons = []

    const allButtons = await page.$x('//button');

    allButtons.forEach( async (button, index) => {
    
      console.log({ button })
  
      let value = await page.evaluate(el => el.textContent, button)
  
      console.log(value)
  
      if (value.trim().includes(text))
        gudButtons.push(button)

      if (index === (allButtons.length - 1)) {
        return gudButtons;
      }

    })

  }

  console.log({ page })

  const buttons = await page.$x('//button');

  console.log({ buttons })
  
  var one = true;

  buttons.forEach( async (button, index) => {
    
    console.log({ button })

    let value = await page.evaluate(el => el.textContent, button)

    console.log(value)

    if (value.trim() === 'Message' && one) {
      
      one = false;

      await button.click();

      await t_wait(2_000);
      // const xButtons = await getButtonsContaining('X')
      
      // page.re
      
      const xButtons = await page.waitForSelector('.msg-overlay-bubble-header__badge-container');
      //  const xButtons = await page.$x("//div");
      
      console.log(xButtons)
      
      const innerBtns = await page.$x('//button')
      
      console.log({ xButtons })
      console.log({ innerBtns })
      console.log( innerBtns.length )
      
      // await innerBtns[1].click()
      
      innerBtns.forEach(async inner => {
        console.log(inner)
        console.log(inner.innerText)
        console.log(inner.text)
        
        let value = await page.evaluate(el => el.textContent, inner)
        
        await t_wait(2_000);
        console.log(value)
        
        if (value.includes("Close your conversation with"))
        await inner.click()
        
        await t_wait(2_000);
        process.exit(0)
      })

      // xButtons[0].click()

      
      await t_wait(30_000);
    }
    

  })
  // console.log({ b })
  // console.log({ c })

// console.log(text[0]);
// console.log(text[1]);
// console.log(text[2]);




  // elements.forEach(async element => {
    
  //   console.log({ element })
  //   // await element.click();
  // });


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
