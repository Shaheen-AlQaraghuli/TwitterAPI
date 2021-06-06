const needle = require('needle')
const { twitterApiBearerToken } = require('../../config/twitterConfig')

async function requestHandler(req, res) {
  const name = req.body.name
  const count = req.body.count || 10

  const getTweetsURL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${name}&count=${count}`

  needle('get', getTweetsURL, {
    headers: {
      Authorization: `Bearer ${twitterApiBearerToken}`,
    },
  })
    .then(resp => {
      if (resp.statusCode !== 200) {
        res.json("Unexpected error")
        res.status(500)
        res.end()
      }
      else {
        res.json(getTweets(resp))
        res.status(200)
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
  return resp.body.map(getTextAndID)
}

function getTextAndID(tweet) {
  return { id: tweet.id, tweet: tweet.text }
}

module.exports = { requestHandler }