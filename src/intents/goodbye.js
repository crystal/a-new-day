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
        text: 'Thanks for using A New Day!'
      },
      shouldEndSession: true,
      card: {
        type: 'Simple',
        title: 'Test',
        content: 'Test'
      },
      directives: [
        {
          type: 'AudioPlayer.Stop'
        }
      ]
    }
  };
  callback(null, response);
}
