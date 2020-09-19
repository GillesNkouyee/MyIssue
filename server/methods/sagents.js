Meteor.methods({
    'addAgent': function(doc) {
        console.log("Adding", doc);
        check(doc, Schemas.agents);

        Agents.insert(doc, function(err, _id) {console.log("AgentID:", _id);});//callback error function
    },
    'updateAgentData': function(doc, docID) {
        console.log("Updating", doc);
        check(doc, Agents.SimpleSchema());
      Agents.update({_id: docID}, doc);
    }
  });
