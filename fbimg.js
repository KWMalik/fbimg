var imagesToLoad = 0;
$(document).ready(function(){
    FB.init({appId: '185935958086685', status: true, cookie: true, xfbml: true});
    FB.Event.subscribe('auth.sessionChange', function(response) {
        if (response.session) {
        // A user has logged in, and a new cookie has been saved
        } else {
        // The user has logged out, and the cookie has been cleared
        }
    });
	$("#searchbox").keypress(function(e){ if(e.which == 13) search($("#searchbox").val()); });
	$("#searchbox").bind("focus", focusOnSearch);
	if(window.location.hash != null){	//we are searching from something in URL
		search(window.location.hash);
	}
});
function refresh(searchterm){
	var limit = 200;
    FB.api('/search',{
            q:          searchterm,
            type:       "post",
            limit:      limit
        },function(json){
            if (!json || !json.data || json.data.length == 0) {
                error.add("No Results!");
            }
            $.each(json.data, function(i, e){
                if(json.data[i].picture != null){
                    if(json.data[i].link != null) $("#imgs").append("<a href='"+json.data[i].link+"' id='link"+i+"'><img id='photo"+i+"' class='pic' /></a>");
                    else $("#imgs").append("<img id='photo"+i+"' class='pic' />");
                    imagesToLoad++;
                    $("#photo"+i)
                        .attr("src", json.data[i].picture)
                        .attr("title", json.data[i].name)
                        .load(function(){imageLoaded(i);});
                    console.log(json.data[i]);
                }
            });					
        }
    );    
}
function imageLoaded(i){
	imagesToLoad--;
    $("#photo"+i).fadeIn();
	if(imagesToLoad == 0){
		searchEnd();
	}
}
function focusOnSearch(){
	$("#search input").css("color", "#333333");
	$("#search input").val("");
}
function search(query){
    window.location.hash = query; 
    if (query == "") return false;
	error.clear();
	$("#header").slideUp();
    $("#imgs").html("");
	if($("#imgs").html() != ""){
		$("#imgs").slideUp(function(){
			$("#imgs").html("");
			$("#imgs").slideDown();
		});
	}
	$("#search input").fadeOut(function(){
		$("#smalllogo").fadeIn();
		$("#load").fadeIn(function(){
			refresh(query);
		});
	});
}
function searchEnd(){
	$("#load").fadeOut(function(){
		$("#search input").fadeIn();
	});
}
var error = {
	add: function (msg) {
		$("#load").hide();
		searchEnd();
		$("#error").html(msg).slideDown();
	},
	clear: function () {
		$("#error").slideUp(function(){$(this).html("")});
	}
}
