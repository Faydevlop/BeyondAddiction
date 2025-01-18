const express = require('express')
const {createReport,getAllReport} = require('../controllers/reportController')
const router = express.Router();

// POST create new Report (with credentials)
router.post('/addReport',createReport)

// POST List all Report data - admin
router.get('/getAllReports',getAllReport)

module.exports = router