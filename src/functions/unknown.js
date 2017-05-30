import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1'
});

export default function unknown(event, context, callback) {
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'I do not understand. Can you repeat that?'
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
          text: 'I do not understand. Can you repeat that?'
        }
      }
    }
  };
  callback(null, response);
}
