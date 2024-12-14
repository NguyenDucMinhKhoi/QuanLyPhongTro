const startBrower = require('./browser')
const scrapeController = require('./scrapeController')

let browser =startBrower()
scrapeController(browser)