if (Meteor.isClient) {
  Template.hello.helpers({
    extcls:"ezt",
    attrs: {id:"aaa", style:"color:red"}
  });
}
