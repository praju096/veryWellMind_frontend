/*
	Helios by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		settings = {

			// Carousels
				carousels: {
					speed: 4,
					fadeIn: true,
					fadeDelay: 250
				},

		};

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '961px',   '1280px' ],
			narrow:    [ '841px',   '960px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			mode: 'fade',
			speed: 350,
			noOpenerFade: true,
			alignment: 'center'
		});

	// Scrolly.
		$('.scrolly').scrolly();

	// Nav.

		// Button.
			$(
				'<div id="navButton">' +
					'<a href="#navPanel" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Carousels.
		$('.carousel').each(function() {

			var	$t = $(this),
				$forward = $('<span class="forward"></span>'),
				$backward = $('<span class="backward"></span>'),
				$reel = $t.children('.reel'),
				$items = $reel.children('article');

			var	pos = 0,
				leftLimit,
				rightLimit,
				itemWidth,
				reelWidth,
				timerId;

			// Items.
				if (settings.carousels.fadeIn) {

					$items.addClass('loading');

					$t.scrollex({
						mode: 'middle',
						top: '-20vh',
						bottom: '-20vh',
						enter: function() {

							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);

							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();

								if (x.length <= limit) {

									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;

								}

								xf.removeClass('loading');

							}, settings.carousels.fadeDelay);

						}
					});

				}

			// Main.
				$t._update = function() {
					pos = 0;
					rightLimit = (-1 * reelWidth) + $window.width();
					leftLimit = 0;
					$t._updatePos();
				};

				$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };

			// Forward.
				$forward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos -= settings.carousels.speed;

							if (pos <= rightLimit)
							{
								window.clearInterval(timerId);
								pos = rightLimit;
							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Backward.
				$backward
					.appendTo($t)
					.hide()
					.mouseenter(function(e) {
						timerId = window.setInterval(function() {
							pos += settings.carousels.speed;

							if (pos >= leftLimit) {

								window.clearInterval(timerId);
								pos = leftLimit;

							}

							$t._updatePos();
						}, 10);
					})
					.mouseleave(function(e) {
						window.clearInterval(timerId);
					});

			// Init.
				$window.on('load', function() {

					reelWidth = $reel[0].scrollWidth;

					if (browser.mobile) {

						$reel
							.css('overflow-y', 'hidden')
							.css('overflow-x', 'scroll')
							.scrollLeft(0);
						$forward.hide();
						$backward.hide();

					}
					else {

						$reel
							.css('overflow', 'visible')
							.scrollLeft(0);
						$forward.show();
						$backward.show();

					}

					$t._update();

					$window.on('resize', function() {
						reelWidth = $reel[0].scrollWidth;
						$t._update();
					}).trigger('resize');

				});

		});

})(jQuery);





/*
 * jQuery to build the POC quickly
 *
 * SCRIPT IS UNDER CONSTRUCTION
 */
var positions = [],
    build_toc = function() {
      var output = '<p>Table of content</p><ul>',
          svg    = '<svg viewBox="0 0 36 36" height="36px" width="36px" y="0px" x="0px"><circle transform="rotate(-90 18 18)" stroke-dashoffset="100" stroke-dasharray="100 100" r="16" cy="18" cx="18" stroke-width="2" fill="none"/></svg>';
  
      $('.post-content').find('h2').each(function(i){
        $(this).attr('id', 'title_' + i)
    
        output += '<li><a href="#title_' + i + '" class="toc-title_' + i + '">' + svg + $(this).text() + '</a></li>';
      });
  
      return output;
    },
    get_bottom_off_content = function() {
      var $content = $('.post-content'),
          offset   = $content.offset();
      
      return $content.offset;
    },
    get_positions = function() {
      $('.post-content').find('h2').each(function( i ){
        offset = $(this).offset();
        positions[ 'title_' + i ] = offset.top;
      });
      return positions;
    },
    set_toc_reading = function() {
      var st    = $(document).scrollTop(),
          count = 0;
      
      for (var k in positions) {
        var n        = parseInt( k.replace('title_', '') );
            has_next = typeof positions['title_' + ( n + 1 ) ] !== 'undefined',
            not_next = has_next && st < positions['title_' + ( n + 1 ) ] ? true : false,
            diff     = 0,
            $link    = $( '.toc-' + k );
        
        if ( has_next ) {
          diff = ( st - positions[ k ] ) / ( positions[ 'title_' + ( n + 1 ) ] - positions[ k ] ) * 100;
        } else {
          diff = ( st - positions[ k ] ) / ( get_bottom_off_content() - positions[ k ] ) * 100;
        }
        
        $link.find('circle').attr('stroke-dashoffset', Math.round( 100 - diff ) );
        
        if ( st >= positions[ k ] && not_next && has_next ) {
          $( '.toc-' + k ).addClass('toc-reading');
        } else if ( st >= positions[ k ] && ! not_next && has_next ) {
          $( '.toc-' + k ).removeClass('toc-reading');
        } else if ( st >= positions[ k ] && ! not_next && ! has_next ) {
          $( '.toc-' + k ).addClass('toc-reading');
        }
        
        if ( st >= positions[ k ] ) {
          $( '.toc-' + k ).addClass('toc-already-read');
        } else {
          $( '.toc-' + k ).removeClass('toc-already-read');
        }
        
        if ( st < positions[ k ] ) {
          $( '.toc-' + k ).removeClass('toc-already-read toc-reading');
        }
        
        count++;
      }
    };

// build our table of content
$('.table-of-contents').html( build_toc() );

// first definition of positions
get_positions();

// on resize, re-calc positions
$(window).on('resize', function(){
  get_positions();
});

$(document).on('scroll', function(){
  set_toc_reading();
});

$('.AlphabetNav a').click(function(evt) {
  evt.preventDefault();
  
  var $navItem = $(this),
      $contacts = $('.Contact');
  
  $contacts.show();
  
  if ($navItem.hasClass('active')) {
    $navItem.removeClass('active');
  } else {
   $('.AlphabetNav a').removeClass('active');
    $navItem.addClass('active');

    $.each($contacts, function(key, contact) {
      var $contact = $(contact),
          $contactName = $contact.find('.Contact-name'),
          $nameArr = $contactName.text().split(' ');

      console.log($nameArr[0].split('')[0].toLowerCase());

      if ($nameArr[0].split('')[0].toLowerCase() !== $navItem.text().toLowerCase()) {
        $contact.hide();
      }
    }); 
  }
});