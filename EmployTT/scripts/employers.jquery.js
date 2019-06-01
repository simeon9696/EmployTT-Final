$(window).on("load", function() {
   $('.preloader').slideUp(600);
   $(".employer-quote").hide();
   $(".employer-logo img").hide();
   $(".postjob-button").hide();
   $(".viewjob-button").hide();
   $(".employer-background").css("opacity","1.0");
	$(".employer-background").hover(function(){
		$(this).stop().animate({ opacity: 0.5 }, 1200); 
		$(".employer-logo img").fadeIn(1200);
		$(".employer-quote").fadeIn(1200);
		$(".postjob-button").fadeIn(1200);
		$(".viewjob-button").fadeIn(1200);
	});
});




