const createRhinoModal = () => {
	const rhinoModal = document.createElement("div");
	rhinoModal.classList.add("rhino");
	rhinoModal.id = "rhino";
	rhinoModal.innerHTML = `<svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M8.11111 0H64.8889C69.3906 0 73 3.65 73 8.11111V64.8889C73 69.3906 69.3906 73 64.8889 73H8.11111C3.65 73 0 69.3906 0 64.8889V8.11111C0 3.65 3.65 0 8.11111 0ZM20.2778 56.7778H52.7222V48.6667H20.2778V56.7778ZM52.7222 28.3889H42.5833V16.2222H30.4167V28.3889H20.2778L36.5 44.6111L52.7222 28.3889Z" fill="#F5F5F5"/>
		</svg>
		<h1 class="rhino-heading" id="head">Drop Here</h1>
		<p class="rhino-text">Files will be added to Rhino</p>`;
	document.body.appendChild(rhinoModal);

	const rhino = document.getElementById("rhino");

	//allows drop event to happen
	rhino.addEventListener("dragover", ev => {
		ev.preventDefault();
	});
	//prints the dropped text to console
	rhino.addEventListener("drop", ev => {
		ev.preventDefault();

		//Data dropped by user
		let data = ev.dataTransfer.getData("text");

		console.log(data);

		let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
		let urlRegex = RegExp(expression);

		let type = data.match(urlRegex) ? "image" : "text";
		console.log(data);
		chrome.runtime.sendMessage(
			{ reqType: "assets", data, type },
			function (response) {
				if (response) {
					console.log("done");
				} else {
					console.log("error");
				}
			}
		);
	});
};

//Show and hide Rhino model
// const images = [...document.getElementsByTagName("img")];

// images.forEach(img => {
// 	img.addEventListener("drag", () => {
// 		if (!document.getElementById("rhino")) createRhinoModal();
// 	});
// 	img.addEventListener("dragend", () => {
// 		if (document.getElementById("rhino"))
// 			document.getElementById("rhino").remove();
// 	});
// });

document.addEventListener("drag", () => {
	if (!document.getElementById("rhino")) createRhinoModal();
});

document.addEventListener("dragend", () => {
	if (document.getElementById("rhino"))
		document.getElementById("rhino").remove();
});
