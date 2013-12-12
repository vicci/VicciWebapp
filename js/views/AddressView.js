// JavaScript Document
var AddressView = function(addresses) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $("<div id='appwrapper' />");
    };

    this.render = function() {
		var header = headerHTML("address");
		var html = header +
			"<div id='address-content-wrapper' class='content-wrapper'>" +
				"<div id='choose-address-content'>" +
					"<div id='addresses-container' class=''>" +
						this.savedAddressList() +
					"</div>" +
					"<div id='add-address-button' >" +
						"<div>" + 
							"<img src='img/add.png' />" +
						"</div>" +
					"</div>" +
				"</div>" +
			"</div>"


		this.el.html(html);
		return this;
    };

	this.savedAddressList = function(){
		var html = ""
		if (!addresses)
			return html

		html += "<ul>"
		for (var i = 0; i < addresses.length; i++){
			var a = addresses[i]			
			html += 
				"<li aid='" + a.addressid + "' class='address-li'>" +
					"<div class='address-use-icon'>" +
						"<img class='address-use-icon' src='img/useLocation.png' />" +
					"</div>" +
					"<div class='address-edit-icon'>" +
						"<img class='address-edit-icon' src='img/edit.png' />" +
					"</div>" +
					"<div class='address-info'>" +
						this.formatAddressHTML(a) 
					"</div>" +
				"</li>"

		}

		return html += "</ul>"
	};

	this.formatAddressHTML = function(a){
		var html =
			"<h4>" + a.nickName + "</h4>" +
			"<p>" + a.line1 + "</p>" +
			"<p>" + a.city + ", " + a.state + "</p>"

		return html
		
	};

    this.initialize();

}// JavaScript Document