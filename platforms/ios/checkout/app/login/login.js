var http = require("http");
var observable = require("data/observable").Observable;
var frameModule = require("ui/frame");
var registeration = require("register/register");
var source = new observable;
var page;

exports.signIn = function (){
    console.log("Signing in");
    http.request({ url: "http://localhost/~inuwa/abuapp/wp-json/wp/v2/users",
        method: "GET",
        headers: { "Content-Type": "application/json" },
        content: JSON.stringify({
                    email: source.email,
                    password: source.password
                })
    }).then(function (response) {
    //// Argument (response) is HttpResponse!
    //for (var header in response.headers) {
    //    console.log(header + ":" + response.headers[header]);
    //}
        console.log("The response: "+JSON.stringify(response));
        console.log("The response text: "+ JSON.stringify(response.statusText));
        console.log("The response numerical status: "+ JSON.stringify(response.status));
        if (response.ok){
            frameModule.topmost.navigate("loadedPages/loadedPages");
        }
    }, function (e) {
    //// Argument (e) is Error!
        console.log("Error is "+e);
    });
}


exports.loaded = function (args){
    page = args.object;
    source.username = "Enter your username";
    source.password = "";
    page.bindingContext = source;
}