var app = {

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

	registerEvents: function() {
		var self = this
		$(function() {
    		FastClick.attach(document.body);
		});
		$(window).on('resize', $.proxy(this.responsiveModifications, this));
       $(window).on('hashchange', $.proxy(this.viewPrep, this));

/***************************************************************************************

					EDIT CART HANDLER

***************************************************************************************/
		$('body').on('click', '#edit-button', function(event) {
			$('#edit-button img').attr('src', 'img/thumbs.png')
			$('.cart-quantity span').hide()
			$('.edit-quantity-input').show();
			$('.delete-button').show();
			$('#edit-button').attr('id', 'save-button')
		});
/***************************************************************************************

					SAVE CART EDITS HANDLER

***************************************************************************************/
		$('body').on('click', '#save-button', function(event) {
			$('#save-button img').attr('src', 'img/edit.png')
			$('#save-button').attr('id', 'edit-button')
			$('.cart-quantity span').show()
			$('.edit-quantity-input').hide();
			$('.delete-button').hide();
		});
/***************************************************************************************

					EDIT CART QUANTITY HANDLER

***************************************************************************************/
		$('body').on('change', '.edit-quantity-input input', function(event) {
			var id = $(this).attr("merchId")
			var quantity = $(this).val()
			$("li[merchId='" + id + "'] .cart-quantity span").text("(" + quantity + ")")
			self.store.updateCartItemQuantity(window.location.hash.split("/")[1], id, quantity)
			
			var cart = self.store.retrieveCart(window.location.hash.split("/")[1])
			$('#cart-total-label').text("$" + self.calcCartCost(cart));
		
		});
/***************************************************************************************

					DELETE ADDRESS HANDLER

***************************************************************************************/
		$('body').on('click', '.delete-button', function(event) {
			var id = $(this).attr("merchId")
			var eventId = window.location.hash.split("/")[1]
			var deleted = self.store.removeFromCart(eventId, id)
			var subtract = Number(deleted.price) * Number(deleted.quantity)
			var price = Number($('#cart-total-label').text().split("$")[1]) - subtract
			$('#cart-total-label').text("$" + price)
			$("li[merchId='" + id + "']").remove()
		});
		$('body').on('click', '.merch-li', function(event) {
console.log(event)
			window.location.hash = window.location.hash + "/" + event.srcElement.id
		});
/***************************************************************************************

					CART-BUTTON HANDLER

***************************************************************************************/
		$('body').on('click', '#cart-button', function(event) {
			ga('send', 'event', 'Cart-Button', 'click');//google analytics
			vars = window.location.hash.split("/")
			if (typeof vars[3] != "undefined"){
				window.location.hash = "#cart/" + vars[1] + "/" + vars[2] + "/" + vars[3]
			}else if (typeof vars[2] != "undefined"){
				window.location.hash = "#cart/" + vars[1] + "/" + vars[2]
			}else{
				window.location.hash = "#cart/" + vars[1]
			}
		});
/***************************************************************************************

					CHECKOUT HANDLER

***************************************************************************************/
		$('body').on('click', '#checkout', function(event) { 
			ga('send', 'event', 'Checkout', 'click', $('#cart-total-label').text());
			var hash = window.location.hash
			var cart = self.store.retrieveCart(hash.split("/")[1])
			if (!cart)
				alert("No items in cart to checkout with!")
			else if (self.store.getSessionId()){
				window.location.hash = "#checkout/" + hash.split("/")[1]		
			}else
				window.location.hash = "#login/" + hash.split("/")[1]
		});
/***************************************************************************************

					GUEST LOGIN HANDLER

***************************************************************************************/
		$('body').on('click', '#guest-login-button', function(event) {
			var login = {}

			login.emailId = $("#guestemailinput").val()
			if (!login.emailId.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\s*$/)){
				alert("Not a valid email")
				return
			}

			login.loginProvider = 1
			login.userId = ""
			login.isSignIn = 0
			login.isGuest = 1

			self.ajax.login(login, function(){
				ga('send', 'event', 'email submit', 'click')
				var hash = window.location.hash
				window.location.hash = "#checkout/" + hash.split("/")[1]
			})
		});
/***************************************************************************************

					SIGN-IN/SIGN-UP HANDLER

***************************************************************************************/
		$('body').on('click', '#login-button', function(event) {
			var login = {}

			login.emailId = $("#accountemailinput").val()
			if (!login.emailId.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\s*$/)){
				alert("Not a valid email")
				return
			}
		
			login.password = $("input[name='password']").val()
			if (login.password.length < 3){
				alert("We can manage a password length of at least 3 right?\nLet's do it!")
				return
			}
			//login.password = "123"

			if ($("#memberloginlabel").attr("val") == 0){
				ga('send', 'event', 'SIGNUP', 'click');
				login.isSignIn = 0
			}else{
				ga('send', 'event', 'SIGNIN', 'click');
				login.isSignIn = 1
			}
			
			login.loginProvider = 1;
			login.userId = ""
			self.ajax.login(login, function(){
				var hash = window.location.hash
				window.location.hash = "#checkout/" + hash.split("/")[1]
			})
			//if resultcode sends verification email: artificially click #loginlabel
		});
