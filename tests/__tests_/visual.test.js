const  puppeteer  = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

expect.extend({ toMatchImageSnapshot })

describe('Visual Regression Testing', () => {
    let browser;
    let page;

        beforeAll(async function(){
            browser = await puppeteer.launch({ headless: true })
            page = await browser.newPage()
        })

        afterAll(async  function(){
            await browser.close()
        })

       
        

        test('Full Page Snapshot', async function(){
            await page.goto('https://example.com')
            await page.waitForSelector('h1')
            const image = await page.screenshot()
            expect(image).toMatchImageSnapshot({
                failureThresholdType: 'pixel',
                failureThreshold: 500,
            }    
            )
        })
        
        test('Single Element Snapshot', async function(){
            await page.goto('https://example.com')
            const h1 = await page.waitForSelector('h1')
            const image = await h1.screenshot()
            expect(image).toMatchImageSnapshot({
                failureThresholdType: 'percent',
                failureThreshold: 0.01,
            }    
            )
        })

        test('Mobile Snapshot', async function(){
            await page.goto('https://example.com')
            await page.waitForSelector('h1')
            await page.emulate(puppeteer.devices['iPhone X'])
            const image = await page.screenshot()
            expect(image).toMatchImageSnapshot({
                failureThresholdType: 'percent',
                failureThreshold: 0.01,
            }    
            )
        })

        test('Tablet Snapshot', async function(){
            await page.goto('https://example.com')
            await page.waitForSelector('h1')
            await page.emulate(puppeteer.devices['iPad landscape'])
            const image = await page.screenshot()
            expect(image).toMatchImageSnapshot({
                failureThresholdType: 'percent',
                failureThreshold: 0.01,
            }    
            )
        })

})


