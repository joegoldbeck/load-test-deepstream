console.log('LOAD TEST GOOOOOOO!')

meteorDown.init(function (Meteor) {
  Meteor.subscribe('deepstreamsOnAir', function (error, result) {
    Meteor.kill();
  });
});

meteorDown.run({
  concurrency: parseInt(process.env.LOAD_TEST_VOLUME) || 10,
  url: process.env.LOAD_TEST_TARGET || "http://localhost:3000",
  key: process.env.METEOR_DOWN_KEY,
  auth: process.env.METEOR_DOWN_USERID_1 ? {userIds: [process.env.METEOR_DOWN_USERID_1, process.env.METEOR_DOWN_USERID_2] }
});
