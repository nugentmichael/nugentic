/* 
	https://getmytweets.co.uk API v3
	Author: Danny Hearnah
	Last Updated: 18/06/2013 22:11 GMT +0000
	##WARNING: This file gets updated frequently, if you are using a local copy then follow us on twitter @gmtweetsuk to get information on updates and patches.
 */
(function (a) {
	a.fn.extend({
		getmytweets: function (b) {
			var c = {
				twitter_sn: false,
				twitter_wrap: false,
				twitter_limit: 1,
				twitter_hashtag: false,
				twitter_nocache: false,
				twitter_pp: false,
				twitter_stats: false,
				twitter_details: false,
			};
			var b = a.extend(c, b);
			return this.each(function (f) {
				var f = a(this);
				a(f).html(
					'<div class="' + b.twitter_wrap + '">Loading tweets..</div>'
				);
				var d = 'https://api.getmytweets.co.uk/?ver=3&';
				if (b.twitter_hashtag) {
					d += 'hashtag=' + b.twitter_hashtag;
				} else {
					d += 'screenname=' + b.twitter_sn;
				}
				d += '&limit=' + b.twitter_limit;
				if (b.twitter_nocache) {
					d += '&nocache=true';
				}
				a.ajax({
					type: 'GET',
					dataType: 'json',
					url: d,
					success: function (i) {
						if (i.lookup != 'error') {
							var g = '';
							var h = 0;
							g += '<div class="gmt_header">';
							if (b.twitter_pp) {
								g +=
									'<div class="gmt_pp"><img src="' +
									i.user.profile_image_url +
									'" width="48" height="48" /></div>';
							}
							if (b.twitter_details) {
								g +=
									'<div class="gmt_name">' +
									i.user.name +
									'</div>';
								g +=
									'<div class="gmt_location">' +
									i.user.location +
									'</div>';
								g +=
									'<div class="gmt_description">' +
									i.user.description +
									'</div>';
							}
							if (b.twitter_stats) {
								g += '<ul class="gmt_stats">';
								g +=
									'<li class="gmt_stat gmt_followers"><strong>followers</strong>' +
									i.user.followers_count +
									'</li>';
								g +=
									'<li class="gmt_stat gmt_friends"><strong>following</strong>' +
									i.user.friends_count +
									'</li>';
								g +=
									'<li class="gmt_stat gmt_statuses"><strong>tweets</strong>' +
									i.user.statuses_count +
									'</li>';
								g += '</ul>';
							}
							g += '</div>';
							g += '<div class="gmt_tweets">';
							a.each(i.tweets, function (j, k) {
								g +=
									'<div class="' +
									b.twitter_wrap +
									'">' +
									e(i.tweets[j].response) +
									'</div>';
								h++;
							});
							if (h == 0) {
								g =
									'<div class="' +
									b.twitter_wrap +
									'">No tweets found..</div>';
							}
							g += '</div>';
							a(f).html(g);
						}
					},
				});
				function e(i) {
					var h = 'https://twitter.com/';
					var g = 'search?q=#';
					i = i.replace(
						/(>|<a[^<>]+href=['"])?(https?:\/\/([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.,]*[^ !#?().,])?)/gi,
						function (k, j, l) {
							return j
								? k
								: '<a href="' +
										l +
										'" target="_blank">' +
										l +
										'</a>';
						}
					);
					i = i.replace(
						/(:\/\/|>)?\b(([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.]*[^ !#?().,])?)/gi,
						function (k, j, l) {
							return j
								? k
								: '<a href="https://' + l + '">' + l + '</a>';
						}
					);
					i = i.replace(
						/(:\/\/|>)?(@([_a-z0-9\-]+))/gi,
						function (k, j, m, l) {
							return j
								? k
								: '<a href="' +
										h +
										l +
										'" title="Follow ' +
										l +
										'" target="_blank">@' +
										l +
										'</a>';
						}
					);
					i = i.replace(
						/(:\/\/[^ <]*|>)?(\#([_a-z0-9\-]+))/gi,
						function (k, j, m, l) {
							return j
								? k
								: '<a href="' +
										h +
										g +
										l +
										'" title="Search tag: ' +
										l +
										'" target="_blank">#' +
										l +
										'</a>';
						}
					);
					return i;
				}
			});
		},
	});
})(jQuery);
