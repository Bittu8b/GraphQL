const Event = require("../../Models/event");
const { dateToString } = require("../../helpers/date");
const { transformEvent } = require("./merge");
const User = require("../../Models/user");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },

  createEvents: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: "5c98a0b0a853792680fb9842"
    });

    let createdEvent;

    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const user = await User.findById("5c98a0b0a853792680fb9842");
      // console.log("Insertion Successful " + result);
      // return { ...result._doc };

      if (!user) {
        throw new Error("User not found...");
      }
      user.createdEvents.push(event);
      await user.save();

      return createdEvent;
    } catch (err) {
      throw err;
    }
  }
};
