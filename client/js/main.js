AOS.init({
	duration: 800,
	easing: "slide",
	once: true,
});

let podcastSideList = document.querySelector("#podcast-side-list");
let podcastMainArea = document.querySelector("#podcast-main-area");

let addButton = document.querySelector("#add-button");
let deleteButton = document.querySelector("#delete-button");
addButton.onmouseup = addURLFromAPI;
deleteButton.onmouseup = deleteURLFromAPI;

let rateValue = $("#qty_input").val();

jQuery(document).ready(function ($) {
	"use strict";

	httpStart();

	$("#qty_input").change(function () {
		rateValue = $(this).val();
		document.getElementById("qty_input").value = rateValue;

		var listCount = document.getElementsByClassName("pb-embed");

		for (var j = 1; j <= listCount.length; j++) {
			document
				.getElementById("podcast-inner" + j)
				.setAttribute("data-limit", rateValue);
		}

		clearApp();
		httpStart();
	});

	var siteMenuClone = function () {
		$(".js-clone-nav").each(function () {
			var $this = $(this);
			$this
				.clone()
				.attr("class", "site-nav-wrap")
				.appendTo(".site-mobile-menu-body");
		});

		setTimeout(function () {
			var counter = 0;
			$(".site-mobile-menu .has-children").each(function () {
				var $this = $(this);

				$this.prepend('<span class="arrow-collapse collapsed">');

				$this.find(".arrow-collapse").attr({
					"data-toggle": "collapse",
					"data-target": "#collapseItem" + counter,
				});

				$this.find("> ul").attr({
					class: "collapse",
					id: "collapseItem" + counter,
				});

				counter++;
			});
		}, 1000);

		$("body").on("click", ".arrow-collapse", function (e) {
			var $this = $(this);
			if ($this.closest("li").find(".collapse").hasClass("show")) {
				$this.removeClass("active");
			} else {
				$this.addClass("active");
			}
			e.preventDefault();
		});

		$(window).resize(function () {
			var $this = $(this),
				w = $this.width();

			if (w > 768) {
				if ($("body").hasClass("offcanvas-menu")) {
					$("body").removeClass("offcanvas-menu");
				}
			}
		});

		$("body").on("click", ".js-menu-toggle", function (e) {
			var $this = $(this);
			e.preventDefault();

			if ($("body").hasClass("offcanvas-menu")) {
				$("body").removeClass("offcanvas-menu");
				$this.removeClass("active");
			} else {
				$("body").addClass("offcanvas-menu");
				$this.addClass("active");
			}
		});

		// click outisde offcanvas
		$(document).mouseup(function (e) {
			var container = $(".site-mobile-menu");
			if (
				!container.is(e.target) &&
				container.has(e.target).length === 0
			) {
				if ($("body").hasClass("offcanvas-menu")) {
					$("body").removeClass("offcanvas-menu");
				}
			}
		});
	};
	siteMenuClone();

	var siteMagnificPopup = function () {
		$(".image-popup").magnificPopup({
			type: "image",
			closeOnContentClick: true,
			closeBtnInside: false,
			fixedContentPos: true,
			mainClass: "mfp-no-margins mfp-with-zoom", // class to remove default margin from left and right side
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
			},
			image: {
				verticalFit: true,
			},
			zoom: {
				enabled: true,
				duration: 300, // don't foget to change the duration also in CSS
			},
		});

		$(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
			disableOn: 700,
			type: "iframe",
			mainClass: "mfp-fade",
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false,
		});
	};
	siteMagnificPopup();

	var siteCarousel = function () {
		if ($(".nonloop-block-13").length > 0) {
			$(".nonloop-block-13").owlCarousel({
				center: false,
				items: 1,
				loop: false,
				stagePadding: 0,
				margin: 20,
				nav: true,
				navText: [
					'<span class="icon-arrow_back">',
					'<span class="icon-arrow_forward">',
				],
				responsive: {
					600: {
						margin: 20,
						items: 2,
					},
					1000: {
						margin: 20,
						stagePadding: 0,
						items: 2,
					},
					1200: {
						margin: 20,
						stagePadding: 0,
						items: 3,
					},
				},
			});
		}

		$(".slide-one-item").owlCarousel({
			center: false,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			autoplay: true,
			pauseOnHover: false,
			nav: true,
			navText: [
				'<span class="icon-arrow_back">',
				'<span class="icon-arrow_forward">',
			],
		});
	};
	siteCarousel();

	var siteStellar = function () {
		$(window).stellar({
			responsive: false,
			parallaxBackgrounds: true,
			parallaxElements: true,
			horizontalScrolling: false,
			hideDistantElements: false,
			scrollProperty: "scroll",
		});
	};
	siteStellar();

	var siteCountDown = function () {
		$("#date-countdown").countdown("2020/10/10", function (event) {
			var $this = $(this).html(
				event.strftime(
					"" +
						'<span class="countdown-block"><span class="label">%w</span> weeks </span>' +
						'<span class="countdown-block"><span class="label">%d</span> days </span>' +
						'<span class="countdown-block"><span class="label">%H</span> hr </span>' +
						'<span class="countdown-block"><span class="label">%M</span> min </span>' +
						'<span class="countdown-block"><span class="label">%S</span> sec</span>'
				)
			);
		});
	};
	siteCountDown();
});

