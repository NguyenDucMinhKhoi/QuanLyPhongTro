const scrapers = require('./scraper')

const scrapeController = async (browserInstance) => {
    const url = 'https://phongtro123.com/'
    const indexs = [0, 1, 2, 3, 4]
    try {
        let browser = await browserInstance
        // gọi hàm cạo ở file s scrape
        const categories = await scrapers.scrapeCategory(browser, url)
        const selectedCategories = categories.filter((category, index) => indexs.some(i => i === index))

        await scrapers.scraper(browser, selectedCategories[0].link)

    } catch (err) {
        console.log('Loi o scrape controller: ' + err)
    }
}

module.exports = scrapeController