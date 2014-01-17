module.exports = {
	failed: function(test) {
        return(function(err) {
            console.log("Promise failed: " + err);
            test.done();
        });
    },

    testUrl: function(path) {
        return("http://test" + (path == undefined ? "" : path));
    }
}