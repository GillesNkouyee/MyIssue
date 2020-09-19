import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './index/index.html';
if (Meteor.IsClient){
    // $(window).scroll(function(event){
    //   console.log(new Date());
    // })
    Session.set("renderLimit",9);
    lastScrollTop=0;
    $(window).scroll(function(event){
      //console.log(new Date());
      //Bert.alert("this my domain and it's all working good!",'success');
      console.log(lastScrollTop);
      //test if we are near the bottom of the window
      if($(window).scrollTop() + $(window).height()> $(document).height()-100){
        //where are we in th page?
        var scrollTop = $(this).scrollTop();
        //test if we are going down
        if (scrollTop > lastScrollTop) {
          Bert.alert("this my domain and now we are moving down!",'info');
          Session.set("renderLimit",Session.get("renderLimit")+6);
          lastScrollTop = scrollTop;
          console.log(renderLimit);
          }
      }
    })
    //this.maliste = new ReactiveVar([]);
    //this.supportAgents = new ReactiveVar([]);
    // Template.dashboardview.onCreated(function() {
    //   Session.set("renderLimit",9);
    //   lastScrollTop=0;
    //   maliste.set(Agents.find({direction:"DOPS"}, {sort: {createdAt: -1},limit:Session.get("renderLimit")}));
    //   supportAgents.set(Agents.find({ direction: { $in: ["DSI", "DRH", "DMG", "DG", "DFORM","DCOMM","DQLT","DFI"] }}, {sort: {createdAt: -1},limit:Session.get("renderLimit")}));
    //   // likecounter starts at 0
    //   this.counter = new ReactiveVar(0);
    //
    //   Blaze._allowJavascriptUrls();
    //
    // })
    Template.dashboardview.helpers({
      'ProdAgents': function(){
        return  Agents.find({direction:"DOPS"}, {sort: {createdAt: -1},limit:Session.get("renderLimit")})
        //return maliste.get();
        },
    	'SupportAgents': function(){
        return  Agents.find({ direction: { $in: ["DSI", "DRH", "DMG", "DG", "DFORM","DCOMM","DQLT","DFI"] }}, {sort: {createdAt: -1},limit:Session.get("renderLimit")})
        //return  supportAgents.get();
        },
      helperTEXT: function(){
             Agents.find({},{fields:{nom:1,formation:1}});
            return nom + formation;
          },
        //'Numero utile:699103611|Gpe Sanguin: O+|Allergie: Quinine';
      hasitem: function(){
          //var currentUser = Meteor.userId();
          //return  Curriculums.find({}).count();
          return maliste.get().count();
      },
       hasSupportAgents: function(){
          //var currentUser = Meteor.userId();
          //return  Curriculums.find({}).count();
          return  supportAgents.get().count();
      },

       distinctgroup: function() {
          return _.uniq(Agents.find({direction:"DOPS"},{sort: {
            fonction: 1},fields:{fonction:true}
          }).fetch(), true, doc => {
            return doc.fonction;
          });
        },
    	distinctDirGpe: function() {
          return _.uniq(Agents.find({ direction: { $in: ["DSI", "DRH", "DMG", "DG", "DFORM","DCOMM","DQLT","DFI"] } },{sort: {
            direction: 1},fields:{direction:true}
          }).fetch(), true, doc => {
            return doc.direction;
    		console.log(doc.direction);
          });
        },
        "keyup input": _.debounce(function(e) {

          var projet = $("[name ='nomProjet']").val().trim(),
          search = {};
          if(projet) search.projet = {$regex: new RegExp(projet),
          $options: "i"};
          maliste.set(Agents.find(search));
        }, 200)


    });
}

if(Meteor.isServer){

}
