//Here we will import all our controllers, this way we only need to
//import the controller as a single module, or an explicit constant later!!!
const authController = require('./auth')
const messagesController = require('./messages')
const settingsController = require('./settings')
const scrapingController = require('./scraping')
const uploadController = require('./upload')
const adminController = require('./admin')


module.exports = {
  authController,
  messagesController,
  settingsController,
  scrapingController,
  uploadController,
  adminController
}