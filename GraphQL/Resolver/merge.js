const Event = require("../../Models/event");
const User = require("../../Models/user");
const { dateToString } = require("../../helpers/date");
const dataLoder = require("dataloader");

const eventLoader = new dataLoder(eventIds => {
  return events(eventIds);
});

const userLoader = new dataLoder(userIds => {
  return User.find({ _id: { $in: userIds } });
});

const transformEvent = event => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: userFn.bind(this, event._doc.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    user: userFn.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    events.sort((a, b) => {
      return (
        eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
      );
    });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};

const userFn = async userId => {
  try {
    const user = await userLoader.load(userId.toString());

    return {
      ...user._doc,
      createdEvents: () => eventLoader.loadMany(user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

exports.userFn = userFn;
// exports.events = events;
// exports.singleEvent = singleEvent;

exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
