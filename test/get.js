var PromiseHttpClient = require('../lib/main'),
	client = new PromiseHttpClient(),
	helpers = require("./lib/helpers"),
    nock = require("nock");

// Mocks for the GET requests
nock(helpers.testUrl()).
    get("/get").reply(200, "OK").
    get("/json").reply(200, {"foo": "bar"}, { "Content-Type": "application/json" }).
    get("/error").reply(400, "ERROR");

module.exports = {
	'Simple GET request': function(test) {
		test.expect(1);
		client.get(helpers.testUrl("/get")).then(function(body) {
			test.ok(body.length > 0);
			test.done();
		}).fail(helpers.failed(test));
	},

    'Error GET request': function(test) {
        test.expect(1);
        client.get(helpers.testUrl("/error")).then(function(body) {
            test.ok(false, "This request must not be successful");
            test.done();
        }).fail(function() {
            test.ok(true);
            test.done();
        });
    },

    'JSON GET request': function(test) {
        test.expect(1);
        client.getAsJson(helpers.testUrl("/json")).then(function(body) {
            test.ok(body instanceof Object);
            test.done();
        }).fail(helpers.failed(test));
    }
}