/***************************************************************************************

					SIGN-IN/SIGN-UP TOGGLE HANDLER

***************************************************************************************/
		$('body').on('click', '#memberloginlabel', function(event) {
			if ($(this).attr("val") == 0){
				$(this).text("[New User]")
				$("#login-button").text("Sign In")
				$("#login-button").css("background-color", "#009cde")
				$(this).attr("val", "1")
			}else{
				$(this).text("[Existing User]")
				$("#login-button").text("Sign Up")
				$("#login-button").css("background-color", "#414141")
				$(this).attr("val", "0")
			}
		});
/***************************************************************************************

					GUEST LABEL TOGGLE HANDLER

***************************************************************************************/
		$('body').on('click', '#guestloginlabel', function(event) {
			if ($(this).attr("val") == 0){
				$('#guest-sign-in').hide()
				$('#member-sign-in').show()
			}else{
				$('#member-sign-in').hide()
				$('#guest-sign-in').show()
			}
		});
/***************************************************************************************

					PW SHOW/HIDE TOGGLE HANDLER

***************************************************************************************/
		$('body').on('click', '#pw-image', function(event) {
			if ($("input[name='password']").attr("type") == "password"){
  				$("input[name='password']").get(0).type='text';
				$("#pw-image").attr("src", "img/eyeclose.png");
				$("#pw-image").attr("title", "Hide Password");
			}else{
				$("input[name='password']").get(0).type='password';
				$("#pw-image").attr("src", "img/eyeopen.png");
				$("#pw-image").attr("title", "Show Password");
			}
		});
/***************************************************************************************

					SELECT ADDRESS HANDLER

***************************************************************************************/
		$('body').on('click', '.address-li', function(event) {
			var type = window.location.hash.split("/")[2]
			var id = $(this).attr("aid")

			if (event.srcElement.className == "address-edit-icon"){
				//self.slidePage(new EditAddressView(address).render());
				ga('send', 'event', 'Edit-Address', 'click', type)/***************************google analytics***********************/
				window.location.hash = window.location.hash + "/edit/" + id
			}else{
				var address = self.store.retrieveAddress(id)
				self.store.setAddress(type, address)
				window.location.hash = "#checkout/" + window.location.hash.split("/")[1]
			}
		});
/***************************************************************************************

					ADD ADDRESS INFO BUTTON HANDLER

***************************************************************************************/
		$('body').on('click', '.address-button', function(event){
			var type = $(this).attr("type")
			window.location.hash = "#addresses/" + window.location.hash.split("/")[1] + "/" + type
		});
