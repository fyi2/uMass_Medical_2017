var Alexa = require('alexa-sdk');

// Constants
var constants = require('./constants/constants.js');

// Handlers
var onboardingStateHandlers = require('./handlers/onboardingStateHandlers.js');
var mainStateHandlers = require('./handlers/mainStateHandlers.js');
var thirdStateHandlers = require('./handlers/thirdStateHandlers.js');

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
  alexa.appId = constants.appId;
  alexa.dynamoDBTableName = constants.dynamoDBTableName;

  alexa.registerHandlers(
    onboardingStateHandlers,
    thirdStateHandlers,
    mainStateHandlers
  );

  alexa.execute();
};
