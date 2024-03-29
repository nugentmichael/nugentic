/* ----------------------------------------------------------------------------------- */
/* Header
/*----------------------------------------------------------------------------------- */

/* Starting Animation on Load */
// $('<img/>').attr('src', '//placehold.it/1920x1080/1a1a1a/F4594E&amptext=1920x1080').load(function() {
jQuery('#logo').fadeIn(600, function () {
	jQuery('h1').animate(
		{
			opacity: '1',
			'padding-top': '0',
		},
		500,
		function () {
			jQuery('h2').animate(
				{
					opacity: '1',
					'padding-top': '0',
				},
				500,
				function () {
					if (jQuery(window).width() < 767) {
						jQuery('#explore').animate(
							{
								opacity: '1',
								'margin-top': '1em',
							},
							1000
						);
					} else {
						jQuery('#explore').animate(
							{
								opacity: '1',
								'margin-top': '2em',
							},
							1000
						);
					}
				}
			);
		}
	);
});
// });

textCenter();

function textCenter() {
	$('.text-container').css({
		position: 'absolute',
	});

	$('.text-container').css({
		left: ($(window).width() - $('.text-container').outerWidth()) / 2,
		top: ($(window).height() - $('.text-container').outerHeight()) / 2,
	});
}

jQuery(document).ready(function () {
	/* ----------------------------------------------------------------------------------- */
	/*	Navigation
	/*-----------------------------------------------------------------------------------*/

	var animate = 'down';

	jQuery(window).bind('scroll', function () {
		/* Animation for Top Navigation */
		var scrollTop = jQuery(window).scrollTop();

		if (scrollTop > jQuery('#me').offset().top - 60 && animate == 'down') {
			animate = 'up';
			jQuery('#top-bar').stop().animate(
				{
					top: '0',
				},
				300
			);
		} else if (
			scrollTop < jQuery('#me').offset().top - 60 &&
			animate == 'up'
		) {
			animate = 'down';
			jQuery('#top-bar').stop().animate(
				{
					top: '-75px',
				},
				300
			);
		}

		/* Update Section on Top-Bar */
		jQuery('section').each(function () {
			if (scrollTop > jQuery(this).offset().top - 60) {
				var section = jQuery(this).attr('id');
				$('#top-navigation ul li').each(function () {
					if (
						section ==
							jQuery(this)
								.find('a')
								.attr('href')
								.replace('#', '') &&
						jQuery(this).not('.active')
					) {
						$('#top-navigation ul li').removeClass('active');
						jQuery(this).addClass('active');
					}
				});
			}
		});
	});

	/* Responsive Menu Click */
	jQuery('#menu-mobile').click(function () {
		if (jQuery('#top-navigation ul').is(':visible')) {
			jQuery('#top-navigation ul').slideUp(500);
			jQuery('#menu-mobile').removeClass('active');
		} else {
			jQuery('#top-navigation ul').slideDown(500);
			jQuery('#menu-mobile').addClass('active');
		}
	});

	/* On Resize show menu on desktop if hidden */
	jQuery(window).resize(function () {
		textCenter();
		if (jQuery(window).width() > 992) {
			if (jQuery('#top-navigation ul').is(':hidden')) {
				jQuery('#top-navigation ul').show();
				jQuery('#menu-mobile').removeClass('active');
			}
		} else {
			if (jQuery('#top-navigation ul').is(':visible')) {
				jQuery('#top-navigation ul').hide();
				jQuery('#menu-mobile').removeClass('active');
			}
		}
	});

	/* ----------------------------------------------------------------------------------- */
	/*	Smooth Scroll - Navigation + .scroll items
	/*-----------------------------------------------------------------------------------*/

	jQuery('#top-navigation li').bind('click', function (event) {
		var anchor = jQuery(this).find('a');

		jQuery('#top-navigation li').removeClass('active');
		jQuery(this).addClass('active');

		jQuery('html, body')
			.stop()
			.animate(
				{
					scrollTop: jQuery(anchor.attr('href')).offset().top - 50,
				},
				1500,
				'easeInOutExpo'
			);

		/* If Mobile hide menu on select */
		if (jQuery(window).width() <= 767) {
			jQuery('#top-navigation ul').slideUp(500);
			jQuery('#menu-mobile').removeClass('active');
		}

		event.preventDefault();
	});

	jQuery('.scroll').bind('click', function (event) {
		var anchor = jQuery(this);

		jQuery('html, body')
			.stop()
			.animate(
				{
					scrollTop: jQuery(anchor.attr('href')).offset().top - 50,
				},
				1500,
				'easeInOutExpo'
			);

		/* If Mobile hide menu on select */
		if (jQuery(window).width() <= 767) {
			jQuery('#top-navigation ul').slideUp(500);
			jQuery('#menu-mobile').removeClass('active');
		}

		event.preventDefault();
	});

	/* ----------------------------------------------------------------------------------- */
	/*	Studio
	/*-----------------------------------------------------------------------------------*/

	/* Initialize Slider */
	// var swiper = jQuery('#swiper').swiper({
	//     loop: true,
	//     grabCursor: true,
	//     autoPlay: 4000
	// });

	/* On Load swiper height should adjust to img size */
	jQuery('.swiper-slide img').load(function () {
		jQuery('#swiper').height(jQuery('.swiper-slide img').height());
		jQuery('.swiper-wrapper').height(jQuery('.swiper-slide img').height());
	});

	/* On Resize swiper height should adjust to img size */
	jQuery(window).resize(function () {
		jQuery('#swiper').height(jQuery('.swiper-slide img').height());
		jQuery('.swiper-wrapper').height(jQuery('.swiper-slide img').height());
	});

	/* ----------------------------------------------------------------------------------- */
	/*	Services
	/*-----------------------------------------------------------------------------------*/

	var curSkills = 'branding';

	/* Services Animations */
	jQuery('.service').click(function () {
		jQuery('.service').removeClass('active');
		jQuery(this).addClass('active');
		var target = jQuery(this).attr('id');
		jQuery('#' + curSkills + '-skills').slideUp(
			750,
			'easeInOutExpo',
			function () {
				jQuery('#' + target + '-skills').slideDown(
					750,
					'easeInOutExpo'
				);
			}
		);
		curSkills = jQuery(this).attr('id');
		jQuery('html, body')
			.stop()
			.animate(
				{
					scrollTop: jQuery('#services-list').offset().top - 100,
				},
				1000,
				'easeInOutExpo'
			);

		jQuery('#' + target + '-skills .expand').each(function () {
			jQuery(this)
				.css({
					width: 0,
				})
				.animate(
					{
						width: jQuery(this).attr('data-width'),
					},
					2000
				);
		});
	});

	/* ----------------------------------------------------------------------------------- */
	/*	Works
	/*-----------------------------------------------------------------------------------*/

	/* Filter for Works */
	jQuery('#work-container').mixitup({
		targetDisplayGrid: 'block', // required to fix bug in Chrome with images height
	});

	/* If we're on medium or large device animate next and previous project name while hovering arrow's */
	if (jQuery(window).width() > 767) {
		jQuery('#next-project')
			.mouseenter(function () {
				jQuery('#next-project-name').stop().animate(
					{
						right: '4em',
						opacity: '1',
					},
					500
				);
			})
			.mouseleave(function () {
				jQuery('#next-project-name').animate(
					{
						right: '8em',
						opacity: '0',
					},
					500
				);
			});
		jQuery('#previous-project')
			.mouseenter(function () {
				jQuery('#previous-project-name').stop().animate(
					{
						left: '4em',
						opacity: '1',
					},
					500
				);
			})
			.mouseleave(function () {
				jQuery('#previous-project-name').animate(
					{
						left: '8em',
						opacity: '0',
					},
					500
				);
			});
	}

	/* Creates the filter menu for mobile version */
	$('#work-filter ul').each(function () {
		var select = $(document.createElement('select'))
			.insertBefore($(this).parent())
			.addClass('visible-xs');
		$('>li', this).each(function () {
			option = $(document.createElement('option'))
				.appendTo(select)
				.val(this.href)
				.html($(this).html())
				.addClass($(this).attr('data-filter'));
		});
	});

	/* Filtering for Select */
	$('select').on('change', function () {
		jQuery('#work-container').mixitup(
			'filter',
			jQuery(this).find('option:selected').attr('class')
		);
	});

	/* ----------------------------------------------------------------------------------- */
	/*	Social
	/*-----------------------------------------------------------------------------------*/

	/* Initalize Twitter Feed */
	$('#twitter').tweetable({
		username: 'michaelnugent',
		time: true,
		limit: 5,
		replies: false,
		loading: 'Patience is an art...',
		position: 'append',
		failed: 'Womp Womp. It seems that Twitter is ignoring my request.',
		html5: true,
		onComplete: function ($ul) {
			$('time').timeago();
			var ul = $('#twitter').find('.tweetList');
			var ticker = function () {
				setTimeout(function () {
					var top = ul.position().top;
					var h = ul.height();
					var incr = h / ul.children().length;
					var newTop = top - incr;
					if (h + newTop <= 0) newTop = 0;
					ul.animate(
						{
							top: newTop,
						},
						500
					);
					ticker();
				}, 7500);
			};
			ticker();
		},
	});

	/* Initalize Instagram Feed */
	jQuery.fn.spectragram.accessData = {
		accessToken: '2136707.12e2743.9576ae17af4e4ad4aebf6b72433c01fd',
		clientID: '12e27430fe054c72839c5f16f86177e1',
	};

	jQuery('#instagram').spectragram('getUserFeed', {
		query: 'michaelnugent',
		max: 12,
	});

	/* Initalize Flickr Feed */
	jQuery('#flickr').jflickrfeed({
		limit: 12,
		qstrings: {
			id: '52421339@N00',
		},
		itemTemplate:
			'<div class="col-xs-3 col-sm-2 flickr-photo"><a href="{{image_b}}"target="_blank"> <img src="{{image_m}}" alt="{{title}}" /> </a></div>',
	});

	/* Click's on Social Feed Icon */
	jQuery('#social-feed li').click(function () {
		jQuery('#social-feed li').removeClass('active');
		jQuery(this).addClass('active');
		$('#twitter').find('.tweetList').css('top', '0');
		if (jQuery(this).attr('id') == 'instagram-feed') {
			jQuery('.feed').hide();
			jQuery('#instagram').fadeIn(1000);
		} else if ($(this).attr('id') == 'twitter-feed') {
			$('.feed').hide();
			$('#twitter').fadeIn();
		} else if (jQuery(this).attr('id') == 'flickr-feed') {
			jQuery('.feed').hide();
			jQuery('#flickr').fadeIn(1000);
		}
	});

	/* ----------------------------------------------------------------------------------- */
	/*	Contacts
	/*-----------------------------------------------------------------------------------*/

	/* Validation Form with AJAX while typing for inputs */
	jQuery('input').bind('input propertychange', function () {
		jQuery(this).parent().find('.error').remove();
		jQuery(this).parent().find('.valid').remove();
		if (jQuery(this).attr('id') == 'email') {
			var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			if (jQuery(this).val() == '' || jQuery(this).val() == ' ') {
				jQuery(this).after("<span class='error'></span>");
				jQuery(this).parent().find('.error').fadeIn('slow');
			} else if (!checkEmail.test(jQuery(this).val())) {
				jQuery(this).after("<span class='error'></span>");
				jQuery(this).parent().find('.error').fadeIn('slow');
			} else {
				jQuery(this).after("<span class='valid'></span>");
				jQuery(this).parent().find('.valid').fadeIn('slow');
			}
		} else {
			if (jQuery(this).val() == '' || jQuery(this).val() == ' ') {
				jQuery(this).after("<span class='error'></span>");
				jQuery(this).parent().find('.error').fadeIn('slow');
			} else {
				jQuery(this).after("<span class='valid'></span>");
				jQuery(this).parent().find('.valid').fadeIn('slow');
			}
		}
	});

	/* Validation Form with AJAX while typing for textarea */
	jQuery('textarea').bind('input propertychange', function () {
		jQuery(this).parent().find('.error').remove();
		jQuery(this).parent().find('.valid').remove();
		if (jQuery(this).val() == '' || jQuery(this).val() == ' ') {
			jQuery(this).after("<span class='error'></span>");
			jQuery(this).parent().find('.error').fadeIn('slow');
		} else {
			jQuery(this).after("<span class='valid'></span>");
			jQuery(this).parent().find('.valid').fadeIn('slow');
		}
	});

	/* Validation Form with AJAX on Submit */
	jQuery('#submit').click(function () {
		jQuery('span.error').fadeOut('slow');
		jQuery('span.valid').fadeOut('slow');
		jQuery('#thanks').hide();
		jQuery('#error').hide();
		jQuery('#timedout').hide();
		jQuery('#state').hide();

		var error = false;

		var name = jQuery('#name').val();
		if (name == '' || name == ' ') {
			jQuery('#name').after("<span class='error'></span>");
			jQuery('#name').parent().find('.error').fadeIn('slow');
			error = true;
		} else {
			jQuery('#name').after("<span class='valid'></span>");
			jQuery('#name').parent().find('.valid').fadeIn('slow');
		}

		var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var email = jQuery('#email').val();
		if (email == '' || email == ' ') {
			jQuery('#email').after("<span class='error'></span>");
			jQuery('#email').parent().find('.error').fadeIn('slow');
			error = true;
		} else if (!checkEmail.test(email)) {
			jQuery('#email').after("<span class='error'></span>");
			jQuery('#email').parent().find('.error').fadeIn('slow');
			error = true;
		} else {
			jQuery('#email').after("<span class='valid'></span>");
			jQuery('#email').parent().find('.valid').fadeIn('slow');
		}

		var message = jQuery('#message').val();
		if (message == '' || message == ' ') {
			jQuery('#message').after("<span class='error'></span>");
			jQuery('#message').parent().find('.error').fadeIn('slow');
			error = true;
		} else {
			jQuery('#message').after("<span class='valid'></span>");
			jQuery('#message').parent().find('.valid').fadeIn('slow');
		}

		if (error == true) {
			jQuery('#error').fadeIn('slow');
			setTimeout(function () {
				jQuery('#error').fadeOut('slow');
			}, 3000);
			return false;
		}

		var data_string = jQuery('#contact-form').serialize();

		jQuery.ajax({
			type: 'POST',
			url: 'lib/sendMail.php',
			data: {
				name: name,
				email: email,
				message: message,
			},
			timeout: 6000,
			error: function (request, error) {
				if (error == 'timeout') {
					jQuery('#timedout').fadeIn('slow');
					setTimeout(function () {
						jQuery('#timedout').fadeOut('slow');
					}, 3000);
				} else {
					jQuery('#state').fadeIn('slow');
					jQuery('#state').html(
						'The following error occured: ' + error + ''
					);
					setTimeout(function () {
						jQuery('#state').fadeOut('slow');
					}, 3000);
				}
			},
			success: function () {
				jQuery('span.valid').remove();
				jQuery('#thanks').fadeIn('slow');
				jQuery('input').val('');
				jQuery('textarea').val('');
				setTimeout(function () {
					jQuery('#thanks').fadeOut('slow');
				}, 3000);
			},
		});

		return false;
	});
});
