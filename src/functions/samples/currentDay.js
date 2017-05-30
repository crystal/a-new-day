export default function currentDay(event, context, callback) {
  const response = {
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'PlainText',
        text: 'Today is the day.'
      },
      shouldEndSession: true
    }
  };
  callback(null, response);
}
