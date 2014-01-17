var PromiseHttpClient = require("../lib/main"),
    client = new PromiseHttpClient();

console.log("This will generate a list of the most recent public events using the Github JSON API");

// For some reason github needs that we provide a user agent, even a dummy one
client.getAsJson("https://api.github.com/events", {"User-Agent": "Foo"}).then(function(body) {
    body.forEach(function(event) {
        console.log(
            "Event type: " + event.type +
            ", user: " + event.actor.login +
            ", repository: " + event.repo.name
        );
    });
}).fail(function(err) {
    console.log("There was an error retrieving the page: " + err);
});