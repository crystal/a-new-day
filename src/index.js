import createEvent from './intents/createEvent';
import goodbye from './intents/goodbye';
import welcome from './intents/welcome';
import unknown from './intents/unknown';
import listEvents from './intents/listEvents';
import deleteEvent from './intents/deleteEvent';
import manage from './intents/manage';
import play from './intents/play';

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
        case 'ManageIntent': {
          manage(ev, context, callback);
          break;
        }
        case 'AMAZON.PauseIntent': {
          goodbye(ev, context, callback);
          break;
        }
        case 'AMAZON.ResumeIntent': {
          play(ev, context, callback);
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
      goodbye(ev, context, callback);
      break;
    }
    default: {
      console.log('error');
      break;
    }
  }
}
