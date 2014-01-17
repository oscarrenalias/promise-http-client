var PromiseHttpClient = require('../lib/main'),
	client = new PromiseHttpClient(),
	helpers = require("./lib/helpers"),
    nock = require("nock");

// Mocks for the POST requests
nock(helpers.testUrl()).
    post("/post").reply(200, "POST OK").
    post("/json").reply(201, function(uri, requestBody) {
        return requestBody;
    }, { "Content-Type": "application/json" }).
    post("/error").reply(400, "ERROR");

module.exports = {
	'Simple POST request': function(test) {
		test.expect(1);
		client.post(helpers.testUrl("/post"), {"foo": "bar"}).then(function(body) {
            test.ok(body.length > 0);
			test.done();
		}).fail(helpers.failed(test));
	},

    'Error POST request': function(test) {
        test.expect(1);
        var obj = { "foo": "bar"};
        client.post(helpers.testUrl("/error"), obj).then(function(body) {
            test.ok(false, "This request should not be successful");
            test.done();
        }).fail(function() {
            test.ok(true);
            test.done();
        });
    },

    'Simple POST JSON request': function(test) {
        test.expect(1);
        var obj = { "foo": "bar"};
        client.postAsJson(helpers.testUrl("/json"), obj).then(function(body) {
            test.ok(body instanceof Object);
            test.done();
        }).fail(helpers.failed(test));
    }
}