var constants = Object.freeze({

  // App-ID. TODO: Set Your App ID
  appId : '',
  // Word of the day API Key
  // WOD_KEY : 'osuNmQtQrkmshXvs4SaMBUf0Qqnwp11lwn0jsn3s0meN4ggRkC',
  //  DynamoDB Table Name
  dynamoDBTableName : 'shellTable',

  // Skill States
  states : {
    ONBOARDING : '',
    MAIN : '_MAIN',
    THIRD: '_THIRD',
  }

});

module.exports = constants;
