var http = require("http");
var frameModule = require("ui/frame");
var viewModule = require("ui/view");

function Registration (info){
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new Observable({
        email: info.email || "",
        password: info.password || ""
    });
    
    exports.registration = function (){
        console.log("Registering");
        http.request({ url: "http://localhost/~inuwa/abuapp/wp-json/wp/v2/users", method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                username: source.username,
                password: source.password,
                email: source.email,
                first_name: source.first_name,
                last_name: source.last_name
            })
        }).then(function (response){
            console.log("Registration Response: "+ JSON.stringify(response));
            console.log("The Registration response text: "+ JSON.stringify(response.statusText));
            console.log("The Registration response numerical status: "+ JSON.stringify(response.status));
            if (response.ok){
                frameModule.topmost.navigate("loadedPages/loadedPages");
            }
        }, function (e){
        console.log("Error is "+e);
        });
    }//End registration
}
