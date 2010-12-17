var imagesToLoad = 0;
$(document).ready(function(){
	$("#searchbox").keypress(function(e){ if(e.which == 13) search($("#searchbox").val()); });
	$("#searchbox").bind("focus", function(){$("#searchbox").val("");});
});
function refresh(searchterm){
	var limit = 200;
	$.getJSON("http://graph.facebook.com/search?callback=?",{
            q:          searchterm,
            type:       "post",
            limit:      limit
        },function(json){
            if (!json || !json.data || json.data.length == 0) {
			    error.add("No Results!");
			}
		    $.each(json.data, function(i, e){
			    if(json.data[i].picture != null){
				    $("#imgs").append("<img id='photo"+i+"' class='pic' />");
				    imagesToLoad++;
				    $("#photo"+i).attr("src", json.data[i].picture).load(function(){imageLoaded(i);});
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
function search(query){
    if (query == "") return false;
	error.clear();
	$("#header").slideUp();
    $("#imgs").html("");
	$("#search").fadeOut(function(){
		$("#load").fadeIn(function(){
			refresh(query);		
		});
	});
}
function searchEnd(){
	$("#load").fadeOut();
	$("#search").fadeIn();
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
