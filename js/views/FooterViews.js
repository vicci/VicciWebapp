function footerHTML(page) {
	var html = "";

	if (page.toLowerCase() === "cart"){
		html =
			"<div id='cart-footer' class='footer'>" +
				"<div class='footer-content'>" +
					"<div class='sum-container'>" +
						"<div class='cost-type'>" +
							"<span id='' >Total:</span>" +
						"</div>" +
						"<div class='cost-total'>" +
							"<span id='cart-total-label' >$</span>" +
						"</div>" +
					"</div>" +
					"<div>" +
						"<button id='checkout' class='page-button' type='button'>Check Out</button>"
					"</div>" +
				"</div>" +
			"</div>" 	
	}else if (page.toLowerCase() === "checkout"){
		html =
			"<div class='footer'>" +
				"<div class='footer-content'>" +
					"<div class='cost-totaling'>" +
						"<div class='cost-type'>" +
							"<span id='' >Item total</span>" +
							"<span id='' >Shipping</span>" +
						"</div>" +
						"<div class='cost-total'>" +
							"<span id='cart-total' >$</span>" +
							"<span id='ship-total' >$</span>" +
						"</div>" +
					"</div>" +
					"<div class='sum-container'>" +
						"<div class='cost-type'>" +
							"<span id='' >Order total:</span>" +
						"</div>" +
						"<div class='cost-total'>" +
							"<span id='order-total' >$</span>" +
						"</div>" +
					"</div>" +
					"<div>" +
						"<button id='place-order' class='page-button' type='button'>Place Order</button>"
					"</div>" +
				"</div>" +
			"</div>"
	}

	return html;
}
