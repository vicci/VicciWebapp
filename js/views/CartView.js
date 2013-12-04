var CartView = function(cartItems) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $("<div id='cart-view-wrapper'/>");
		this.cartPrice = 0
//console.log(cartItems)
    };

    this.render = function() {
		var html = 
			"<div id='cart-content-wrapper' class='content-wrapper'>" +
				"<div id='cart-list-wrapper'>" +
					"<ul class='cart-list'>" +
						this.cartItems() +
					"</ul>" +
				"</div>" +
			"</div>" 	

		this.el.html(html);
		return this;
	};

	this.addToPrice = function(num, q) {
		this.cartPrice += Number(num) * Number(q)
	}

	this.cartItems = function() {

		var html = ""

		if (!cartItems)
			return html

		for (var i = 0; i < cartItems.length; i++){
			var m = cartItems[i]
			this.addToPrice(m.price, m.quantity)
			html += 
				"<li merchId='" + m.cartItemId + "' class='cart-li'>" +
					"<div id='cart-item-image' " +
					"style='background:url(" + m.itemImage + ") no-repeat center; -webkit-background-size:cover;" +
					"-moz-background-size:cover; -o-background-size:cover; background-size:cover;'>" +
					"</div>" +
					"<div style='display:none' merchId='" + m.cartItemId + "' class='delete-button'>" +
						"<img src='img/delete.png' merchId='" + m.cartItemId + "' />" +
					"</div>" +
					"<div id='cart-item-details'>" +
						"<div id='item-name-container' class='fit-width-container' >" +
							"<h4 class='fit-width' >" + m.itemName + "</h4>" +
						"</div>" +
						"<div class='cart-quantity' >" +
							"<span >(" + m.quantity + ")</span>" +
							"<div id='edit-quantity' style='display:none' class='edit-quantity-input'>" +
								"<input merchId='" + m.cartItemId + "' type='tel' size='1' maxlength='2' value='" + m.quantity + "' name='quantity' onkeypress='return isNumberKey(event)'>" +
							"</div>" +
						"</div>" +
						"<div>" +
							"<h4>" + m.itemSize + "</h4>" +
						"</div>" +
					"</div>" +
				"</li>" 
		}
		
		html += "<li class='cart-li'></li>"

		return html
	}

    this.initialize();

}
