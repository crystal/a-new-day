### *"Alexa, start a new day"*



Meet A New Day: An Alexa Skill which allows users to input their typical morning into our app.

With this information, A New Day guides you through your morning to keep you on track.

A successful morning sets the tone for a great day.

### The Tech

For this project I used to following technologies:
- Alexa Skills Kit
- AWS Lambda
- S3
- Serverless
- DynamoDB
- As well as: Babel, Nodemon, Express, BodyParser, Promises, Bluebird and more!

## The Goal

I sought out to create an Alexa Skill which was immersive. It's difficult to avoid a stressful morning with a long list of things to do and check before we leave for school and work each day.

I imagined an app which allows users to input *their* typical morning. The app reminds you to accomplish those tasks without the constant barking of alarms. As the user is getting dressed, the app will inform them of the weather. Just before you walk out the door, a gentle reminder to grab your phone and wallet (or whatever you need reminding about). And that's it!

## The Challenges
>**Amazon Skills Kit does not currently allow push notifications**

Alexa will not speak to the user without the user first initiating the conversation using an invoke word

>**The Echo has NO persistence**

I used a noSQL database (DynamoDB) to store each event included in the users routine. I was able to do full CRUD with Alexa so the user can Manage their morning routine easily using voice commands.
