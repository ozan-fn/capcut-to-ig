import puppeteer, { Browser } from "puppeteer-core";

let browser: Browser | null = null;

async function browsers() {
    if (browser === null) browser = await puppeteer.launch({
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: false
    });
    return browser;
}

export default browsers;
