var LocalStorageStore = function(successCallback, errorCallback) {

	this.eventData = function(callback){
		var events = JSON.parse(window.localStorage.getItem("events"))
		return events
	}

	this.getMerchList = function(eventid, catid){
		return JSON.parse(window.localStorage.getItem(String(eventid)+catid));
	}

	this.getCategories = function(eventid){
		return JSON.parse(window.localStorage.getItem(eventid)).categories;
	}

	this.getMerchItem = function(eventid, catid, id){
		var ml = this.getMerchList(eventid, catid);
		return jQuery.grep(ml, function(element, index){
			return element.itemId == id
		})[0];
	}

    this.findById = function(id, callback) {
        var events = JSON.parse(window.localStorage.getItem("events"));
        var ev = null;
        var l = events.length;
        for (var i=0; i < l; i++) {
            if (events[i].id === id) {
                ev = events[i];
                break;
            }
        }
        callLater(callback, ev);
    }

	this.deleteCart = function(eventid){
		window.localStorage.removeItem(eventid + "cart")
	}

	this.addToCart = function(eventid, merchItem) {
		var cart = []
		var cartid = eventid + "cart"
		var items = JSON.parse(window.localStorage.getItem(cartid))

		if (items){
			var add = true

			for (var i = 0; i < items.length; i++){
				if (items[i].itemId == merchItem.itemId && items[i].itemSize == merchItem.itemSize){
					items[i].quantity = Number(items[i].quantity) + Number(merchItem.quantity)
					add = false
					break
				}
			}

			if (add)
				items.push(merchItem)

			cart = items
		}else{
			cart.push(merchItem)
		}
		window.localStorage.setItem(cartid, JSON.stringify(cart))
	}

	this.removeFromCart = function(eventid, cartItemId) {
		var items = this.retrieveCart(eventid)

		for (var i = 0; i < items.length; i++){
			if (items[i].cartItemId == cartItemId){
				var deleted = items[i]
				items.splice(i, 1)
				break
			}
		}

		window.localStorage.setItem(eventid+"cart", JSON.stringify(items))
		return deleted
	}

	this.updateCartItemQuantity = function(eventid, cartItemId, quantity){
		var cart = this.retrieveCart(eventid)
		console.log(cart)

		for (var i = 0; i < cart.length; i++){
			if (cart[i].cartItemId == cartItemId){
				cart[i].quantity = quantity
				break
			}
		}
		window.localStorage.setItem(eventid+"cart", JSON.stringify(cart))
	}

	this.retrieveCartItem = function(eventid, cartItemId){
		var cart = this.retrieveCart(eventid)
		
		for (var i = 0; i < cart.length; i++){
			if (cart[i].cartItemId == cartItemId){
				return cart[i]
			}
		}
	}
	
	this.retrieveCart = function(eventid) {
		return JSON.parse(window.localStorage.getItem(eventid+"cart"))
	}

	this.retrieveAddresses = function(eventid) {
		return JSON.parse(window.localStorage.getItem("addresses"))
	}


	this.addAddress = function(address){
		var addresses = []
		var stored = JSON.parse(window.localStorage.getItem("addresses"))
	
		if (stored){
			address.addressid = stored.length + 1 
			stored.push(address)
			addresses = stored
		}else{
			address.addressid = 1
			addresses.push(address)
		}

		window.localStorage.setItem("addresses", JSON.stringify(addresses))
	}

	this.changeAddress = function(id, address){
		var addresses = JSON.parse(window.localStorage.getItem("addresses"))
		address.addressid = id

		if (addresses){
			for (var i = 0; i < addresses.length; i++){
				if (addresses[i].addressid == id){
					addresses[i] = address
					break;
				}
			}
		}
		window.localStorage.setItem("addresses", JSON.stringify(addresses))
	}

	this.retrieveAddress = function(id) {
		var addresses = JSON.parse(window.localStorage.getItem("addresses"))

		if (addresses){
			for (var i = 0; i < addresses.length; i++){
				if (addresses[i].addressid == id){
					return addresses[i]
				}
			}
		}
	}

	this.setAddress = function(type, address){
		if (type === "billing"){
			window.localStorage.setItem("billingaddress", JSON.stringify(address))
		}else if (type === "shipping"){
			window.localStorage.setItem("shippingaddress", JSON.stringify(address))
		}
	}

	this.deleteAddress = function(id){
		var addresses = this.retrieveAddresses()

		for (var i = 0; i < addresses.length; i++){
			if (addresses[i].addressid == id){
				var deleted = addresses[i]
				addresses.splice(i, 1)
				break
			}
		}

		window.localStorage.setItem("addresses", JSON.stringify(addresses))
		return deleted
	}

	this.deleteAddresses = function(){
		window.localStorage.removeItem("addresses")
	}

	this.getCheckoutAddress = function(request){
		var response = {};
		if (request === "billing"){
			//JSON.parse(window.localStorage.getItem("billingaddress"));
			response = JSON.parse(window.localStorage.getItem("billingaddress"))
		}else if (request === "shipping"){
			response = JSON.parse(window.localStorage.getItem("shippingaddress"))
		}else{
			var bill = JSON.parse(window.localStorage.getItem("billingaddress"))
			var ship = JSON.parse(window.localStorage.getItem("shippingaddress"))

			if (bill == null || ship == null)
				return null

			response.billingAddress = bill
			response.shippingAddress = ship
		}

		return response
	}

	this.clearCheckoutAddress = function(){
		window.localStorage.removeItem("billingaddress")
		window.localStorage.removeItem("shippingaddress")
	}

	this.getSessionId = function(){
		return JSON.parse(window.localStorage.getItem("sessionid"))
	}

	this.getCustomerId = function(){
		return JSON.parse(window.localStorage.getItem("customerid"))
	}

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }
	//window.localStorage.removeItem("billingaddress")
//window.localStorage.removeItem("shippingaddress")
//window.localStorage.removeItem("sessionid")
//window.localStorage.removeItem("customerid")
//window.localStorage.removeItem("addresses")
	//window.localStorage.clear()


	this.ajax = new ajaxCalls(successCallback)
	//callLater(successCallback)
}