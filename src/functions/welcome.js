import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1'
});

export default function welcome(event, context, callback) {
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'Welcome to Morning Routine! You can start your routine or manage your routine. Which one can I help with?'
      },
      shouldEndSession: false,
      card: {
        type: 'Simple',
        title: 'Test',
        content: 'Test'
      },
      reprompt: {
        outputSpeech: {
          type: 'PlainText',
          text: 'You can start your morning routine or manage your routine. Which one can I help with?'
        }
      }
    }
  };
  callback(null, response);
}
