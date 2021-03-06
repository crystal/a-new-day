import AWS from 'aws-sdk';

AWS.config.update({
  region: 'eu-west-1'
});

export default function play(event, context, callback) {
  const response = {
    version: '1.0',
    response: {
      shouldEndSession: true,
      card: {
        type: 'Simple',
        title: 'Test',
        content: 'Test'
      },
      directives: [
        {
          type: 'AudioPlayer.Play',
          playBehavior: 'REPLACE_ALL',
          audioItem: {
            stream: {
              token: 'abc',
              url: 'https://s3.amazonaws.com/a-new-day/routine.mp3',
              offsetInMilliseconds: 0
            }
          }
        }
      ]
    }
  };
  callback(null, response);
}
