var html = require("ui/html-view");
var http = require("http");
var viewModule = require("ui/core/view");
var observable = require("data/observable").Observable;
var gotData;
var commentLink;
var postId;
var htmlViewText = "";
var page;

function loadComments (link){
   http.getJSON(commentLink).then(function (response){
        console.log("Got the commment data");
        var responseData = response;
        console.log("Response Data is:"+JSON.stringify(responseData));
        responseData.forEach(mergeText);
        page.bindingContext= {passedData: gotData};
        var myComments = page.getViewById("commentView");
        myComments.html = htmlViewText;
        console.log("HTML VIEW TEXT \n"+htmlViewText);
    },function (error){
        console.log("GOT AN ERROR: "+error);
    });
}
exports.sendComments = function (args){
    //var pageView = args.object;
    var modalPageModule = "BlogComments/blogComments";
    var context = ""+postId;
    console.log("The Context is: "+postId);
    var fullscreen = false;
    page.showModal(modalPageModule, context, function closeCallback() {}, fullscreen);
}

function mergeText(commentText){
    console.log("In the mergeText function"+ commentText.author_name);
    
    htmlViewText += commentText.author_name+"<br />"+commentText.date+"<br />"+commentText.content.rendered+"<br />";
    console.log("In the mergeText function "+ htmlViewText);
}

exports.pageLoaded= function (args){
    page = args.object;
    gotData = page.navigationContext.info;
    commentLink = gotData._links.replies[0].href;
    postId = gotData.id;
    console.log("The comment Link is "+commentLink);
    htmlViewText = "";
    loadComments(commentLink);
}
