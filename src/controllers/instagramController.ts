import { CookieParam, Page } from "puppeteer-core"
import browsers from "../lib/browser"
import path from 'path'
import cookies from '../../cookies.json'

let first = true

export async function uploadInstagram(path: string, caption: string = '') {
    const browser = await browsers()
    const page = await browser.newPage()

    try {
        await page.setCookie(...cookies as CookieParam[])
        await page.goto('https://www.instagram.com', { waitUntil: 'domcontentloaded' })
        first && await (await page.waitForSelector("xpath///button[normalize-space()='Not Now']", { visible: true }))?.click()
        await (await page.waitForSelector("xpath/(//*[name()='svg'][@aria-label='New post'])[1]", { visible: true }))?.click()
        await (await page.waitForSelector("xpath/(//*[name()='svg'][@aria-label='Post'])[1]", { visible: true }))?.click();
        (await page.waitForSelector("xpath///button[normalize-space()='Select from computer']", { visible: true }))?.click();
        await (await page.waitForFileChooser()).accept([path])
        first && await (await page.waitForSelector("xpath///button[normalize-space()='OK']", { visible: true }))?.click()
        await (await page.waitForSelector("xpath///div[contains(text(),'Next')]", { visible: true }))?.click()
        await (await page.waitForSelector("xpath///div[contains(text(),'Next')]", { visible: true }))?.click()
        await (await page.waitForSelector("xpath///div[@aria-label='Write a caption...']", { visible: true }))?.type(caption)
        await (await page.waitForSelector("xpath///div[contains(text(),'Share')]", { visible: true }))?.click()
        await page.waitForSelector("xpath///img[@alt='Animated checkmark']")
        const screenshot = await page.screenshot()

        first = false
        return {
            screenshot: screenshot
        }
    } finally {
        await page.close()
    }
}

