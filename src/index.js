import createEvent from './functions/createEvent';
import goodbye from './functions/goodbye';
import welcome from './functions/welcome';
import unknown from './functions/unknown';

export function handler(ev, context, callback) { // eslint-disable-line import/prefer-default-export
  console.log(JSON.stringify(ev, null, 2));

  switch (ev.request.type) {
    case 'LaunchRequest': {
      console.log('launched');
      welcome(ev, context, callback);
      return;
    }
    case 'IntentRequest': {
      switch (ev.request.intent.name) {
        case 'AddEventIntent': {
          createEvent(ev, context, callback);
          return;
        }
        case 'DeleteEventIntent': {
          deleteEvent(ev, context, callback);
          break;
        }
        case 'ListEventsIntent': {
          listEvents(ev, context, callback);
          break;
        }
        case 'AMAZON.StopIntent': {
          goodbye(ev, context, callback);
          break;
        }
        default: {
          console.log('error');
          unknown(ev, context, callback);
          break;
        }
      }
      break;
    }
    case 'SessionEndedRequest': {
      console.log('session ended');
      context.succeed();
      break;
    }
    default: {
      console.log('error');
      break;
    }
  }
}
