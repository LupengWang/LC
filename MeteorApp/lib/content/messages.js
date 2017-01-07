import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

Meteor.methods({
  removeMessage(id) {
    check(id, String);
    Messages.remove(id);
  },
  addMessage() {
    const i = Messages.find().count();
    Messages.insert({

      createdAt: new Date(),
      name: `Message #${i}`
    });
  },
  updateMessageName(MessageId, name) {
    check(MessageId, String);
    check(name, String);
    Messages.update(MessageId, {
      $set: {
        name,
      }
    });
  }
});
