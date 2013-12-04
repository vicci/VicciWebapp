var EditAddressView = function(address) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $("<div id='appwrapper'/>");
    };

    this.render = function() {
		var header = headerHTML("editaddress");

		var html = "<div id='new-address-content-wrapper' class='content-wrapper'>" +
				header +			
				"<fieldset>  " +
					"<label for='nickname'>Full Name:</label><input type='text' id='nickname' name='nickname' value='" + address.nickName + "' />" + 
					"<label for='addressone'>Address Line1:</label><input type='text' id='addressone' name='addressone' value='" + address.line1 + "' />"  +
					"<label for='addresstwo'>Address Line2:</label><input type='text' id='addresstwo' name='addresstwo' value='" + address.line2 + "'/>" + 
					"<div>" + 
						"<div name='city'>" +
							"<label for='city' >City:</label><input type='text' id='city' name='city' value='" + address.city + "'/>" + 
						"</div>" + 
						"<div name='state'>" +
							"<label for='state' >State:</label><input type='text' id='state' name='state' value='" + address.state + "'/>" +  
						"</div>" +
						"<div name='zip'>" +
							"<label for='zip' >Zip:</label><input type='tel' id='zip' name='zip' onkeypress='return isNumberKey(event)' value='" + address.zip + "'/>" + 
						"</div>" +
					"</div>" +
					"<label for='country' >Country:</label>" +
					"<div select='country' class=''>" +
						"<select name='country' value='" + address.country + "'>" + 
							"<option value='United States'>United States</option>" +
							"<option value='Canada'>Canada</option>" +
						"</select>" +
					"</div>" +
				"</fieldset>" + 
				"<div id='address-button-container'>" +
					"<button id='save-edited-address' class='page-button' type='button'>Save Changes</button>" +
					"<button id='delete-address' class='page-button' type='button'>Delete Address</button>" +
				"</div>" +
			"</div>"

		this.el.html(html);
		return this;
    };

	
    this.initialize();

}// JavaScript Document{