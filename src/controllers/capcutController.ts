import axios from "axios";
import browsers from "../lib/browser";

// export async function getTemplates(query?: string) {
//     const browser = await browsers();
//     // const context = await browser.createBrowserContext();
//     const page = await browser.newPage();

//     try {
//         await page.goto("https://www.capcut.com/templates", { waitUntil: query ? 'networkidle2' : 'domcontentloaded' });
//         if (query) {
//             await (await page.waitForSelector('input.lv-input', { visible: true }))?.type(query)
//             await page.keyboard.press('Enter')
//         }
//         const url = query ? "https://edit-api-sg.capcut.com/lv/v1/cc_web/replicate/search_templates" : "https://edit-api-sg.capcut.com/lv/v1/cc_web/replicate/get_collections"
//         const req = await page.waitForResponse((r) => r.url() == url && r.request().method() == "POST");
//         const res = await req.json();
//         return res;
//     } finally {
//         setTimeout(async () => await page.close(), 10_000)
//     }
// }

export async function searchTemplate(query?: string, cursor: string = '0') {
    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,id;q=0.8',
        'app-sdk-version': '48.0.0',
        'appvr': '5.8.0',
        'content-type': 'application/json',
        'device-time': '1713688336',
        'lan': 'id-ID',
        'loc': 'va',
        'origin': 'https://www.capcut.com',
        'pf': '7',
        'referer': 'https://www.capcut.com/',
        'sec-ch-ua': '"Microsoft Edge";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sign': '14ee1675cfe7871fa33b62e691715d7b',
        'sign-ver': '1',
        'tdid': '',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    }

    const req = await axios.post('https://edit-api-sg.capcut.com/lv/v1/cc_web/replicate/search_templates', JSON.stringify({
        "sdk_version": "86.0.0",
        "count": 20,
        "cursor": cursor,
        "enter_from": "workspace",
        "query": query,
        "scene": 1,
        "search_version": 2,
        "cc_web_version": 0
    }), {
        headers
    })

    return (req.data.data.video_templates)
}

export async function getTemplate(cursor: string = '0') {
    const headers = {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9,id;q=0.8',
        'app-sdk-version': '48.0.0',
        'appvr': '5.8.0',
        'content-type': 'application/json',
        'cookie': 'passport_csrf_token=a966441705db195f57ba20626422b71b; passport_csrf_token_default=a966441705db195f57ba20626422b71b; passport_auth_status=bb864de353d9bc07bc494f7ecbf2db8e%2C; passport_auth_status_ss=bb864de353d9bc07bc494f7ecbf2db8e%2C; sid_guard=e23816455e0a6215eea35dc5fd43112e%7C1713525458%7C34560000%7CSat%2C+24-May-2025+11%3A17%3A38+GMT; uid_tt=e5423cd123af80c8ea0bc1c717b5a61ab984d203c730508fe64cd30a93c20783; uid_tt_ss=e5423cd123af80c8ea0bc1c717b5a61ab984d203c730508fe64cd30a93c20783; sid_tt=e23816455e0a6215eea35dc5fd43112e; sessionid=e23816455e0a6215eea35dc5fd43112e; sessionid_ss=e23816455e0a6215eea35dc5fd43112e; sid_ucp_v1=1.0.0-KDkzMWE3ZDU3MjliYmRmODFiZjhmYmZkN2I4YTc1YTE2YTEzNDA1OWUKIAiBiNry9ObJhWMQ0qWJsQYYnKAVIAwwx86smAY4CEASEAMaA3NnMSIgZTIzODE2NDU1ZTBhNjIxNWVlYTM1ZGM1ZmQ0MzExMmU; ssid_ucp_v1=1.0.0-KDkzMWE3ZDU3MjliYmRmODFiZjhmYmZkN2I4YTc1YTE2YTEzNDA1OWUKIAiBiNry9ObJhWMQ0qWJsQYYnKAVIAwwx86smAY4CEASEAMaA3NnMSIgZTIzODE2NDU1ZTBhNjIxNWVlYTM1ZGM1ZmQ0MzExMmU; store-idc=alisg; store-country-code=id; store-country-code-src=uid; odin_tt=3e40fbea43a1eaa6c20d58de74168b280141fdc526d557a1b83acda4b163441f5d5451a64f2d3f45abf356125716d46a2b71da7c53e811a2646a73a7d937e535; ttwid=1|f6XYgTmF-OzWSOHIIfQzopcsC-q5ln5D6n6y4UCuH90|1713678675|c9a1adae367abcf919c8436f4b04a95b6cef3c9dfa0b0700e9864dd549da828c; msToken=cKJ6FsLyaudN-ta5kl-oJW32nKZBkJGwJGi1choOUg1XEC2uls9qrEREq1HiGq_3hKp4tHt0kj2sF38XMgZyruMvAmQrJOW-TCK2-1aBO_V79WFdFlfn5A==; msToken=ikg4k0F6w0pVpLamX4J6RJ7ERULXJpqTHkHRcD2mSRulzP9uoOAz-tkNl2PyHAWEFdB7plK29WuaybUATbKaXTxsi4f2num6hnI9cfVtEI6F0Dln_v9sCUtFMfXsgVs=; odin_tt=158b59450d329df354ce813f1f0f56aedd025c45939568e5d94c293af0c0aad5e4d6a4692f085cb1efc5efc4df75c919bbbc466439005632b0b74cd01d72add7',
        'device-time': '1713689022',
        'lan': 'id-ID',
        'loc': 'va',
        'origin': 'https://www.capcut.com',
        'pf': '7',
        'referer': 'https://www.capcut.com/',
        'sec-ch-ua': '"Microsoft Edge";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-site',
        'sign': 'cf8ad91fb00cd3aa6429c18107dfb888',
        'sign-ver': '1',
        'tdid': '',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
    }

    const req = await axios.post('https://edit-api-sg.capcut.com/lv/v1/cc_web/replicate/get_collection_templates', JSON.stringify({
        "sdk_version": "86.0.0",
        "id": 6002,
        "count": 20,
        "cursor": cursor,
        "uuid": "7136841152989660161",
        "cc_web_version": 0
    }), {
        headers
    })

    return (req.data.data.item_list)
}