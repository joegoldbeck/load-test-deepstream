console.log('LOAD TEST GOOOOOOO!')

meteorDown.init(function (Meteor) {
  Meteor.subscribe('deepstreamsOnAir', function (error, result) {
    Meteor.kill();
  });
});

meteorDown.run({
  concurrency: 10,
  url: "http://localhost:3000"
});
