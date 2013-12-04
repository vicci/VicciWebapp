var ccInfoView = function(store) {

    this.initialize = function() {
       // Define a div wrapper for the view. The div wrapper is used to attach events.
       this.el = $("<div id='checkout-view-wrapper' id='appwrapper' />");
		this.billing = store.getCheckoutAddress("billing")
		this.shipping = store.getCheckoutAddress("shipping")
    };

	this.addressInfoHTML = function(type){
		var html = ""
		if (type != null && typeof type != undefined){
			html += 	
				//"<p>" + type.nickName + "</p>" +
				"<p>" + type.line1 + "</p>" +
				"<p>" + type.city + ", " + type.state + ", " + type.zip + "</p>"
		}

		return html
	}

	this.calcPrice = function(store){
		var cart = store.retrieveCart(window.location.hash.split("/")[1])
		var price = 0;
		if (cart){
			for (var i = 0; i < cart.length; i++){
				price += Number(cart[i].price) * Number(cart[i].quantity)
			}
		}
		return price
	}

    this.render = function() {
		var header = headerHTML("ccinfo");
		var html = 
			"<div id='check-out-container' class='content-wrapper'>" +
				header +
				"<div id='address-buttons'>" +
					"<div type='shipping' class='address-button'>" +
						"<div>" +
							"<h4>Shipping Address</h4>" +
							this.addressInfoHTML(this.shipping) +
						"</div>" +
						"<img class='next-arrow' src='img/next-arrow.png' />" +
					"</div>" +
					"<div type='billing' class='address-button'>" +
						"<div>" +
							"<h4>Billing Address</h4>" +
							this.addressInfoHTML(this.billing) +
						"</div>" +
						"<img class='next-arrow' src='img/next-arrow.png' />" +
					"</div>" +
       			"</div>" +
				"<div class='ccjs-card'>" +
				  "<label class='ccjs-number'>" +
					"Card Number" +
					"<input type='tel' class='ccjs-number'>" +
				  "</label>" +
				
				  "<label class='ccjs-csc'>" +
					"Security Code" +
					"<input class='ccjs-csc'>" +
				  "</label>" +
				
				  "<button type='button' class='ccjs-csc-help'>?</button>" +
				
				  "<label class='ccjs-name'>" +
					"Name on Card" +
					"<input name='name' class='ccjs-name'>" +
				  "</label>" +
				
				  "<fieldset class='ccjs-expiration'>" +
					"<legend>Expiration</legend>" +
					"<select name='month' class='ccjs-month'>" +
					  "<option selected disabled>MM</option>" +
					  "<option value='01'>01</option>" +
					  "<option value='02'>02</option>" +
					  "<option value='03'>03</option>" +
					  "<option value='04'>04</option>" +
					  "<option value='05'>05</option>" +
					  "<option value='06'>06</option>" +
					  "<option value='07'>07</option>" +
					  "<option value='08'>08</option>" +
					  "<option value='09'>09</option>" +
					  "<option value='10'>10</option>" +
					  "<option value='11'>11</option>" +
					  "<option value='12'>12</option>" +
					"</select>" +
				
					"<select name='year' class='ccjs-year'>" +
					  "<option selected disabled>YY</option>" +
					  "<option value='13'>13</option>" +
					  "<option value='14'>14</option>" +
					  "<option value='15'>15</option>" +
					  "<option value='16'>16</option>" +
					  "<option value='17'>17</option>" +
					  "<option value='18'>18</option>" +
					  "<option value='19'>19</option>" +
					  "<option value='20'>20</option>" +
					  "<option value='21'>21</option>" +
					  "<option value='22'>22</option>" +
					  "<option value='23'>23</option>" +
					"</select>" +
				  "</fieldset>" +
				
				  "<select name='card-type' class='ccjs-hidden-card-type'>" +
					"<option value='amex' class='ccjs-amex'>American Express</option>" +
					"<option value='discover' class='ccjs-discover'>Discover</option>" +
					"<option value='mastercard' class='ccjs-mastercard'>MasterCard</option>" +
					"<option value='visa' class='ccjs-visa'>Visa</option>" +
					"<option value='diners-club' class='ccjs-diners-club'>Diners Club</option>" +
					"<option value='jcb' class='ccjs-jcb'>JCB</option>" +
				  "</select>" +
				"</div>" +
				"</div>"



				/*"<div class='credit-card-input no-js' id='skeuocard'>"+
					"<label for='cc_type'>Card Type</label>"+
					"<select name='cc_type'>"+
						"<option value=''>...</option>"+
					  	"<option value='visa'>Visa</option>"+
					  	"<option value='discover'>Discover</option>"+
					  	"<option value='mastercard'>MasterCard</option>"+
					  	"<option value='maestro'>Maestro</option>"+
					  	"<option value='jcb'>JCB</option>"+
					  	"<option value='unionpay'>China UnionPay</option>"+
					  	"<option value='amex'>American Express</option>"+
					  	"<option value='dinersclubintl'>Diners Club</option>"+
					"</select>"+
					"<label for='cc_number'>Card Number</label>"+
					"<input type='text' name='cc_number' id='cc_number' placeholder='XXXX XXXX XXXX XXXX' maxlength='19' size='19'>"+
					"<label for='cc_exp_month'>Expiration Month</label>"+
					"<input type='text' name='cc_exp_month' id='cc_exp_month' placeholder='00'>"+
					"<label for='cc_exp_year'>Expiration Year</label>"+
					"<input type='text' name='cc_exp_year' id='cc_exp_year' placeholder='00'>"+
					"<label for='cc_name'>Cardholder's Name</label>"+
					"<input type='text' name='cc_name' id='cc_name' placeholder='John Doe'>"+
					"<label for='cc_cvc'>Card Validation Code</label>"+
					"<input type='text' name='cc_cvc' id='cc_cvc' placeholder='123' maxlength='3' size='3'>"+
				"</div>" +*/

			/*"<div id='' class='content-wrapper'>" +
				"<form action='transaction.php' method='POST' id='braintree-payment-form'>" +
					"<div id='ccInfo-wrapper'>" +
						"<h1>Credit Card Information</h1>" +
						"<div>" +
								"<p>" +
									"<label>Card Number</label>" +
									"<input type='text' size='20' autocomplete='off' data-encrypted-name='number' />" +
								"</p>" +
								"<p>" +
									"<label>CVV</label>" +
									"<input type='text' size='4' autocomplete='off' data-encrypted-name='cvv' />" +
								"</p>" +
								"<p>" +
									"<label>Expiration (MM/YYYY)</label>" +
									"<input type='text' size='2' name='month' /> / <input type='text' size='4' name='year' />" +
								"</p>" +
								"<input type='submit' id='submit' />" +
						"</div>" +
					"</div>" +	
				"</form>" +
			"</div>"*/		

		this.el.html(html);
		return this;
    };

	
    this.initialize();

}// JavaScript Document