function clearApp() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "http://localhost:12345/podcasts/all"); // false for synchronous request
	xmlHttp.onload = function (e) {
		var JSONresult = JSON.parse(xmlHttp.responseText);

		for (var i = 1; i <= JSONresult.length; i++) {
			var list_item = document.getElementById("podcast-side" + i);
			list_item.remove();

			var div_item = document.getElementById("podcast-player" + i);
			div_item.remove();
		}
		pb.init();
	};
	xmlHttp.send(null);
}

function httpStart() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "http://localhost:12345/podcasts/all"); // false for synchronous request
	xmlHttp.onload = function (e) {
		var JSONresult = JSON.parse(xmlHttp.responseText);

		for (var i = 1; i <= JSONresult.length; i++) {
			var list_item = document.createElement("li");
			list_item.setAttribute("id", "podcast-side" + i);
			podcastSideList.appendChild(list_item);

			var a_align = document.createElement("a");
			a_align.setAttribute("class", "d-flex align-items-center");
			a_align.setAttribute("href", "#podcast-player" + i);
			list_item.appendChild(a_align);

			var podcast_img = document.createElement("img");
			podcast_img.setAttribute("class", "img-fluid mr-2");
			podcast_img.setAttribute("src", JSONresult[i - 1]["showArt"]);
			podcast_img.setAttribute(
				"alt",
				JSONresult[0]["title"] + " show art"
			);
			a_align.appendChild(podcast_img);

			var div_info = document.createElement("div");
			div_info.setAttribute("class", "podcaster");
			a_align.appendChild(div_info);

			var info_title = document.createElement("span");
			info_title.setAttribute("class", "d-block");
			info_title.setAttribute("id", "podcast-title" + i);
			info_title.textContent = JSONresult[i - 1]["title"];
			div_info.appendChild(info_title);

			var info_author = document.createElement("span");
			info_author.setAttribute("class", "small");
			info_author.setAttribute("id", "podcast-author" + i);
			info_author.textContent = JSONresult[i - 1]["author"];
			div_info.appendChild(info_author);
		}

		for (var j = 1; j <= JSONresult.length; j++) {
			var playable_div = document.createElement("div");
			playable_div.setAttribute(
				"class",
				"d-block d-md-flex podcast-entry bg-white mb-5"
			);
			playable_div.setAttribute("data-aos", "fade-up");
			playable_div.setAttribute("id", "podcast-player" + j);
			podcastMainArea.appendChild(playable_div);

			var embed_div = document.createElement("div");
			embed_div.setAttribute("class", "pb-embed");
			embed_div.setAttribute("data-limit", rateValue);
			embed_div.setAttribute("id", "podcast-inner" + j);
			embed_div.setAttribute("data-feed", JSONresult[j - 1]["rssFeed"]);
			playable_div.appendChild(embed_div);
		}

		pb.init();
	};
	xmlHttp.send(null);
}

function addURLFromAPI() {
	var feedValue = document.getElementById("podcast-search").value;
	var xhr = new XMLHttpRequest(); // 1 - creating request object
	var url = "http://localhost:12345/podcasts/subscribe";
	xhr.open("POST", url, false); // 2 - associates request attributes with xhr

	// set up onload
	xhr.onload = function (e) {
		// triggered when response is received
		// must be written before send
		console.log(xhr.responseText);
		location.reload();
	};

	// set up onerror
	xhr.onerror = function (e) {
		// triggered when error response is received and must be before send
		console.error(xhr.statusText);
	};

	// actually make the network call
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(
		JSON.stringify({
			url: feedValue,
		})
	);
} // end of get form info

function deleteURLFromAPI() {
	var feedValue = document.getElementById("podcast-search").value;
	var xhr = new XMLHttpRequest(); // 1 - creating request object
	var url = "http://localhost:12345/podcasts/unsubscribe";
	xhr.open("DELETE", url, false); // 2 - associates request attributes with xhr

	// set up onload
	xhr.onload = function (e) {
		// triggered when response is received
		// must be written before send
		console.log(xhr.responseText);
		location.reload();
	};

	// set up onerror
	xhr.onerror = function (e) {
		// triggered when error response is received and must be before send
		console.error(xhr.statusText);
	};

	// actually make the network call
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(
		JSON.stringify({
			url: feedValue,
		})
	);

	location.reload();
} // end of get form info

function makeNetworkCallToAgeApi(feedValue) {
	console.log("entered make nw call" + feedValue);
	// set up url
	var xhr = new XMLHttpRequest(); // 1 - creating request object
	var url = "http://localhost:12345/podcasts/subscribe";
	xhr.open("POST", url, false); // 2 - associates request attributes with xhr

	// set up onload
	xhr.onload = function (e) {
		// triggered when response is received
		// must be written before send
		console.log(xhr.responseText);
	};

	// set up onerror
	xhr.onerror = function (e) {
		// triggered when error response is received and must be before send
		console.error(xhr.statusText);
	};

	// actually make the network call
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(
		JSON.stringify({
			url: feedValue,
		})
	);
} // end of make nw call

function updateAgeWithResponse(name, response_text) {
	console.log("entered updateAgeWithResponse!");

	var response_json = JSON.parse(response_text);
	// update a label
	var label1 = document.getElementById("response-line1");

	if (response_json["age"] == null) {
		label1.innerHTML = "Apologies, we could not find your name.";
		resetLabels(1);
	} else {
		var age = parseInt(response_json["age"]);
		makeNetworkCallToPokeAPI(name, age);
		resetLabels(2);
	}
} // end of updateAgeWithResponse
