// https://www.npmjs.com/package/ssml-builder
// https://www.npmjs.com/package/alexa-skill-test

var Alexa = require('alexa-sdk');
var request = require('request-promise');
var Speech = require('ssml-builder');
var AmazonSpeech = require('ssml-builder/amazon_speech');
var Twit = require('twit-promise')

// Constants
var constants = require('../constants/constants.js');

// Helpers
var quoteAPI = require('../helpers/quoteAPI.js');
var tweetCleaner = require('../helpers/tweetCleaner.js');

// Set up basic variables needed by the mainStateHandler

var Tweet = new Twit({
  consumer_key : "buETm0O96Y5SXJkgaywfzJyHs",
  consumer_secret : "kSNOn17KHFwiclZjdoaHONZCWUw12b1T46k3IPZQCKny54yOFl",
  access_token : "12123842-Oi0EVpdLmzChexBbxFLQ3MiHA1QBL84jR29JldSmJ",
  access_token_secret : "LpX8uIXCzOp4goJCMZylFxnfNqOQ36YpzD0MTr59cUb7w"
})

// Main Handlers
var thirdStateHandlers = Alexa.CreateStateHandler(constants.states.THIRD, {

  'LaunchRequest': function () {
    this.handler.state = constants.states.WORD;
    let tweetBuffer = []
    let speech = new AmazonSpeech();
    speech.say(`AT real Donald Trump says`)
    speech.pause(`0.35s`)
    Tweet.get('statuses/user_timeline', { user_id: '25073877', count: 100 })
    .then( (results) => {
        tweetStream = results.data
        tweet = tweetStream[0].text
        let tweetCount = 0;
        let tweetIndex = 0 ;
        let cleanTweet = '' ;
        while (tweetCount < 5){
          tweet = tweetStream[tweetIndex].text
          cleanTweet = tweetCleaner.sanitize(tweet)
          if (cleanTweet != 'DROP') {
            tweetBuffer[tweetCount] = cleanTweet
            tweetCount +=1 ;
            console.log(`${cleanTweet}`)
          }
          tweetIndex += 1 ;
        }
        tweetCount -= 1
        for( i = tweetCount; i> -1; i--) {
          console.log(`TWEET: ${tweetBuffer[i]}`)
          speech.say(`${tweetBuffer[i]}`)
          speech.pause(`0.5s`)
        }
      speech.pause(`0.35s`)
      speech.say(`45th presidents latest top 5 tweets. Complete! Do you want to continue to quote of the day?`)
      let speechOutput = speech.ssml(true);
      console.log(speechOutput);
      this.emit(':ask', speechOutput,`Do you want to continue to word of the day`);
    })
  },
  'easterEgg': function() {
    this.emitWithState('AMAZON.HelpIntent');
  },
  'AMAZON.YesIntent': function() {
    this.handler.state = constants.states.QUOTE;
    console.log(` Twitter  next state set to : ${this.handler.state}`);
    this.emitWithState('LaunchRequest');
  },
  'AMAZON.NoIntent': function() {
    this.handler.state = constants.states.MAIN;
    this.emit(':saveState', true);
    let speech = new AmazonSpeech();
    speech.sayAs({"interpret": 'interjection', "word": `bon voyage`})
    let speechOutput = speech.ssml(true);
    this.emit(':tell', speechOutput);
  },

  'AMAZON.StopIntent': function () {
    this.handler.state = constants.states.MAIN;
    this.emit(':saveState', true);
    // State Automatically Saved with :tell
    let speech = new AmazonSpeech();
    speech.sayAs({"interpret": 'interjection', "word": `bon voyage`})
    let speechOutput = speech.ssml(true);
    this.emit(':tell', speechOutput);
  },

  'AMAZON.CancelIntent': function () {
    // State Automatically Saved with :tell
    this.handler.state = constants.states.MAIN;
    this.emit(':saveState', true);
    let speech = new AmazonSpeech();
    speech.sayAs({"interpret": 'interjection', "word": `bon voyage`})
    let speechOutput = speech.ssml(true);
    this.emit(':tell', speechOutput);
  },

  'SessionEndedRequest': function () {
    // Force State to Save when the user times out
    this.handler.state = constants.states.MAIN;
    this.emit(':saveState', true);
  },
  'AMAZON.HelpIntent': function () {
    let speechOutput = `We are in POTUS mode,  Would you like to hear a quote of the day?`
    this.emit(':ask', speechOutput, speechOutput);
  },
  'Unhandled': function () {
    this.emitWithState('AMAZON.HelpIntent');
  }

});

module.exports = thirdStateHandlers;
