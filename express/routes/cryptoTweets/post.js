const needle = require('needle')
const { twitterApiBearerToken } = require('../../config/twitterConfig')

async function requestHandler(req, res) {
  const name = req.body.name

  const getTweetsURL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${name}&count=200`

  needle('get', getTweetsURL, {
    headers: {
      Authorization: `Bearer ${twitterApiBearerToken}`,
    },
  })
    .then(resp => {
      if (resp.statusCode === 200) {
        let tweets = getTweets(resp)
        res.json(crypto(tweets))
        res.status(200)
        res.end()
      }
      else {
        res.json("Unexpected error")
        res.status(500)
        res.end()
      }
    })
    .catch(err => {
      console.dir(err)
      res.status(500)
      res.end()
    })
}


function getTweets(resp) {
  return resp.body.map(getText)
}

function getText(tweet) {
  return { id: tweet.id, date: tweet.created_at, tweet: tweet.text }
}

function crypto(tweets) {
  const dictionary = require('./dictionary')
  const listOfCommonWords = dictionary()
  const tweetsThatContainCrypto = []
  let tweet

  /**
   * this is O(n^2) but it is not a problem because our
   * data set is always going to be small since we can
   * only get up to 200 tweets and our dictionary of
   * words is small as well.
   */

  for (let i = 0; i < tweets.length; i++) {
    tweet = tweets[i].tweet.toLowerCase()

    for (let k = 0; k < listOfCommonWords.length; k++) {
      if (tweet.includes(listOfCommonWords[k])) {
        tweetsThatContainCrypto.push(tweets[i])
        break
      }
    }
  }

  return {
    count: tweetsThatContainCrypto.length,
    tweetsThatContainCrypto
  }
}

module.exports = { requestHandler }