AOS.init({
	duration: 800,
	easing: "slide",
	once: true,
});

let podcastSideList = document.querySelector("#podcast-side-list");
let podcastMainArea = document.querySelector("#podcast-main-area");

// let urlEndpoint = "http://zacharysy.net:4269/"; // uncomment when using live and comment next declaration
let urlEndpoint = "http://localhost:12345/"; // uncomment when using local and comment previous declaration

let addButton = document.querySelector("#add-button");
let deleteButton = document.querySelector("#delete-button");
addButton.onmouseup = addURLFromAPI;
deleteButton.onmouseup = deleteURLFromAPI;

let rateValue = document.querySelector("#qty_input").value;

window.onload = function init() {
	httpStart();
	var input = document.getElementById("qty_input");
	input.addEventListener("change", updateCount, false);
};

function updateCount(event) {
	rateValue = event.target.value;
	document.getElementById("qty_input").value = rateValue;

	var listCount = document.getElementsByClassName("pb-embed");

	for (var j = 1; j <= listCount.length; j++) {
		document
			.getElementById("podcast-inner" + j)
			.setAttribute("data-limit", rateValue);
	}

	clearApp();
	httpStart();
}

function clearApp() {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", urlEndpoint + "podcasts/all"); // false for synchronous request
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
	xmlHttp.open("GET", urlEndpoint + "podcasts/all"); // false for synchronous request
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
	var url = urlEndpoint + "podcasts/subscribe";
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
	var url = urlEndpoint + "podcasts/unsubscribe";
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
	var url = urlEndpoint + "podcasts/subscribe";
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
