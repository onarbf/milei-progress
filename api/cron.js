import { postTweet } from "../bot";

export default async function handler(req, res) {
    const response = await postTweet('Días que quedan para la legislatura de Milei :');
    console.log(response);
    res.status(200).send('Tweeted');
  }