// Rooms = new Mongo.Collection("rooms");

Router.route('/', function () {
  this.render('home');
});

Router.route('/chatRoom', function () {
  this.render('chatRoom');
});

if (Meteor.isClient) {

  Template.home.events({
    // var user = currentUser;
    "click #karaoke": function () {
      Router.go('/chatRoom');
      // if (Rooms.find({user2: null, category: "karaoke"})){
      //   targetRoom = Rooms.find({user2: null, category: "karaoke"});
      //   targetRoom.update({user2: user}, function() {
      //     console.log(targetRoom.id)
      //   });
      // } else {
      // db.rooms.insert({ user1: user, user2: null, category: "karaoke", user1likes: 0, user2likes: 0 });
      // }
    },
    "click #rapBattle": function () {
      Router.go('/chatRoom');
      // if (Rooms.find({user2: null, category: "rapBattle"})) {
      //   targetRoom = Rooms.find({user2: null, category: "rapBattle"});
      //   targetRoom.update({user2: user});
      // } else {
      // db.rooms.insert({ user1: user, user2: null, category: "rapBattle", user1likes: 0, user2likes: 0  });
      // }
    },
    "click #debate": function () {
      Router.go('/chatRoom');
    //   if (Rooms.find({user2: null, category: "debate"})) {
    //     targetRoom = Rooms.find({user2: null, category: "debate", user1likes: 0, user2likes: 0 });
    //     targetRoom.update({user2: user});
    //   } else {
    //   db.rooms.insert({ user1: user, user2: null, category: "debate", user1likes: 0, user2likes: 0  });
    //   }
    // }
  }
  });

  Template.hello.events({
    "click #makeCall": function () {
      var user = this;
      var outgoingCall = peer.call(user.profile.peerId, window.localStream);
      window.currentCall = outgoingCall;
      outgoingCall.on('stream', function (remoteStream) {
        window.remoteStream = remoteStream;
        var video = document.getElementById("theirVideo")
        video.src = URL.createObjectURL(remoteStream);
      });
    },
    "click #endCall": function () {
      window.currentCall.close();
    }
  });

  Template.hello.helpers({
    users: function () {
      // exclude the currentUser
      var userIds = Presences.find().map(function(presence) {return presence.userId;});
      return Meteor.users.find({_id: {$in: userIds, $ne: Meteor.userId()}});
    }
  });

  Template.hello.onCreated(function () {
    Meteor.subscribe("presences");
    Meteor.subscribe("users");

    window.peer = new Peer({
      key: '2p9ffp7ol6p3nmi',  // change this key
      debug: 3,
      config: {'iceServers': [
        { url: 'stun:stun.l.google.com:19302' },
        { url: 'stun:stun1.l.google.com:19302' },
      ]}
    });

    // This event: remote peer receives a call
    peer.on('open', function () {
      $('#myPeerId').text(peer.id);
      // update the current user's profile
      Meteor.users.update({_id: Meteor.userId()}, {
        $set: {
          profile: { peerId: peer.id}
        }
      });
    });

    // This event: remote peer receives a call
    peer.on('call', function (incomingCall) {
      window.currentCall = incomingCall;
      incomingCall.answer(window.localStream);
      incomingCall.on('stream', function (remoteStream) {
        window.remoteStream = remoteStream;
        var video = document.getElementById("theirVideo")
        video.src = URL.createObjectURL(remoteStream);
      });
    });

    navigator.getUserMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia );

    // get audio/video
    navigator.getUserMedia({audio:true, video: true}, function (stream) {
      //display video
      var video = document.getElementById("myVideo");
      video.src = URL.createObjectURL(stream);
      window.localStream = stream;
    }, function (error) { console.log(error); }
    );

  });

}

if (Meteor.isServer) {
  Meteor.publish('presences', function() {
    return Presences.find({}, { userId: true });
  });
  Meteor.publish("users", function () {
    return Meteor.users.find({}, {fields: {"profile.peerId": true, "emails.address": true} });
  });
}