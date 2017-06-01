import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1'
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
              url: 'https://feeds.soundcloud.com/stream/275202399-amazon-web-services-306355661-amazon-web-services.mp3',
              offsetInMilliseconds: 0
            }
          }
        }
      ]
    }
  };
  callback(null, response);
}
