const express = require('express')
const middleware = require('../../middleware/validateNameAndCount')
const post = require('./post')

const router = express.Router()

router.post('/', middleware, post.requestHandler)

module.exports = router