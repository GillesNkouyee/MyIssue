Meteor.methods({
  parseUpload(data) {
    check(data,Array);

    for (let i = 0; i < data.length; i++ ) {
      let item   = data[i],
          //loginexists = Agents.findOne({login:item.login});
          agentexists = Agents.findOne({_id:item._id});

      if (!agentexists) {
        Agents.insert(item);
      } else {
        console.warn( 'Rejected. This item already exists.' );
      }
    }
  }
});
