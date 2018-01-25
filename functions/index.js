// @format
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/*
 * By using a wildcard in the path with the onCreate event, we ensure
 * the function triggers whenver a new /post is created in the db
 *
 */
exports.updateExchangePostsCount = functions.database
  .ref('/posts/{id}')
  .onCreate(event => {
    /*
     * event.data is an instance of DeltaSnapshot
     *
     * https://firebase.google.com/docs/reference/functions/functions.database.DeltaSnapshot
     *
     */

    const post = event.data.val();
    const exchangeKey = post.exchangeKey;

    return event.data.ref.parent
      .orderByChild('exchangeKey')
      .equalTo(exchangeKey)
      .once('value')
      .then(snapshot => {
        // snapshot.val() will be an Object containing all the /status objects matching the query
        let count = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
        // finally, update the posts count for the exchange
        event.data.ref.parent.parent
          .child('/exchanges/' + exchangeKey)
          .update({postsCount: count});
      });
  });

// add onDelete so it decrements
//
// add timestamps to posts?
//
// us once instead of on for /exchanges home so it automatically updates when back endjkj
