var http = require("http");
var frameModule = require("ui/frame");
var page;
var imageObject;
var observableModule = require("data/observable");
var source = new observableModule.Observable();
var viewModel = new observableModule.Observable();
//var pageData = [];

function loadImage(mediaID){
    http.getJSON("http://localhost/~inuwa/abuapp/wp-json/wp/v2/media/"+mediaID).then(function(response){
        console.log("GOT MEDIA");
        //source.imagePicture = response.guid.rendered;
        imageObject = response;
    },function(error){
        console.log("Got Media error");
        console.log("The error is: "+error);
    });
}
exports.loaded = function (args) {
    page = args.object;
    http.getJSON("http://localhost/~inuwa/abuapp/wp-json/wp/v2/posts?_embed").then(function(response){
        console.log("GOT DATA");
        var mediaID = response.featured_media;
        console.log("Media ID"+mediaID);
        //loadImage(mediaID);
        viewModel.set("pageData", response);
        //viewModel.set("imagePicture", imageObject);
        page.bindingContext = viewModel;
        //page.bindingContext = {pageData: response};
        
    },function(error){
        console.log("Got error");
        console.log("The error is: "+error);
    });
    /*if (page.ios) {
        var controller = frame.topmost().ios.controller;
        var navigationBar = controller.navigationBar;
        navigationBar.barStyle = 1;
    }*/
};
exports.onTap = function (args){
    console.log("To the Blog Page");
    var myview = args.view;
    var navigationEntry = {
        moduleName: "BlogPages/blogPage",
        context: { info: myview.bindingContext}
    }
    frameModule.topmost().navigate(navigationEntry);
}
var itemLoading = function (args) {
    var cell = args.ios;
    if (cell) {
        cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectStyleNone;
    }
};
exports.itemLoading = itemLoading;