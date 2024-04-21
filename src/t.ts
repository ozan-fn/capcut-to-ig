import { CookieParam, Page } from "puppeteer-core"
import browsers from "./lib/browser"
import path from 'path'

const cookies = [{ "domain": ".instagram.com", "expirationDate": 1748116395, "hostOnly": false, "httpOnly": false, "name": "mid", "path": "/", "sameSite": "unspecified", "secure": true, "session": false, "storeId": "0", "value": "ZiLLqQALAAG7XNkZ-257NWHM84oB" }, { "domain": ".instagram.com", "expirationDate": 1745092408.67668, "hostOnly": false, "httpOnly": true, "name": "ig_did", "path": "/", "sameSite": "unspecified", "secure": true, "session": false, "storeId": "0", "value": "559F5B1A-ABD0-4145-94B9-D6130B9F7461" }, { "domain": ".instagram.com", "expirationDate": 1748116396.859737, "hostOnly": false, "httpOnly": true, "name": "datr", "path": "/", "sameSite": "no_restriction", "secure": true, "session": false, "storeId": "0", "value": "qcsiZoR-qI4tWq8HplTSURCM" }, { "domain": ".instagram.com", "expirationDate": 1745157698.363079, "hostOnly": false, "httpOnly": false, "name": "csrftoken", "path": "/", "sameSite": "unspecified", "secure": true, "session": false, "storeId": "0", "value": "DWJYprMLKva59hLzrjlnfKqxvhoZNcYH" }, { "domain": ".instagram.com", "expirationDate": 1721484098.363168, "hostOnly": false, "httpOnly": false, "name": "ds_user_id", "path": "/", "sameSite": "unspecified", "secure": true, "session": false, "storeId": "0", "value": "57444683423" }, { "domain": ".instagram.com", "expirationDate": 1714161211.598354, "hostOnly": false, "httpOnly": true, "name": "shbid", "path": "/", "sameSite": "unspecified", "secure": true, "session": false, "storeId": "0", "value": "\"15732\\05457444683423\\0541745092410:01f7921b4a467a934aa658c2a3419188e182aae94d3bd465193c40c0e981ff9fe3262023\"" }, { "domain": ".instagram.com", "expirationDate": 1714161211.598381, "hostOnly": false, "httpOnly": true, "name": "shbts", "path": "/", "sameSite": "unspecified", "secure": true, "session": false, "storeId": "0", "value": "\"1713556410\\05457444683423\\0541745092410:01f78852d14b15b1a7b83bb86ca29e2e194ab982ca84fff3b51324d148a74ebcb8040ae6\"" }, { "domain": ".instagram.com", "hostOnly": false, "httpOnly": true, "name": "rur", "path": "/", "sameSite": "lax", "secure": true, "session": true, "storeId": "0", "value": "\"VLL\\05457444683423\\0541745244095:01f702e58d300b0697ac3f52a26c6ecc578d28cbd1d09d3f604dc58977cf2eb20df7959a\"" }, { "domain": ".instagram.com", "expirationDate": 1745244098.363307, "hostOnly": false, "httpOnly": true, "name": "sessionid", "path": "/", "sameSite": "unspecified", "secure": true, "session": false, "storeId": "0", "value": "57444683423%3AwWh3KQGCRyKami%3A18%3AAYc1aUfVKWDQeTw1Thmd6X3zKUT1J7LV2Lv_RhodTQ" }]

async function main(path: string, caption: string = '') {
    const browser = await browsers()
    const page = await browser.newPage()

    try {
        await page.setCookie(...cookies as CookieParam[])
        await page.goto('https://www.instagram.com', { waitUntil: 'domcontentloaded' })
        await (await page.waitForSelector("xpath///button[normalize-space()='Not Now']", { visible: true }))?.click()
        await (await page.waitForSelector("xpath/(//*[name()='svg'][@aria-label='New post'])[1]", { visible: true }))?.click()
        await (await page.waitForSelector("xpath/(//*[name()='svg'][@aria-label='Post'])[1]", { visible: true }))?.click();
        (await page.waitForSelector("xpath///button[normalize-space()='Select from computer']", { visible: true }))?.click();
        await (await page.waitForFileChooser()).accept([path])
        await (await page.waitForSelector("xpath///button[normalize-space()='OK']", { visible: true }))?.click()
        await (await page.waitForSelector("xpath///div[contains(text(),'Next')]", { visible: true }))?.click()
        await (await page.waitForSelector("xpath///div[contains(text(),'Next')]", { visible: true }))?.click()
        await (await page.waitForSelector("xpath///div[@aria-label='Write a caption...']", { visible: true }))?.type(caption)
        await (await page.waitForSelector("xpath///div[contains(text(),'Share')]", { visible: true }))?.click()
        await page.waitForSelector("xpath///img[@alt='Animated checkmark']")
        const screenshot = await page.screenshot()
        return {
            screenshot: screenshot
        }
    } finally {
        await page.close()
    }
}