/***************************************************************************************

					ADD ADDRESS BUTTON HANDLER

***************************************************************************************/
		$('body').on('click', '#add-address-button', function(event){
			hash = window.location.hash
			window.location.hash = hash + "/new"
			ga('send', 'event', 'Add-Address', 'click', hash)/***************************google analytics***********************/
		});
/***************************************************************************************

					SAVE ADDRESS BUTTON HANDLER

***************************************************************************************/
		$('body').on('click', '#save-address', function(event){
			var address =  parseNewAddress()

			if (address.valid){
				var id = self.store.addAddress(address)
				var hash = window.location.hash
				var type = hash.split("/")[2]

				var address = self.store.retrieveAddress(id)
				self.store.setAddress(type, address)
				window.location.hash = "#checkout/" + window.location.hash.split("/")[1]

				$(".address-li").trigger("click")
				ga('send', 'event', 'Save-Address', 'click', hash)/***************************google analytics***********************/
			}else{
				alert("Required Fields Missing")
			}
		});
/***************************************************************************************

					SAVE EDITED ADDRESS BUTTON HANDLER

***************************************************************************************/
		$('body').on('click', '#save-edited-address', function(event){
			var address =  parseNewAddress()

			if (address.valid){
				self.store.changeAddress(window.location.hash.split("/")[4], address)
				var hash = window.location.hash
				hash = hash.substring(0, hash.lastIndexOf("/"))
				window.location.hash = hash.substring(0, hash.lastIndexOf("/"))
			}else{
				alert("Required Fields Missing")
			}
		});
/***************************************************************************************

					DELETE ADDRESS HANDLER

***************************************************************************************/
		$('body').on('click', '#delete-address', function(event){	
			var hash = window.location.hash
			self.store.deleteAddress(hash	.split("/")[4])
			hash = hash.substring(0, hash.lastIndexOf("/"))
			window.location.hash = hash.substring(0, hash.lastIndexOf("/"))
		});
/***************************************************************************************

					ADD TO CART HANDLER

***************************************************************************************/
		$('body').on('click', '#add-to-cart', function(event) {
			var sizing = $(".stage-center select[name='sizing']")
			var quantity = $(".stage-center input[name='quantity']")

			if (sizing.val() !== "invalid" && quantity.val() > 0){
				var ids = window.location.hash.split("/")
				merchItem = self.store.getMerchItem(ids[1], ids[2], ids[3])
				merchItem.quantity = quantity.val().toString()
				merchItem.itemSize = sizing.val().toString()
				merchItem.price = merchItem.itemPrice
				merchItem.cartItemId = merchItem.itemId + merchItem.itemSize
				self.store.addToCart(ids[1], merchItem)
				var cart = self.store.retrieveCart(ids[1])
				if (cart){
					self.showCartNum(ids[1], cart.length)
				}
				alert("Successfully added to cart! \n Hit the cart button to checkout.")
				
				ga('send', 'event', 'Valid-Add-To-Cart', 'click', merchItem.itemName, parseInt(merchItem.quantity));/***************************google analytics***********************/
			}else{
				alert("Size and Quantity Values Required")
			}
		});
