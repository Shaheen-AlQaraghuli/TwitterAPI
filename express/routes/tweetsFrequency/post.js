const needle = require('needle')
const { twitterApiBearerToken } = require('../../config/twitterConfig')
const fs = require('fs')
const path = require("path")

async function requestHandler(req, res) {
  const name = req.body.name

  const getTweetsURL = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${name}&count=200}`
  const getFastAPIURL = 'http://localhost:8000/'

  try {
    let resp = await needle('get', getTweetsURL, {
      headers: {
        Authorization: `Bearer ${twitterApiBearerToken}`
      }
    })


    if (resp.statusCode !== 200) {
      res.json("Unexpected error")
      res.status(500)
      res.end()
    }
    else {
      createCSV(resp, name)
      const payload = {
        name
      }
      await needle('post', getFastAPIURL, payload, { json: true })
      console.log("here")
      let image = getImage(name)

      res.json({ img: image })
      res.status(200)
      console.log("here")
      res.end()
    }

  } catch (error) {
    console.dir(error, { depth: Infinity })
    res.status(500)
    res.end()
  }

}

function getImage(name) {
  const relativePath = `../../../fastapi/${name}.png`
  const bitmap = fs.readFileSync(path.resolve(__dirname, relativePath))
  deleteFiles(name)
  return new Buffer.from(bitmap).toString('base64')
}

function deleteFiles(name) {
  const pathPNG = `../../../fastapi/${name}.png`
  const pathCSV = `../../${name}.csv`

  fs.unlinkSync(path.resolve(__dirname, pathPNG))
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