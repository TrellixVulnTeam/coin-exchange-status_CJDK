// @format
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

/*
 * By using a wildcard in the path with the onCreate event, we ensure
 * the function triggers whenver a new /status is written to the db
 *
 */
exports.updateExchangeStatusCount = functions.database
  .ref('/status/{id}')
  .onCreate(event => {

    /*
     * event.data is an instance of DeltaSnapshot
     *
     * https://firebase.google.com/docs/reference/functions/functions.database.DeltaSnapshot
     *
     */

    const status = event.data.val();
    const exchangeName = status.exchangeName;

    return event.data.ref.parent
      .orderByChild('exchangeName')
      .equalTo(exchangeName)
      .once('value')
      .then(snapshot => {
	// snapshot.val() will be an Object containing all the /status objects matching the query
	let count = snapshot.val() ? Object.keys(snapshot.val()).length : 0;
	// finally, update the status count for the exchange
	event.data.ref.parent.parent.child('/exchanges/' + exchangeName).update({statusCount: count});
      });
  });
