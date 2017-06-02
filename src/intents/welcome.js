import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1'
});

export default function welcome(event, context, callback) {
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'SSML',
        ssml: `
          <speak>
            <audio src="https://s3.amazonaws.com/a-new-day/welcome.mp3" />
            Welcome to <phoneme alphabet="ipa" ph="ə">A</phoneme> New Day!
            I'll guide you through your morning, and remind you of your tasks along the way.
            To manage your routine, say "manage".
            To start your routine, say "start".
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
          text: 'You can start your morning routine or manage your routine. Which one can I help with?'
        }
      }
    }
  };
  callback(null, response);
}
