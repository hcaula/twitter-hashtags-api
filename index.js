require('dotenv/config')
const Twitter = require('twitter')
const express = require('express')
const app = express()
const port = process.env.PORT

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  bearer_token: process.env.BEARER_TOKEN
})

app.get('/twitter', (req, res) => {
  const { q } = req.query

  client.get('search/tweets', { q }, (error, tweets) => {
    if (error) {
      console.error(error)
      res.status(500).send(error)
      return
    }

    res.status(200).send(tweets)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
