var imagesToLoad = 0;
var result = null;
$(document).ready(function(){
	//$("#searchbox").bind('blur', search);
	$("#searchbox").keypress(function(e){ if(e.which == 13) search(); });
});
function refresh(searchterm){
	var limit = 250;
	$.getJSON("http://graph.facebook.com/search?q="+encodeURI(searchterm)+"&type=post&limit="+limit+"&callback=?",function(json){
		result = json;
		if (json.data.length == 0) {
			$("#test").append("No Results!");
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
function search(){
	$("#test").fadeOut(function(){
		$("#test").html("");
	});
	$("#search").fadeOut();
	$("#load").fadeIn();
	refresh($("#searchbox").val());
	$("#test").fadeIn(function(){});	
}
function searchEnd(){
		$("#load").fadeOut();
		$("#search").fadeIn();
}

