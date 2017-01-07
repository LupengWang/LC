import { Meteor } from 'meteor/meteor';
import {Items} from '../lib/items';
import {Topics} from '../lib/content/topics';
import {Messages} from '../lib/content/messages';

Meteor.startup(function () {
  if (Items.find().count() === 0) {
    let i = 0;
    let timestamp = (new Date()).getTime();
    while (i < 10) {
      Items.insert({
        name: `Item #${i}`,
        createdAt: new Date(timestamp),
        complete: false
      });
      timestamp += 1; // ensure unique timestamp
      i += 1;
    }
  }

  if (Topics.find().count() === 0) {
    let i = 0;
    let timestamp = (new Date()).getTime();
    while (i < 3) {
      Topics.insert({
        type:'ask',
        title: `topic #${i}`,
        content: 'content #${i}',
        createdAt: new Date(timestamp),
      });
      timestamp += 1; // ensure unique timestamp
      i += 1;
    }
  }

});
