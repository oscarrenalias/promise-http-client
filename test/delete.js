var PromiseHttpClient = require('../lib/main'),
    client = new PromiseHttpClient(),
    helpers = require("./lib/helpers"),
    nock = require("nock");

nock(helpers.testUrl()).
    delete("/delete").reply(200, "PUT OK").
    delete("/json").reply(201, { "foo": "bar"}, { "Content-Type": "application/json" }).
    delete("/error").reply(400, "ERROR");

module.exports = {
    'Simple DELETE request': function(test) {
        test.expect(1);
        client.delete(helpers.testUrl("/delete")).then(function(body) {
            test.ok(body.length > 0);
            test.done();
        }).fail(helpers.failed(test));
    },

    'Error DELETE request': function(test) {
        test.expect(1);
        client.delete(helpers.testUrl("/error")).then(function(body) {
            test.ok(false, "This request should not be successful");
            test.done();
        }).fail(function() {
                test.ok(true);
                test.done();
        });
    },

    'Simple DELETE JSON request': function(test) {
        test.expect(1);
        client.deleteAsJson(helpers.testUrl("/json")).then(function(body) {
            test.ok(body instanceof Object);
            test.done();
        }).fail(helpers.failed(test));
    }
}