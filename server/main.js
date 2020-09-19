
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';


Meteor.methods({
    sendSMS: function (body) {
        twilio = Twilio('AC8a4fea54941a185892ab436ae3d028b7','961fdb3e93e4bfea302d687518b66fdc');
        twilio.sendSms({
            to:'+237699103611',
            from: '+17194530451',
            body: message
        }, function(err, responseData) { //this function is executed when a response is received from Twilio
            if (!err) {
                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
            }
        });
    }
});
