Meteor.startup(function () {
  Session.setDefault('show_users_picklist', false);
  Session.setDefault('selectedUserId', null);
  Session.setDefault('selectedUserName', "");
});


Template.userPicklistModal.events({
  "click #userPicklistOkButton": function (event, template) {
    Session.set('show_users_picklist', false);
    Session.set('show_reactive_overlay', false);
  },
  'click .userRow': function (){
    Session.set("selectedUserId", this._id);
    Session.set('selectedUserName', this.profile.fullName);
    Session.set('show_users_picklist', false);
    Session.set('show_reactive_overlay', false);
  }
});


Template.userPicklistModal.helpers({
  usersList: function () {
    return Meteor.users.find();
  },
  getVisibility: function () {
    if (Session.get('show_users_picklist')) {
      return "visible";
    } else {
      return "fade";
    }
  }
});
