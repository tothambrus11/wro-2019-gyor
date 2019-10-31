window.onload = loadView(getOffers("offer_date", "ASC"));
var firstLoad = true;

function getOffers(order_by, order) {
	let offers;

	$.ajax({
		type: 'POST',
		url: base_url + "offer/get_my_offers",
		data: {order: order, order_by: order_by},
		success: function (data) {

		},
		async: false
	})
		.done(function (data) {
			if (data.error !== undefined) {
				alert(data.error);
				console.log("error")
			} else {
				offers = data;
				console.log("data")
			}
		})
		.fail(function () {
			alert("Network error!")
		});

	if (offers === undefined) {
		alert("Network error!");
		return [];
	}
	return offers;
}


function loadView(offers) {
	let html = "";


	for (let i = 0; i < offers.length; i++) {

		let offer = offers[i];

		// DISTANCE
		let distanceO;
		if (!offer.distance) {
			offer.distance = 0;
		}
		if (offer.distance < 1000) { // meters
			distanceO = offer.distance + " meters";
		} else {
			distanceO = offer.distance / 1000 + " km"
		}

		// TITLE
		let titleO = escapeHtml(offer.thing_name);

		let detailsO = escapeHtml(offer.details);
		let offerDateO = formatDate(offer.offer_date);

		let orderDateO;
		let statusO = `ordered by <a href="#">Userdani</a> at ` + orderDateO;

		// STATUS
		let status;
		if (offer.recipient_id === -1) {
			status = "WAITING_FOR_RECIPIENT";
		} else {
			status = offer.status;
			switch (status) {
				case "WAITING_FOR_RECIPIENT":
					statusO = "Waiting for a recipient...";
					break;
				case "FRONT_OF_WAREHOUSE_1":
				case "FRONT_OF_WAREHOUSE_2":
				case "DELIVERING":
					statusO = "Delivering...";
					break;
				case "SUPPLIER":
					statusO = "Supplier";
					break;
				case "WAREHOUSE":
					statusO = "Warehouse";
					break;
				case "DELIVERED":
					statusO = "Delivered at " + formatDate(offer.delivery_date);
					break;

			}
// TODO format dates
		}
		html += `<div class="card border-info mb-3 align-self-start m-2 grid-item" style="max-width: 18rem;">
            <div class="card-header">
                <i class="fas fa-map-marker-alt"></i>
                ${distanceO}
            </div>
            <div class="card-body text-info">
                <h5 class="card-title">${titleO}</h5>
                <p class="card-text">${detailsO}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted d-block">Offered at: ${offerDateO}</small>
                <small class="text-muted d-block">Status: ${statusO}</small>
            </div>
        </div>`
	}

	$("#my-offers-container").html(html);
	setTimeout(
		function () {
			if(!firstLoad) $(".grid").masonry("reloadItems");
			else firstLoad = false;

			$('.grid').masonry({
				itemSelector: '.grid-item',
				columnWidth: 320
			});

		},
		100);

}

function escapeHtml(unsafe) {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function formatDate(dateString) {
	let date = new Date(dateString);
	return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${fillWithZeros(date.getHours(), 2)}:${fillWithZeros(date.getMinutes(), 2)}`;
}

function fillWithZeros(string, length) {
	string = string.toString();
	while (string.length < length) {
		string = "0" + string;
	}
	return string;
}
