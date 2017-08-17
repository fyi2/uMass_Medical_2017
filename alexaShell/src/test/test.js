const conversation = require('alexa-conversation');
const app = require('../index.js'); // your Alexa skill's main file.

const opts = { // those will be used to generate the requests to your skill
  name: 'Power Morning 10x',
  appId: 'amzn1.ask.skill.a191af36-f440-4a57-9596-5c039a9cbb8b',
  // Either provide your app (app.handler must exist)...
  app: app,
  // ...or pass the handler in directly (for example, if you have a custom handler name)
  handler: app.customHandlerName
  // Other optional parameters. See readme.md
};

// initialize the conversation
conversation(opts)
  .userSays('LaunchIntent') // trigger the first Intent
    .plainResponse // this gives you access to the non-ssml response
	    // asserts that response and reprompt are equal to the given text
      .shouldEqual('Welcome back', 'This is the reprompt')
	    // assert not Equals
      .shouldNotEqual('Wrong answer', 'Wrong reprompt')
 	    // assert that repsonse contains the text
      .shouldContain('Welcome')
  	  // assert that the response matches the given Regular Expression
      .shouldMatch(/Welcome(.*)back/)
	    // fuzzy match, not recommended for production use. See readme.md for more details
      .shouldApproximate('This is an approximate match')
//  .userSays('IntentWhichRequiresSlots', {slotOne: 'slotValue'}) // next interaction, this time with a slot.
//    .ssmlResponse // access the SSML response
//      .shouldMatch(/<say>(Hello|Bye)</say>/)
//      .shouldNotMatch(/<say>Wrong answer</say>/)
  .end(); // this will actually run the conversation defined above
