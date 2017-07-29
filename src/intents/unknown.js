import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-west-1'
});

export default function unknown(event, context, callback) {
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'SSML',
        ssml: `
          <speak>
            <audio src="https://s3.amazonaws.com/a-new-day/error.mp3" />
            I do not understand. Can you repeat that?
          </speak>
        `
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
