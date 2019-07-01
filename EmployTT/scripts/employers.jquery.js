$(window).on("load", function() {
	console.log('Hiding elements...');
	$(".employer-quote").hide();
	$(".employer-logo img").hide();
	$(".postjob-button").hide();
	$(".viewjob-button").hide();
	 $(".employer-background").hover(function(){
		console.log('Showing elements');
		 $(".employer-logo img").fadeIn(650);
		 $(".employer-quote").fadeIn(650);
		 $(".postjob-button").fadeIn(650);
		 $(".viewjob-button").fadeIn(650);
	 });
 });
 

