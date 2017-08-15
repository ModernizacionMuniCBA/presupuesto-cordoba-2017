jQuery(window).ready(function () {
	var reArrangew = function() {
		(function($, viewport){
			if( viewport.is('>=sm') ) {
				$(".parent_head").each(function(){
					if (ft==true){
						imgMargin = parseFloat($(this).parent().css('marginTop'));						
						ft=false;
					}
				   	var $children = $(this).children(":first");
					var $cc = $children.children(":first");
				    $children.css({paddingTop: ($(".height_parent_head").height() / 2) - $cc.height()});
			
					if ($cc.height() >= $(".height_parent_head").height()/2){
						if( viewport.is('sm') ) {
							$(this).parent().children(":first").css({height: $cc.height()*2});
						}else {
							$(this).parent().children(":first").css({height: $cc.height()*1.5});
						}
						$(this).parent().children(":first").children(":first").css({marginTop: $cc.height()-$(".height_parent_head").height() / 2});
					}else{
/*
						$(this).parent().children(":first").css({height: 'auto'});
						$(this).parent().children(":first").children(":first").css({marginTop: '3%'});
						$(this).parent().parent().children().eq($(this).parent().index()-1).css({marginTop: '3%'});
						$(this).parent().css({marginTop: '3%'});
*/
					}
					
				});
			}
		})(jQuery, ResponsiveBootstrapToolkit);	
	reArrangew();
	}
});
jQuery(window).load(function () {
	var waitForFinalEvent = (function () {
	  var timers = {};
	  return function (callback, ms, uniqueId) {
	    if (!uniqueId) {
	      uniqueId = "Don't call this twice without a uniqueId";
	    }
	    if (timers[uniqueId]) {
	      clearTimeout (timers[uniqueId]);
	    }
	    timers[uniqueId] = setTimeout(callback, ms);
	  };
	})();

	var ft = true;
	
	var imgMargin = 0; //Dado por el CSS
	
	var reArrange = function() {
		(function($, viewport){
			if( viewport.is('>=sm') ) {
				$(".parent_head").each(function(){
					if (ft==true){
						imgMargin = parseFloat($(this).parent().css('marginTop'));						
						ft=false;
					}
				   	var $children = $(this).children(":first");
					var $cc = $children.children(":first");
				    $children.css({paddingTop: ($(".height_parent_head").height() / 2) - $cc.height()});
			
					if ($cc.height() >= $(".height_parent_head").height()/2){
						if( viewport.is('sm') ) {
							$(this).parent().children(":first").css({height: $cc.height()*2});
						}else {
							$(this).parent().children(":first").css({height: $cc.height()*1.5});
						}
						$(this).parent().children(":first").children(":first").css({marginTop: $cc.height()-$(".height_parent_head").height() / 2});
					}else{
/*
						$(this).parent().children(":first").css({height: 'auto'});
						$(this).parent().children(":first").children(":first").css({marginTop: '3%'});
						$(this).parent().parent().children().eq($(this).parent().index()-1).css({marginTop: '3%'});
						$(this).parent().css({marginTop: '3%'});
*/
					}
					
				});	
				$(".parent").each(function(){
					if( viewport.is('>=md') ){
						if (ft==true){
							imgMargin = parseFloat($(this).parent().css('marginTop'));	
							cicleMargin = 	parseFloat($img.children(".nombre").children(".circle-profile").css('marginTop'));			
							ft=false;
						}
					   	var $children = $(this).children(":first");
						var $cc = $children.children(":first");
						var $img = $(this).parent().children(".height_parent");
						var img_height = $(this).parent().children(".height_parent").height();
						if (img_height==1){
							img_height=$(this).parent().parent().children(".odd-column").children(".height_parent").height();
						}
	 				    $children.css({paddingTop: (img_height / 2 ) - $cc.height()});
						
						if($cc.height() >= $img.height()/2 ){
							$img.children(".nombre").children(".circle-profile").css({marginTop: $cc.height() - (img_height / 2)});
						}else{
							//VER
// 							$img.children(".nombre").children(".circle-profile").css({marginTop: '3%'});
						}
						
						if( viewport.is('>=md') ) {
							if($(this).parent().hasClass("even-column")){
								var $leftElement = $(this).parent().parent().children(".odd-column").children(".height_parent").children(":first").children(":first");
								if ($leftElement.length) {
									var posLeftElement = $leftElement.offset().top;
								}
								var $rightElement = $img.children(":first").children(":first");
								if ($rightElement.length) {
									var posRightElement = $rightElement.offset().top;
								}	
								
								var diff = posRightElement - posLeftElement;
								if (diff > 0) {
									$leftElement.parent().parent().parent().css({marginTop: imgMargin+diff+parseFloat($rightElement.parent().parent().parent().css('marginTop'))});
								}else if(diff < 0) {
									$rightElement.parent().parent().parent().css({marginTop: imgMargin-diff+parseFloat($leftElement.parent().parent().parent().css('marginTop'))});
								}
							} 
						}
					}
										
				});
			}
		})(jQuery, ResponsiveBootstrapToolkit);	
	}

	var checkArrange = function() {
		(function($, viewport){
			$(".parent").each(function(){
				var $children = $(this).children(":first");
				var $img = $(this).parent().children(".height_parent");
				var $rightElement = $img.children(":first").children(":first");
				var $leftElement = $(this).parent().parent().children(".odd-column").children(".height_parent").children(":first").children(":first");
				$img.children(":first").children(":first").css({marginTop: imgMargin});
				if( viewport.is('<=sm') ) {
					$img.children(".nombre").children(".circle-profile").css({marginTop: '3%'});
					$children.css({paddingTop: 0});
					$leftElement.parent().parent().parent().css({marginTop: '3%'});
					$rightElement.parent().parent().parent().css({marginTop: '3%'});
				}else{
					$img.children(".nombre").children(".circle-profile").css({marginTop: '3%'});
					$children.css({paddingTop: 0});
					$leftElement.parent().parent().parent().css({marginTop: '3%'});
					$rightElement.parent().parent().parent().css({marginTop: '3%'});
				}
				});	
			
		})(jQuery, ResponsiveBootstrapToolkit);	
	}
	reArrange();
	
	$('.circle-profile-int').connections({ to: '#leftCorner1' });
	$('#leftCorner2').connections({ to: '#leftCorner1' });
	$('.circle-profile-int').connections({ to: '#rightCorner1' });
	$('#rightCorner2').connections({ to: '#rightCorner1' });
	$('#leftCorner2').connections({ to: '.cp-left' });
	$('#rightCorner2').connections({ to: '.cp-right' });
	
	
	$(".come-in")
	.on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
	 function(e){
		$('.circle-profile-int').connections('update');
		$('#leftCorner2').connections('update');
		$('.circle-profile-int').connections('update');
		$('#rightCorner2').connections('update');	
		$('#rightCorner2').connections('update');
	 });

	
	$( window ).resize(function() {
		waitForFinalEvent(function(){
			checkArrange();
 			reArrange();
    	}, 500, "Final");
		$('.circle-profile-int').connections('update');
		$('#leftCorner2').connections('update');
		$('.circle-profile-int').connections('update');
		$('#rightCorner2').connections('update');	
		$('#rightCorner2').connections('update');
	})
	
	win.scroll(function(event) {
		$('.circle-profile-int').connections('update');
		$('#leftCorner2').connections('update');
		$('.circle-profile-int').connections('update');
		$('#rightCorner2').connections('update');	
		$('#rightCorner2').connections('update');
	})
	
});