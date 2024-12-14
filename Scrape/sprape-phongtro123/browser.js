const puppeteer = require('puppeteer')

const startBrower = async () => {
    let browser
    try {
        browser = await puppeteer.launch({
            // Có hiện ui của Chromium hay không, false là có
            headless: false,
            // Chrome sử dụng mutiple layers của sandbox để tránh những nội dung web không đáng tin cậy
            //nếu tin tưởng content thì set như này
            args: ['--disable-setuid-sandbox'],
            // truy cập website bỏ qua lỗi liên quan http secure
            'ignoreHTTPSErrors': true
        })

    } catch {
        console.log('Khong tao duoc browser: ' + error)
    }

    return browser
}

module.exports = startBrower;