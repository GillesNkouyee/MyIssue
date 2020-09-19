Meteor.startup(function () {
process.env.MAIL_URL = 'smtp://gillesnkouye@gmail.com:nnBaby2014Chars@smtp.gmail.com:587/';
});

Meteor.methods({
  'sendAlert': function (to,cc,from, subject, replyTo,emailData) {
   //check([to, from, subject,replyTo,emailData], [String]);
    console.log("about to send email...");
    this.unblock();

      //if(error) {console.log("Error: " + error)};
      SSR.compileTemplate('htmlEmail', Assets.getText('html-Alertemail.html'));

          Email.send({
            to: to,
            cc: cc,
            from: from,
            subject: subject,
            replyTo: replyTo,

            html: SSR.render('htmlEmail', emailData),
            attachements:[{}],
          });
    }
});
