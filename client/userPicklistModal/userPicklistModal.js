Meteor.startup(function () {
  Session.setDefault('show_users_picklist', false);
  Session.setDefault('selectedUserId', null);
  Session.setDefault('selectedUserName', "");
  Session.setDefault('userSearchFilter', "");
});


Template.userPicklistModal.events({
  'click #userPicklistCancelButton': function (){
    Session.set('show_users_picklist', false);
    Session.set('show_reactive_overlay', false);
  },
  'change #userSearchInput': function (){
    Session.set('userSearchFilter', $('#userSearchInput').val());
  },
  'keyup #userSearchInput': function (){
    Session.set('userSearchFilter', $('#userSearchInput').val());
  },
  "click #userPicklistOkButton": function (event, template) {
    Session.set('show_users_picklist', false);
    Session.set('show_reactive_overlay', false);
  },
  'click .userRow': function (){
    Session.set("selectedUserId", this._id);
    Session.set('selectedUserName', this.profile.fullName);
    Session.set('userSearchFilter', this.profile.fullName);
    Session.set('show_users_picklist', false);
    Session.set('show_reactive_overlay', false);
  }
});


Template.userPicklistModal.helpers({
  getCurrentSearchFilter: function (){
    return Session.get('userSearchFilter');
  },
  usersList: function () {
    return Meteor.users.find({$or:[
      {
        _id: {
          $regex: Session.get('userSearchFilter'),
          $options: 'i'
        }
      },
      {
        'profile.fullName': {
          $regex: Session.get('userSearchFilter'),
          $options: 'i'
        }
      }
    ]});
  },
  getVisibility: function () {
    if (Session.get('show_users_picklist')) {
      return "visible";
    } else {
      return "fade";
    }
  }
});
