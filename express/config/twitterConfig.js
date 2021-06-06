const dotenv = require("dotenv")

dotenv.config()

const twitterApiKey = process.env.TWITTER_API_KEY
const twitterApiSecretKey = process.env.TWITTER_API_SECRET_KEY
const twitterApiBearerToken = process.env.TWITTER_API_BEARER_TOKEN

module.exports = { twitterApiKey, twitterApiSecretKey, twitterApiBearerToken }