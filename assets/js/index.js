
function animations(){
  var timeOut2 = setTimeout(function() {
  // Add Scene to ScrollMagic Controller
    var t = new ScrollMagic.Controller,
        e = $(".count");
    e.each(function() {
        var e = $(this),
            i = parseInt(e.attr("data-min"), 10),
            n = parseInt(e.attr("data-max"), 10),
            r = i,
            s = n,
            o = {
                  val: r
                },
            a = !1,
            l = 1.5;
        l = .01 * l,
        l = (n * l).toFixed(2);
        var c = !0;
        c && (l = 1.5);
        var h = function() {
            a = !a,
            a ? (r = i,
            s = n) : (r = n,
            s = i),
            TweenMax.to(o, 5, {
                val: s,
                onUpdate: u,
                ease: Power0.easeNone
            })
        }
          , u = function() {
            e.html(o.val.toFixed())
        }
        ;
        new ScrollMagic.Scene({
            triggerElement: e,
            offset: $('body').offset().top,
            reverse: false
        }).on("enter", h).addTo(t)
    })
    // $('body').css('overflow', 'inherit');
    // $splash.fadeOut();
  }, 2000);
}


function animationsNoticias(){
  var timeOut2 = setTimeout(function() {
  // Add Scene to ScrollMagic Controller
    var t = new ScrollMagic.Controller,
        e = $(".img-newsCard");
    e.each(function() {
        var e = $(this);
        var h = function() {
            TweenMax.to(e, 0.5, {css:{className:'+=animated bounce'}});
        }
          , u = function() {
            e.html(o.val.toFixed())
        }
        ;
        new ScrollMagic.Scene({
            triggerElement: e,
            offset: $('.img-newsCard').offset().top,
            reverse: false
        }).on("enter", h).addTo(t)
    })
    // $('body').css('overflow', 'inherit');
    // $splash.fadeOut();
  }, 1000);
}

function animationSlider(){
  var timeOut2 = setTimeout(function() {
  // Add Scene to ScrollMagic Controller
    var t = new ScrollMagic.Controller,
        e = $(".img-newsCard");
    e.each(function() {
        var e = $(this);
        var h = function() {
            logoAnimation();
        }
          , u = function() {
            e.html(o.val.toFixed())
        }
        ;
        new ScrollMagic.Scene({
            triggerElement: e,
            offset: $('.logo').offset().top,
            reverse: false
        }).on("enter", h).addTo(t)
    })
    // $('body').css('overflow', 'inherit');
    // $splash.fadeOut();
  }, 1000);
}
$( document ).ready(function() {
      var mobile = false;
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('.card-container').addClass('manual-flip');
        mobile = true;
      }
      animationsNoticias();
      animationSlider();
  // $('.first-container').css('padding-top', $('.navbar-gaMuniCba').height()+20);
  // $('.push').css('height', $('.footer').height()+50);



  $('.carousel').carousel();
  $(".carousel").swipe({

    swipe: function(event, direction, distance, duration, fingerCount, fingerData) {

      if (direction == 'left') $(this).carousel('next');
      if (direction == 'right') $(this).carousel('prev');

    },
    allowPageScroll:"vertical"

  });

  $('.licencias-btn').on('click',function(e){
    e.preventDefault();
    $('#licenses').slideDown( 1500, function() {
      $('html, body').animate({
          scrollTop: $("#licenses").offset().top-100
      }, 1500);
    });
  });
  $('.licenses-close-btn').on('click',function(){
    $('html, body').animate({
        scrollTop: $("footer").offset().top+125
    }, 1500);
    $('#licenses').slideUp(1500);
  });
  //
  $('.navbar-gaMuniCba').affix({
    offset: {
        top: $('.bg-green').height()
    }
  });
  $(".navbar-gaMuniCba").on('affix.bs.affix', function(){
    $('.first-container').css('padding-top', $('.navbar-gaMuniCba').height()+20);
  });
  $('.navbar-gaMuniCba').on('affix-top.bs.affix', function(){
    $('.first-container').css('padding-top', 15);
 });
});
$(window).on('resize', function(){
  // $('.first-container').css('padding-top', $('.navbar-gaMuniCba').height()+20);
  // $('body').css('margin-bottom', $('.footer').height()+50);

});
