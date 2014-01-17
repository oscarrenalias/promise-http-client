/**
 * Wrapper around the Q and Q-IO HTTP functionality that implements some shorthand methods
 * to make dealing with GET and POST requests easier
 */

var Q = require("q"),
    _ = require("underscore"),
    qs = require("querystring"),
    logger = require("log4js").getLogger("net.renalias.promisehttpclient");

function PromiseHttpClient() {
    this.http = require("q-io/http");
}

PromiseHttpClient.prototype.get = function(url, headers) {
    var request = {
        url: url,
        method: "GET",
        headers: headers || {}
    };

    return _doRequest(this.http, request);
}

PromiseHttpClient.prototype.getAsJson = function(url, headers) {
    var request = {
        url: url,
        method: "GET",
        headers: _.defaults(headers || {}, { "Content-Type": "application/json" })
    };

    return _doRequest(this.http, request).then(asJson);
};

// Used by methods that deal with JSON, so that the body is automatically parsed as a JSON object
function asJson(body) {
    return(JSON.parse(body));
}

// since responses from Q-IO are Buffers, we need to convert them to string so that they're easier to manipulate
function asString(buffer) {
    return(buffer.toString());
}

PromiseHttpClient.prototype.postAsJson = function(url, body, headers) {
    var _body = JSON.stringify(body);
    var request = {
        url: url,
        method: "POST",
        body: [ _body ],
        headers:  _.defaults(headers || {}, { "Content-Type": "application/json", "Content-Length": _body.length })
    }

    return(_doRequest(this.http, request).then(asJson));
};

PromiseHttpClient.prototype.putAsJson = function(url, body, headers) {
    var _body = JSON.stringify(body);
    var request = {
        url: url,
        method: "PUT",
        body: [ _body ],
        headers: _.defaults(headers || {}, { "Content-Type": "application/json", "Content-Length": _body.length })
    }

    return(_doRequest(this.http, request).then(asJson));
};

PromiseHttpClient.prototype.deleteAsJson = function(url) {
    return(this.delete(url).then(asJson));
};

PromiseHttpClient.prototype.post = function(url, body, headers) {
    var _body = qs.stringify(body);
    var request = {
        url: url,
        method: "POST",
        headers: _.defaults(headers || {}, { "Content-Length": _body.length }),
        body: [ _body ]
    };

    return _doRequest(this.http, request);
};

PromiseHttpClient.prototype.delete = function(url) {
    var request = {
        url: url,
        method: "DELETE",
        headers: {},
        body: []
    };
    return _doRequest(this.http, request);
};

PromiseHttpClient.prototype.put = function(url, body, headers) {
    var request = {
        url: url,
        method: "PUT",
        headers: headers,
        body: [ body ]
    };

    return _doRequest(this.http, request);
};

function isErrorResponse(httpCode) {
    // TODO: there may other codes that are not errors
    return([200, 201].indexOf(httpCode) == -1);
}

// Helper method to handle HTTP calls
function _doRequest(http, request) {
    logger.debug("Sending request: " + JSON.stringify(request));

    return(Q.when(http.request(request), function (response) {
        if(isErrorResponse(response.status)) {
            var error = new Error("HTTP request failed with code " + response.status);
            error.response = response;
            throw error;
        }
        return Q.post(response.body, 'read', []).then(asString);
    }));
}

module.exports = PromiseHttpClient;