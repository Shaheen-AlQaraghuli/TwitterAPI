const express = require('express')

const tweetsRouter = require('./tweets')
const cryptoTweetsRouter = require('./cryptoTweets')
const tweetsFrequencyRouter = require('./tweetsFrequency')

const router = express.Router()

module.exports = router

router.use('/tweets', tweetsRouter)
router.use('/tweets/crypto', cryptoTweetsRouter)
router.use('/tweets/frequency', tweetsFrequencyRouter)