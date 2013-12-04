function headerHTML(page, object) {
	var html = "";
	var ids = window.location.hash.split("/")

	if (page.toLowerCase() === "events"){
		html =
			"<div class='header'>" +
				"<div id='account-button' class='button-left button'>" +
					"<img id='vicci-logo' class='centered' src='img/vicci-logo.png' />" +
				"</div>" + 
				"<div class='title'>" +
					"<h1>Events</h1>"+
				"</div>" +
				"<div class='button-right button'>" +
				"</div>" + 
			"</div>"		
	}else if (page.toLowerCase() === "categories"){
		html =
			"<div class='header'>" + 
				"<div id='back-button' class='button-left button'>" +
					"<img id='back-arrow' class='centered' src='img/back-arrow.png' />" +
				"</div>" + 
				"<div class='title'>" +
					"<h1>Categories</h1>" +
				"</div>" +
				"<div id='cart-button' event='" + ids[1] + "' class='button-right button'>" +
					"<img id='cart-icon' class='centered' src='img/cart-icon.png' />" +
					"<div  style='display:none' class='circleBase'><span class='cart-item-num'>0</span></div>" +
				"</div>" + 
			"</div>"
	}else if (page.toLowerCase() === "merchlist"){
		html =
			"<div class='header'>" + 
				"<div id='back-button' class='button-left button'>" +
					"<img id='back-arrow' class='centered' src='img/back-arrow.png' />" +
				"</div>" + 
				"<div class='title'>" +
					"<h1>Merchandise</h1>" +
				"</div>" +
				"<div id='cart-button' event='" + ids[1] + "' class='button-right button'>" +
					"<img id='cart-icon' class='centered' src='img/cart-icon.png' />" +
					"<div  style='display:none' class='circleBase'><span class='cart-item-num'>0</span></div>" +
				"</div>" + 
			"</div>"
	}else if (page.toLowerCase() === "merchitem"){
		html =
			"<div class='header'>" + 
				"<div id='back-button' class='button-left button'>" +
					"<img id='back-arrow' class='centered' src='img/back-arrow.png' />" +
				"</div>" + 
				"<div class='title fit-width-container'>" +
					"<h1 class='fit-width'>" + object.itemName + "</h1>" +
				"</div>" +
				"<div id='cart-button' event='" + ids[1] + "' class='button-right button'>" +
						"<img id='cart-icon' class='centered' src='img/cart-icon.png' />" +
						"<div style='display:none' class='circleBase'><span class='cart-item-num'>0</span></div>" +
				"</div>" + 
			"</div>"
	}else if (page.toLowerCase() === "cart"){
		html =
			"<div id='cart-header' class='header'>" + 
				"<div id='back-button' class='button-left button'>" +
					"<img id='back-arrow' class='centered' src='img/back-arrow.png' />" +
				"</div>" + 
				"<div class='title'>" +
					"<h1>Cart</h1>" +
				"</div>" +
				"<div id='edit-button' class='button-right button'>" +
					"<img id='' class='' src='img/edit.png' />" +
				"</div>" + 
			"</div>"
	}else if (page.toLowerCase() === "login"){
		html =
			"<div class='header'>" + 
				"<div id='back-button' class='button-left button'>" +
					"<img id='back-arrow' class='centered' src='img/back-arrow.png' />" +
				"</div>" + 
				"<div class='title'>" +
					"<h1>Login</h1>" +
				"</div>" +
				"<div class='button-right button'>" +
				"</div>" +  
			"</div>"
	}else if (page.toLowerCase() === "ccinfo"){
		html =
			"<div class='header'>" + 
				"<div id='back-button' class='button-left button'>" +
					"<img id='back-arrow' class='centered' src='img/back-arrow.png' />" +
				"</div>" + 
				"<div class='title'>" +
					"<h1>Checkout</h1>" +
				"</div>" +
				"<div class='button-right button'>" +
				"</div>" +  
			"</div>"
	}else if (page.toLowerCase() === "address"){
		html =
			"<div class='header'>" + 
				"<div id='back-button' class='button-left button'>" +
					"<img id='back-arrow' class='centered' src='img/back-arrow.png' />" +
				"</div>" + 
				"<div class='title'>" +
					"<h1>Address</h1>" +
				"</div>" +
				"<div class='button-right button'>" +
				"</div>" + 
			"</div>"
	}else if (page.toLowerCase() === "newaddress"){
		html =
			"<div class='header'>" + 
				"<div id='back-button' class='button-left button'>" +
					"<img id='back-arrow' class='centered' src='img/back-arrow.png' />" +
				"</div>" + 
				"<div class='title'>" +
					"<h1>New Address</h1>" +
				"</div>" +
				"<div class='button-right button'>" +
				"</div>" + 
			"</div>"
	}else if (page.toLowerCase() === "editaddress"){
		html =
			"<div class='header'>" + 
				"<div id='back-button' class='button-left button'>" +
					"<img id='back-arrow' class='centered' src='img/back-arrow.png' />" +
				"</div>" + 
				"<div class='title'>" +
					"<h1>Edit Address</h1>" +
				"</div>" +
				"<div class='button-right button'>" +
				"</div>" + 
			"</div>"
	}

	return html;
}
