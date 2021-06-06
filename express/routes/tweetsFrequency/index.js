const express = require('express')
const middleware = require('../../middleware/validateName')
const post = require('./post')

const router = express.Router()

router.post('/', middleware, post.requestHandler)

module.exports = router