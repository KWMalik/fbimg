var imagesToLoad = 0;
$(document).ready(function(){
	$("#searchbox").keypress(function(e){ if(e.which == 13) search($("#searchbox").val()); });
});
function refresh(searchterm){
	var limit = 250;
	$.getJSON("http://graph.facebook.com/search?q="+encodeURI(searchterm)+"&type=post&limit="+limit+"&callback=?",function(json){
        if (json.data.length == 0) {
			error.add("No Results!");
			searchEnd();
		}
		$.each(json.data, function(i, e){
			if(json.data[i].picture != null){
				$("#test").append("<img id='photo"+i+"' />");
				imagesToLoad++;
				$("#photo"+i).attr("src", json.data[i].picture).load(imageLoaded);
			}
		});					
	});
}
function imageLoaded(){
	imagesToLoad--;
	if(imagesToLoad == 0){
		searchEnd();
	}
}
function search(query){
    if (query == "") return false;
	error.clear();
	$("#test").fadeOut(function(){
		$("#test").html("");
	});
	$("#search").fadeOut();
	$("#load").fadeIn();
	refresh(query);
}
function searchEnd(){
	$("#load").fadeOut();
	$("#search").fadeIn();
	$("#header").slideUp();
	$("#test").fadeIn();
}
var error = {
	add: function (msg) {
		$("#error").html(msg).slideDown();
	},
	clear: function () {
		$("#error").slideUp(function(){$(this).html("")});
	}
}
