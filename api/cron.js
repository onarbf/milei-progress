import { postTweet } from "../bot";

export default async function handler(req, res) {
    const response = await postTweet('');
    res.status(200).send('Tweeted');
  }