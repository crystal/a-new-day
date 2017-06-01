// after welcome, ask user to start or manage
// if manage, user can add, delete or hear all tasks
// if start, play audio file

import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1'
});

export default function manage(event, context, callback) {
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'SSML',
        ssml: `
          <speak>
            To hear all events in your morning routine, say "list events".
            To add an event, say "add". To delete an event say "delete".
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