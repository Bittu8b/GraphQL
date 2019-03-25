const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const Event = require("./Models/event.js");

const app = express();
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
        type Event{
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput{
            title: String!
            description: String!
            price: Float!
            date: String!

        }

        type RootQuery{
            events: [Event!]!

        }
        type RootMutation{
            createEvents(eventInput: EventInput): Event

        }
        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return Event.find()
          .then(events => {
            return events.map(event => {
              return { ...event._doc };
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      createEvents: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date)
        });

        return event
          .save()
          .then(result => {
            console.log("Insertion Successful " + result);
            return { ...result._doc };
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(
    "mongodb+srv://admin:007@graphql-cluster-v8me6.mongodb.net/graphql-dev?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connection Successful");
  })
  .catch(err => {
    console.log(err);
  });

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
