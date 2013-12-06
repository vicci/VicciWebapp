var MerchItemView = function(merch) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $("<div id='appwrapper'/>");
		//console.log(merch)
    };

    this.render = function() {
		var header = headerHTML("merchitem", merch);
		var html = header + 
			"<div id='merch-item-content' >" +
				"<div id='merch-item-image'" +
				" style='background:url(" + merch.itemImage + ") no-repeat center; -webkit-background-size:cover;" +
				"-moz-background-size:cover; -o-background-size:cover; background-size:cover;'>" +
				"</div>" +
				"<div id='merch-item-details'>" +
					"<form action='' >" +
						"<div id='size-quantity-price-div'>" +
							"<div class='styled-select'>" +
								"<select name='sizing'>" +
									this.sizingOptions() +
								"</select>" +
							"</div>" +
							"<div class='styled-input'>" +
								"<input type='tel' size='2' maxlength='2' value='' placeholder='QTY' name='quantity' onkeypress='return isNumberKey(event)'>" +
							"</div>" +
							"<h3>$" + merch.itemPrice + "</h3>" +
						"</div>" +
						"<div id='button-details-div'>" +
							"<button id='add-to-cart' type='button'>Add to Cart</button>" +
							"<p>" + merch.itemDescription + "</p>" +	
						"</div>" +
					"</form>" +
				"</div>" +
			"</div>"		

		this.el.html(html);
		return this;
    };

	this.sizingOptions = function() {
		var html = ""
		merch.sizes = merch.itemSize.split(",")
console.log(merch.sizes)
		if (merch.sizes.length > 1){
			html = "<option value='invalid' selected>SIZE</option>"
			for (var i = 0; i < merch.sizes.length; i++){
				html += "<option value='" + merch.sizes[i] + "'>" + merch.sizes[i] + "</option>"
			}
		} else if (merch.sizes.length == 1){
			html += "<option value='" + merch.sizes[0] + "'>" + merch.sizes[0] + "</option>"
		}else{
			html = "<option value='No-Sizing' selected>No Sizing</option>"
		}

		return html
	}
	
    this.initialize();

}
