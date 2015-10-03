$(document).ready(function(){
    $('a[href^="#"]').on('click', function(event) {

        var target = $( $(this).attr('href') );

        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }

    });
});


$(document).ready(function() {
    $(".social_media_image")
        .hover(function() {
            var src = $(this).attr("src").replace("_white.png", "_active.png");
                $(this).fadeTo(50,0.50, function() {
                    $(this).attr("src",src);
                }).fadeTo(500,1);
        }, function() {
            var src = $(this).attr("src").replace("_active.png", "_white.png");
            $(this).attr("src", src);
        });
});


$(document).ready(function() {
    $(".social_square").flip({trigger:'hover'});
});


function cycleYRImages(){
    var total = 4;
      var $next = $('#yellow_rose .next');
      var $active = ($('#yellow_rose .active'));

      var i = parseInt($active.attr("src").replace( /[^\d]/g, '' ));
      var j = i + 1;
      if (j > total) {
        j -= total;
      }


      $next.attr("src", $active.attr("src").replace(i, j));//reset the z-index and unhide the image
      $next.fadeOut(1000,function(){
        $active.addClass('next').removeClass('active');
        $next.addClass('active').removeClass('next');
        $next.fadeIn(3000);
      });
  }

  function cycleBSImages(){
    var total = 4;
      var $next = $('#blue_sapphire .next');
      var $active = ($('#blue_sapphire .active'));

      var i = parseInt($active.attr("src").replace( /[^\d]/g, '' ));
      var j = i + 1;
      if (j > total) {
        j -= total;
      }


      $next.attr("src", $active.attr("src").replace(i, j));//reset the z-index and unhide the image
      $next.fadeOut(1000,function(){
        $active.addClass('next').removeClass('active');
        $next.addClass('active').removeClass('next');
        $next.fadeIn(3000);
      });
  }

  function cycleOSImages(){
    var total = 4;
      var $next = $('#other_social .next');
      var $active = ($('#other_social .active'));

      var i = parseInt($active.attr("src").replace( /[^\d]/g, '' ));
      var j = i + 1;
      if (j > total) {
        j -= total;
      }


      $next.attr("src", $active.attr("src").replace(i, j));//reset the z-index and unhide the image
      $next.fadeOut(1000,function(){
        $active.addClass('next').removeClass('active');
        $next.addClass('active').removeClass('next');
        $next.fadeIn(3000);
      });
  }

    $(window).load(function(){
        $('.social_square').fadeIn(1500);//fade the background back in once all the images are loaded
          // run every 1s
          setInterval('cycleYRImages()', 7000);
          setInterval('cycleBSImages()', 6000);
          setInterval('cycleOSImages()', 10000);
    })