import { Items } from '../lib/items';
import {Topics} from '../lib/content/topics'

Meteor.publish('items', function() {
  return Items.find();
});

Meteor.publish('topics', function() {
  return Topics.find();
});