/***************************************************************************************

					BACK BUTTON HANDLER

***************************************************************************************/
		$('body').on('click', '#back-button', function(event) {
			var vars = window.location.hash.split("/")
			var hash = ""
			self._back = true;
			if (vars[0] == "#merch"){
				if (typeof vars[2] == "undefined"){
					window.location.hash = "#"
				}else{
					hash = window.location.hash
					window.location.hash = hash.substring(0, hash.lastIndexOf("/"))
				}
			}else if (vars[0] == "#cart"){
				if (typeof vars[3] != "undefined"){
					window.location.hash = "#merch/" + vars[1] + "/" + vars[2] + "/" + vars[3]
				}else if (typeof vars[2] != "undefined"){
					window.location.hash = "#merch/" + vars[1] + "/" + vars[2]
				}else{
					window.location.hash = "#merch/" + vars[1]
				}
			}else if (vars[0] == "#login"){
				hash = window.location.hash
				window.location.hash = "#cart/" + hash.split("/")[1]
			}else if (vars[0] == "#checkout"){
				hash = window.location.hash
				window.location.hash = "#cart/" + hash.split("/")[1]
			}else if (vars[0] == "#addresses"){
				if (typeof vars[3] == "undefined"){
					window.location.hash = "#checkout/" + window.location.hash.split("/")[1]
				}else if (typeof vars[4] == "undefined"){
					hash = window.location.hash
					window.location.hash = hash.substring(0, hash.lastIndexOf("/"))
				}else{
					hash = window.location.hash
					hash = hash.substring(0, hash.lastIndexOf("/"))
					window.location.hash = hash.substring(0, hash.lastIndexOf("/"))
				}
			}else{
				window.location.hash = "#"
			}
			//window.location.hash = self.priorView.pop()
		});
