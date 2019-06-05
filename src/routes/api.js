/*
 * This file is used to build the API routes, we may have 
 * different routes for views and the like
 */

const express = require('express')

const authRoutes = require('./auth')
const scrapingRoutes = require('./scraping')
const messageRoutes = require('./messages')
const settingsRoutes = require('./settings')
const uploadRoutes = require('./upload')
const adminRoutes = require('./admin')
const router = express.Router()

router.use('/auth', authRoutes)

router.use('/scraping', scrapingRoutes)

router.use('/messages', messageRoutes)

router.use('/settings', settingsRoutes)

router.use('/upload', uploadRoutes)

router.use('/admin', adminRoutes)

module.exports = router