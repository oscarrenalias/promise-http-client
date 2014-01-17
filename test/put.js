var PromiseHttpClient = require('../lib/main'),
    client = new PromiseHttpClient(),
    helpers = require("./lib/helpers"),
    nock = require("nock");

nock(helpers.testUrl()).
    put("/put").reply(200, "PUT OK").
    put("/json").reply(201, function(uri, requestBody) {
        return requestBody;
    }, { "Content-Type": "application/json" }).
    put("/error").reply(400, "ERROR");

module.exports = {
    'Simple PUT request': function(test) {
        test.expect(1);
        client.put(helpers.testUrl("/put"), {"foo": "bar"}).then(function(body) {
            test.ok(body.length > 0);
            test.done();
        }).fail(helpers.failed(test));
    },

    'Error PUT request': function(test) {
        test.expect(1);
        var obj = { "foo": "bar"};
        client.put(helpers.testUrl("/error"), obj).then(function(body) {
            test.ok(false, "This request should not be successful");
            test.done();
        }).fail(function() {
                test.ok(true);
                test.done();
        });
    },

    'Simple PUT JSON request': function(test) {
        test.expect(1);
        var obj = { "foo": "bar"};
        client.putAsJson(helpers.testUrl("/json"), obj).then(function(body) {
            test.ok(body instanceof Object);
            test.done();
        }).fail(helpers.failed(test));
    }
}