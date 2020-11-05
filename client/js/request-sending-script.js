// Connect to functions
document.querySelector("#send-button").addEventListener("click", sendRequest);
document.querySelector("#clear-button").addEventListener("click", clearAll);

// HTML elements
let addressSelection = document.querySelector("#select-server-address");
let portNumber = document.querySelector("#input-port-number");
let enterKey = document.querySelector("#input-key");
let useKey = document.querySelector("#checkbox-use-key");
let useMessage = document.querySelector("#checkbox-use-message");
let messageBody = document.querySelector("#text-message-body");
let answerLabel = document.querySelector("#answer-label");

function clearAll() {
	addressSelection.selectedIndex = 0;
	portNumber.value = "";
	enterKey.value = "";
	useKey.checked = false;
	useMessage.checked = false;
	messageBody.value = "";
	document.querySelector("#radio-get").checked = true;
	answerLabel.innerHTML = "-";
}

function sendRequest() {
	let httpType = radioSelection();
	let port = portNumber.value === "" ? "80" : portNumber.value;
	let body = useMessage.checked ? messageBody.value : null;

	var xhr = new XMLHttpRequest();

	let root =
		addressSelection.options[addressSelection.selectedIndex].text ===
		"localhost"
			? "http://localhost"
			: addressSelection.options[addressSelection.selectedIndex].text;
	var url = root + ":" + port + "/movies";

	if (useKey.checked) {
		url = url + "/" + enterKey.value;
	}

	xhr.open(httpType, url, true);

	xhr.onload = function (e) {
		answerLabel.innerText = xhr.responseText;
	};

	xhr.onerror = function (e) {
		console.error(xhr.statusText);
	};

	xhr.send(body);
}

function radioSelection() {
	let getRadio = document.querySelector("#radio-get");
	let putRadio = document.querySelector("#radio-put");
	let postRadio = document.querySelector("#radio-post");
	let deleteRadio = document.querySelector("#radio-delete");

	if (getRadio.checked) return "GET";
	if (putRadio.checked) return "PUT";
	if (postRadio.checked) return "POST";
	if (deleteRadio.checked) return "DELETE";
}
