const needle = require('needle')
const { twitterApiBearerToken } = require('../../config/twitterConfig')
const fs = require('fs')
const path = require("path")

async function requestHandler(req, res) {
  const name = req.body.name

  const getTweetsURL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${name}&count=200}`
  const getFastAPIURL = 'http://localhost:8000/'

  let resp

  try {

    resp = await needle('get', getTweetsURL, {
      headers: {
        Authorization: `Bearer ${twitterApiBearerToken}`
      }
    })

    if (resp.statusCode !== 200) {
      res.json("Unexpected error")
      res.status(500)
      res.end()
      return
    }

  } catch (error) {
    console.log("tweets/frequency/1")
    console.dir(error, { depth: Infinity })
    res.status(500)
    res.end()
  }

  try {

    createCSV(resp, name)
    const payload = {
      name
    }

    let imageResponse = await needle('post', getFastAPIURL, payload, { json: true })

    if (imageResponse.statusCode !== 200) {
      res.json("Unexpected error")
      res.status(500)
      res.end()
      return
    }

    let imageBase64 = imageResponse.body.image

    deleteFiles(name)

    res.json({ image: imageBase64 })
    res.status(200)
    res.end()

  } catch (error) {
    console.log("tweets/frequency/2")
    console.dir(error, { depth: Infinity })
    res.status(500)
    res.end()
  }

}

function deleteFiles(name) {
  const pathCSV = `../../${name}.csv`

  fs.unlinkSync(path.resolve(__dirname, pathCSV))
}

function createCSV(tweets, name) {
  const createCsvWriter = require('csv-writer').createObjectCsvWriter
  const csvWriter = createCsvWriter({
    path: `${name}.csv`,
    header: [
      { id: "tweet", title: "tweet" },
      { id: "month", title: "month" }
    ]
  })

  const records = getRecords(tweets)

  csvWriter.writeRecords(records)
}

function getRecords(tweets) {
  return tweets.body.map(getTextAndDate)
}

function getTextAndDate(tweet) {
  return { tweet: tweet.text, month: tweet.created_at.split(" ")[1] }
}

module.exports = { requestHandler }