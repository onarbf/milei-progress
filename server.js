const express = require('express')
const { postTweet } = require('./bot')
const app = express()
const port = process.env.PORT ||3000

app.get('/api/bot', async (req, res) => {
  const response = await postTweet('Días que quedan para la legislatura de Milei :');
  console.log(response);
  res.status(200).send('Tweeted');

})

app.listen(port, () => {
  console.log(`Milei Progress running on port ${port}`)
})