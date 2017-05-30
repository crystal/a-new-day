import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1'
});

export default function goodbye(event, context, callback) {
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'Thanks for using Morning Routine!'
      },
      shouldEndSession: true,
      card: {
        type: 'Simple',
        title: 'Test',
        content: 'Test'
      }
    }
  };
  callback(null, response);
}