/***************************************************************************************

					PLACE ORDER HANDLER

***************************************************************************************/
		$('body').on('click', '#place-order', function(event) {
			//get inital transaction object with shippingAddress and billAddress member values
			var transaction = self.store.getCheckoutAddress();
			//verify they exist
			if (transaction == null || typeof transaction == undefined){
				ga('send', 'event', 'Place-Order-Fail', 'click', 'missing shipping/billing')/***************************google analytics***********************/
				alert("Shipping and Billing Address Required")
				return
			}
			
			//get cartItems / verify its not empty / add it to payment object
			var cart = self.store.retrieveCart(window.location.hash.split("/")[1])
			if (cart == null || typeof cart == undefined){
				ga('send', 'event', 'Place-Order-Fail', 'click', 'No items in cart On Place-Order Click')/***************************google analytics***********************/
				alert("No Items in Cart")
				return
			}
			transaction.cartItems = cart;
			transaction.eventId = window.location.hash.split("/")[1]
			transaction.itemTotal = self.calcCartCost(cart)
			transaction.shippingPrice = self.calcShippingCost(cart)
	
			transaction.customerId = "" //self.store.getCustomerId() <--- this doesn't have a value for guest login
			transaction.sessionId = self.store.getSessionId()
			if (!transaction.sessionId){
				ga('send', 'event', 'Place-Order-Fail', 'click', 'No Session ID On Place-Order Click')/***************************google analytics***********************/
				alert("Not Logged In")
				return
			}

			//add encrypted credit card values to payment object
			transaction = self.encryptCard($('.ccjs-card'), transaction);
			
			//verify credit card was filled out correctly. encryptCard will return false otherwise
			if (transaction){
				console.log(transaction)
				$('body').addClass("loading");
				self.ajax.processTransaction(transaction, function(){
					$('body').removeClass("loading");
					alert("Transaction Successful!\nCheck your email for order confirmation.\nWe will ship ASAP.")
					window.location.hash = "#"
					self.store.deleteCart(transaction.eventId)
				}, function(){
					$('body').removeClass("loading");
				});
				//ajax post
			}


			//https://www.braintreepayments.com/braintrust/client-side-encryption
		});
    },

	encryptCard: function(card, t){
		var clientSideEncryptionKey = "MIIBCgKCAQEA19TN07RvEGrAgYUHWZVhQGa2jI4ilGvauUQFkXzINrpfT72RhVw6NMl/9LSHm4CAmF9Ec74YjdFScLGT/GSjgr0YMjGMPNKqLiT/m8wczyPeemaqoo/0uSd5nbIQZjiFndxNLRcGxwy7JPmbTMgeh9o/d/e8AbswjIlKyy6bfPbAl7YAx7DnIjK7JTRRFP8fcxuwihJadZYcAmZTurA3d0vy/TNfWyDfM4pTUwLtWxaRNJLwuMtMLOPdUqWPD8NPVFCr93Eok9stD53H1KWOizkrIf/sLuvfp5suMV/SlAK7sDE9Rz646PRXP8F87HEVKUpVXxel5hq/5YIJSCAEYwIDAQAB";
		var braintree = Braintree.create(clientSideEncryptionKey)

		var inputs = card.find("input")

		for (var i = 0; i < inputs.length; i++){
			if ($(inputs[i]).attr("class").split(" ")[1] == "ccjs-complete"){
				if ($(inputs[i]).attr("autocompletetype") == "cc-number"){
					t.cardNumber = braintree.encrypt($(inputs[i]).val())
				}else if ($(inputs[i]).attr("autocompletetype") == "cc-csc"){
					t.cvv = braintree.encrypt($(inputs[i]).val())
				}else if ($(inputs[i]).attr("autocompletetype") == "cc-full-name"){
					//p. = braintree.encrypt($(inputs[i]).val())
				}
			}else{
				alert("Valid Card Number, Security Code and Name are required.")
				ga('send', 'event', 'Place-Order-Fail', 'click', 'Invalid Card/CCV/Name field(s) On Place-Order Click')/***************************google analytics***********************/
				return false
			}
		}

		if (card.find("fieldset").attr("class").split(" ")[1] == "ccjs-complete"){
			t.expirationMonth = braintree.encrypt(card.find(".ccjs-month").val())
			t.expirationYear = braintree.encrypt(card.find(".ccjs-year").val())
		}else{
			alert("Valid Card Expiration is required.")
			ga('send', 'event', 'Place-Order-Fail', 'click', 'Invalid card expiration on Place-Order Click')/***************************google analytics***********************/
			return false
		}
		t.venmo_sdk_session = braintree.encrypt("dummy-value")
		return t
	},

	calcCartCost: function(cart){
		var price = 0;
		if (cart){
			for (var i = 0; i < cart.length; i++){
				price += Number(cart[i].price) * Number(cart[i].quantity)
			}
		}	
		return price
	},

	calcShippingCost: function(cart){
		/*if (window.location.hash.split("/")[1])
			return 0*/
		var weight = 0;
		if (cart){
			for (var i = 0; i < cart.length; i++){
				weight += Number(cart[i].itemWeight) * Number(cart[i].quantity)
			}
		}
		
		if (weight == 0)
			return 0

		var price = 0;
		if (weight >= 32.1){
			price = 14.50
		}else if (weight >= 16.1){
			price = 11.20
		}else if (weight >= 8.01){
			price = 8.75
		}else if (weight >= 4.01){
			price = 6.50
		}else{
			price = 5
		}
		return price
	},

	viewPrep: function(){
		var hash = window.location.hash

		match = hash.match(/^#merch\/(\d{1,})/);
		if (match && match[0] == window.location.hash){
			this.ajax.getEventDetails(match[1], $.proxy(this.route, this))
		}else
			this.route()
	},

	slidePage: function(page) {
		var currentPageDest,
			self = this;
	 
		// If there is no current page (app just started) -> No transition: Position new page in the view port
		if (!this.currentPage) {
			$(page.el).attr('class', 'page stage-center');
			$('body').append(page.el);
			this.currentPage = page;
			this.pageModifications();
			return;
		}
	 
		// Cleaning up: remove old pages that were moved out of the viewport
		$('.stage-right, .stage-left').not('.homePage').remove();
		if (this._back) {
			// Always apply a Back transition (slide from left) when we go back to the search page
			$(page.el).attr('class', 'page stage-left');
			currentPageDest = "stage-right";
			this._back = false;
		} else {
			// Forward transition (slide from right)
			$(page.el).attr('class', 'page stage-right');
			currentPageDest = "stage-left";
		}
	 
		$('body').append(page.el);
	 	
		// Wait until the new page has been added to the DOM...
		setTimeout(function() {
			// Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
			$(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
			// Slide in the new page
			$(page.el).attr('class', 'page stage-center transition');
			
			self.currentPage = page;

			self.pageModifications();
		});
	 
	},

	responsiveModifications: function(){
		
		$('.title').css('width', function() {
			return $(window).width() - 100//100 is the combined pixel sizes of the buttons(50 each)
		});

		if ($('.stage-center .fit-width').length > 0)//check to see if we are on a page that needs this modification
			this.textResize('.stage-center .fit-width', $('.stage-center .fit-width-container').width());

		$('.stage-center .title h1').css('margin-left', function() {
			//may need to acount for em in the future?
			var width = $('.stage-center .title h1').css('width').split("px")
			var margin = width[0] / 2

			return -margin
		});
		$('#cart-header h1').css('margin-left', function() {
			//may need to acount for em in the future?
			var width = $('#cart-header h1').css('width').split("px")
			var margin = width[0] / 2

			return -margin
		});
	},

	pageModifications: function(){
		var self = this
		var hash = window.location.hash
		var ids = window.location.hash.split("/")
		var cart = this.store.retrieveCart(ids[1])

		if (cart){
			this.showCartNum(ids[1], cart.length)
		}

		if ($('.stage-left').length > 0){
			$('.stage-left').remove();
		}else if ($('.stage-right').length > 0){
			$('.stage-right').remove();
		}

		if ($('.stage-center #cart-content-wrapper').length > 0){	
			var header = headerHTML("cart")	
			var footer = footerHTML("cart")	
			$('body').append(header)
			$('body').append(footer)

			$('#cart-total-label').text("$" + self.calcCartCost(cart))
			$('.stage-right').remove()

		}else if($('#cart-footer').length > 0){
			$('#cart-view-wrapper').remove()
			$('#cart-header').remove()
			$('#cart-footer').remove()
		}

		if ($('.stage-center #new-address-content-wrapper').length > 0){
			$('html').attr("class", "greybghtml");
		}else if ($('.stage-center #merch-item-details').length > 0){
			$('html').attr("class", "vicciblackbghtml");
		}else if ($('.stage-center #check-out-container').length > 0){
			$('html').attr("class", "whitebghtml");
		}else if ($('.stage-center #login-content-wrapper').length > 0){
			$('html').attr("class", "whitebghtml");
		}else if ($('.stage-center #cat-content-wrapper').length > 0){
			$('html').attr("class", "greybghtml");
		}
	
		this.responsiveModifications()

		if ($('.stage-center #check-out-container').length > 0){				
			var html = footerHTML("checkout")			
			$('#check-out-container').append(html)
			$('body').append("<div class='modal'></div>")

			var cartTotal = this.calcCartCost(cart)
			var shipTotal = this.calcShippingCost(cart)
			$('#cart-total').text("$" + parseFloat(Math.round(cartTotal * 100) / 100).toFixed(2))
			$('#ship-total').text("$" + parseFloat(Math.round(shipTotal * 100) / 100).toFixed(2))
			var orderTotal = cartTotal + shipTotal
			$('#order-total').text("$" + parseFloat(Math.round(orderTotal * 100) / 100).toFixed(2))

			creditcardjs()
		}

		hashVal = hash.split("/")
		if (hashVal[0] === "#merch"){
			e = self.store.getEvent(hashVal[1])
			var html = "<meta property='og:image' content='" + e.eventImage + "' />" +
						"<meta property='og:title' content='" + e.eventTitle + "' />" +
						"<meta property='og:description' content='Get exclusive event merchandise on Vicci for "+ e.eventTitle + ".' />"

			$('head').append(html)
		}else{//this is suppose to remove the meta tags but it's not working. 
			$('head').remove($("meta[property~='og']"))
		}
	},

	showCartNum: function(eventId, num){
		$("div[event='"+eventId+"'] .circleBase span").text(num)
		$("div[event='"+eventId+"'] .circleBase").show()		
	},

	textResize: function(selector, width){
		var size = "";
		var desired_width = width;
		resizer = $(selector);

		while(resizer.width() > desired_width) {
			size = parseInt(resizer.css("font-size"), 10);
		  	resizer.css("font-size", size - 1);
		}

		$(".fit-width").css("font-size", size);
		
	},

	setPrior: function(hash){
		this.priorView.push(hash)
	},

	route: function() {
		var self = this;
		var hash = window.location.hash;

		if (!hash) {
			if (this.eventView) {
				this.slidePage(this.eventView);
			} else {
				this.eventView = new EventView(this.store.eventData()).render();
				this.slidePage(this.eventView);
			}
			return
		}

		//category view
		var match = hash.match(/^#merch\/(\d{1,})/);
		if (match && match[0] == window.location.hash) {
			self.slidePage(new CategoriesView(this.store.getCategories(Number(match[1]))).render())
			return
		}

		//merchlist view
		match = hash.match(/^#merch\/(\d{1,})\/(\d{1,})/)
		if (match && match[0] == window.location.hash){
			self.slidePage(new MerchListView(this.store.getMerchList(Number(match[1]), Number(match[2]))).render());
			return
		}

		//merchitem view
		match = hash.match(/^#merch\/(\d{1,})\/(\d{1,})\/(\d{1,})/)
		if (match && match[0] == window.location.hash){
			self.slidePage(new MerchItemView(this.store.getMerchItem(Number(match[1]), Number(match[2]), Number(match[3]))).render());
			return
		}

		var match = hash.match(/^#login\/(\d{1,})/);
		if (match && match[0] == window.location.hash) {
			self.slidePage(new LoginView().render())
			return
		}

		match = hash.match(/^#checkout\/(\d{1,})/)
		if (match && match[0] == window.location.hash){
			self.slidePage(new ccInfoView(self.store).render());
			return
		}
	
		match = hash.match(/^#cart\/(\d{1,})\/(\d{1,})\/(\d{1,})/)
		if (match && match[0] == window.location.hash){
			self.slidePage(new CartView(this.store.retrieveCart(Number(match[1]))).render());
			return
		}

		match = hash.match(/^#cart\/(\d{1,})\/(\d{1,})/)
		if (match && match[0] == window.location.hash){
			self.slidePage(new CartView(this.store.retrieveCart(Number(match[1]))).render());
			return
		}

		match = hash.match(/^#cart\/(\d{1,})/)
		if (match && match[0] == window.location.hash){
			self.slidePage(new CartView(this.store.retrieveCart(Number(match[1]))).render());
			return
		}

		match = hash.match(/^#addresses\/(\d{1,})\/billing|^#addresses\/(\d{1,})\/shipping/)
		if (match && match[0] == window.location.hash){
			self.slidePage(new AddressView(this.store.retrieveAddresses()).render());
			return
		}
		match = hash.match(/^#addresses\/(\d{1,})\/billing\/new|^#addresses\/(\d{1,})\/shipping\/new/)
		if (match && match[0] == window.location.hash){
			self.slidePage(new NewAddressView().render());
			return
		}

		match = hash.match(/^#addresses\/(\d{1,})\/billing\/edit\/(\d{1,})|^#addresses\/(\d{1,})\/shipping\/edit\/(\d{1,})/)
		if (match && match[0] == window.location.hash){
			var id = window.location.hash.split("/")[4]
			var address = self.store.retrieveAddress(id)
			self.slidePage(new EditAddressView(address).render());
			return
		}
alert("Failed to load page.\nReturning to Event Page")
		window.location.hash = ""
	},

    initialize: function() {
       	var self = this;
		this.priorView = []
		this._back = false;
		self.setPrior(window.location.hash)
       	this.registerEvents();
		this.ajax = new ajaxCalls();
       	this.store = new LocalStorageStore(function() {
			self.viewPrep();
       });
    }

};

app.initialize();