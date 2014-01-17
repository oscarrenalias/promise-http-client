PromiseHttpClient
=================
PromiseHttpClient is a simple promise-based HTTP client based on Q and Q-IO, and provides a nicer approach to dealing
with asynchronous requests. Results from HTTP requests are standard Q promises.

Current features:

- Supports GET, PUT, POST and DELETE verbs
- Supports JSON requests and responses, with automatic marshalling and unmarshalling

See the *TODO* section below for the list of features not currently supported

Usage
=====
Use npm to add the library as a dependency to your project:

```npm install --save promise-http-client```

Examples
========
How to retrieve the Yahoo.com frontpage using the library:

```
var PromiseHttpClient = require("promisehttpclient"),
    client = new PromiseHttpClient();

client.get("http://www.yahoo.com").then(function(body) {
    console.log(body);
}).fail(function(err) {
    console.log("There was an error retrieving the page: " + err);
});
```

See the *examples/* folder for a runnable client

Testing
=======
Use ```grunt test``` to run the unit tests.

Unit tests are built with Nock (https://github.com/pgte/nock), so the client is not hitting a live HTTP server but instead
a mocked one, which means that there may be real world scenarios where the client does not work as expected. Feel free to report an issue
for cases where the behaviour of the client is incorrect.

TODO
====
The following features are in the roadmap:

- Support for HTTP 302 redirects
- Implement the remaining HTTP methods (OPTIONS, PATCH, etc)
- Gzipped requests and responses

License
=======
Apache License 2.0: http://www.apache.org/licenses/LICENSE-2.0.html