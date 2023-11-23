require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});


async function postTweet(message) {
    const {consumedPercentage,notConsumedDays} = await getPercentage('2023-11-19',22)
    /* const legislaturePercentage = await getPercentage('2023-12-10',1460) */
    const timeBar = await getTimeBar(consumedPercentage);
    
    const messageComposed = `Quedan ${notConsumedDays} días para la legislatura de Milei. \n\n ${timeBar}`

    console.log(messageComposed)
    try {
        const tweet = await twitterClient.v2.tweet(messageComposed);
        console.log('Tweeted:', tweet);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getPercentage(initialDate,totalDays){
    const startDate = new Date(initialDate);
    const currentDate = new Date();

    const differenceInTime = currentDate.getTime() - startDate.getTime();

    const consumedDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    const notConsumedDays = totalDays-consumedDays;
    const consumedPercentage = ((consumedDays / totalDays) * 100).toFixed(1);

    return {consumedPercentage,consumedDays,notConsumedDays }
}

async function getTimeBar(percentage){
    const timeBarSize = 4;
    const timeBar = new Array(100/timeBarSize).fill('░');
    const percentageConsumed = Math.floor(percentage/timeBarSize);
    console.log(percentageConsumed)
    for (let index = 0; index < percentageConsumed; index++) {
        timeBar[index]= '▓'
    }
    return `${timeBar.join('')}`
    
}
postTweet('Días que quedan para la legislatura de Milei:');
/* ▓▓▓▓▓▓░░░░░░░░░░░░░░░░░░░ */
