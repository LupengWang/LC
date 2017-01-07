import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Topics = new Mongo.Collection('topics');

Meteor.methods({
  removeTopic(id) {
    check(id, String);
    Topics.remove(id);
  },
  addTopic() {
    const i = Topics.find().count();
    Topics.insert({
      type:'ask',
      title: `Topic #${i}`,
      content: '',
      createdAt: new Date()
    });
  },
  insertTopic(topic){
    Topics.insert({
      type:'ask',
      title:topic.title,
      conent:topic.content,
      createdAt: new Date()
    });
  },
  updateTopicName(TopicId, name) {
    check(TopicId, String);
    check(name, String);
    Topics.update(TopicId, {
      $set: {
        name,
      }
    });
  }
});
