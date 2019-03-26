const bcrypt = require("bcryptjs");

const Event = require("../../Models/event");
const User = require("../../Models/user");
const Booking = require("../../Models/booking");

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });

    events.map(event => {
      return {
        ...event._doc,
        creator: userFn.bind(this, event._doc.creator)
      };
    });
    return events;
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return { ...event._doc, creator: userFn.bind(this, event._doc.creator) };
  } catch (err) {
    throw err;
  }
};

const userFn = async userId => {
  try {
    const user = await User.findById(userId);

    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return {
          ...event._doc,
          date: new Date(event._doc.date).toISOString(),
          creator: userFn.bind(this, event._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },

  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return {
          ...booking._doc,
          user: userFn.bind(this, booking._doc.user),
          event: singleEvent.bind(this, booking._doc.event),
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.updatedAt).toISOString()
        };
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
      date: new Date(args.eventInput.date),
      creator: "5c98a0b0a853792680fb9842"
    });

    let createdEvent;

    try {
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        creator: userFn.bind(this, result._doc.creator)
      };
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
  },

  createUser: async args => {
    try {
      const userr = await User.findOne({ email: args.userInput.email });

      if (userr) {
        throw new Error("User already exists");
      }
      const pass = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: pass
      });
      const res = await user.save();

      return res;
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async args => {
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: "5c98a0b0a853792680fb9842",
      event: fetchedEvent
    });
    const result = await booking.save();

    return {
      ...result._doc,
      user: userFn.bind(this, result._doc.user),
      event: singleEvent.bind(this, result._doc.event),
      createdAt: new Date(result._doc.createdAt).toISOString(),
      updatedAt: new Date(result._doc.updatedAt).toISOString()
    };
  },

  cancelEvent: async args => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = {
        ...booking.event._doc,
        creator: userFn.bind(this, booking.event._doc.creator)
      };
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
