console.log('LOAD TEST GOOOOOOO!')


// visit homepage and a single deepstream, then watch for 60 seconds
meteorDown.init(function (Meteor) {

	var observer = Meteor.observe("deepstreams");
	  observer.added = function(id) {
	    console.log("[ADDED] to " + observer.name + ":  " + id);
	  };
	  observer.changed = function(id, oldFields, clearedFields, newFields) {
	    console.log("[CHANGED] in " + observer.name + ":  " + id);
	    console.log("[CHANGED] old field values: ", oldFields);
	    console.log("[CHANGED] cleared fields: ", clearedFields);
	    console.log("[CHANGED] new fields: ", newFields);
	  };
	  observer.removed = function(id, oldValue) {
	    console.log("[REMOVED] in " + observer.name + ":  " + id);
	    console.log("[REMOVED] previous value: ", oldValue);
	  };

	Meteor.subscribe('deepstreamsOnAir', function (error, result) {
		Meteor.subscribe('deepstreamContext', '3zruKDSm', function (error, result) {
			Meteor.subscribe('singleDeepstream', 'curat0r', '3zruKDSm', function (error, result) {
				setTimeout(function() {
					Meteor.kill();
				}, (parseInt(process.env.SESSION_LENGTH) * 1000) || 60000);
			});
		});
	});
});


meteorDown.run({
	concurrency: parseInt(process.env.LOAD_TEST_VOLUME) || 10,
	url: process.env.LOAD_TEST_TARGET || "http://localhost:3000",
	key: process.env.METEOR_DOWN_KEY,
	auth: process.env.METEOR_DOWN_USERID_1 ? {userIds: [process.env.METEOR_DOWN_USERID_1, process.env.METEOR_DOWN_USERID_2] } : null
});
