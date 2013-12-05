var ajaxCalls = function(successCallback, errorCallback) {

	this.lastEventListUpdate = ""
	this.api_eventList = "http://api.getvicci.com/api/event/event_lists"
	this.api_eventDetails = "http://api.getvicci.com/api/event/event_details"
	this.api_payment = "http://api.getvicci.com/api/payment/pay"
	this.api_login = "http://api.getvicci.com/api/user/login"

	this.getEventList = function(callback){
		$.ajax({
				type: 'POST',
				data: {lastUpdatedTime: this.lastEventListUpdate},
				url: this.api_eventList,
				success: function(json) {
					window.localStorage.setItem("events", JSON.stringify(json));
					this.lastEventListUpdate = json.lastUpdatedTime
					if (callback) {
						callback()
					}
				},
				error: function(e) {
				   console.log(e.message);
				}
		});
	}
	
	this.getEventDetails = function(id, callback){
		var self = this
		$.ajax({
				type: 'POST',
				data: {eventId: id, lastUpdatedTime: this.lastEventListUpdate},
				url: this.api_eventDetails,
				success: function(json) {
					window.localStorage.setItem(id, JSON.stringify(json))
				
					var merchList = self.makeMerchLists(json, id)
					this.lastEventListUpdate = json.lastUpdatedTime
					if (callback) {
						callback()
					}
				},
				error: function(e) {
				   console.log(e.message);
				}
		});
	}

	this.makeMerchLists = function(json, eventid){
		var ml = []

		var cat = json.categories
		for (var i = 0; i < cat.length; i++){
			var items = cat[i].items
			for (var x = 0; x < items.length; x++){
				ml.push(items[x])
			}

			window.localStorage.setItem(eventid+cat[i].categoryId, JSON.stringify(ml))
			ml = []
		}
	}

	this.login = function(json, callback){
		$.ajax({
				type: 'POST',
				data: json,
				url: this.api_login,
				success: function(response) {
					var rc = response.resultCode
console.log(response)
					if (rc == 0){
						if (response.sessionId){
							window.localStorage.setItem("sessionid", JSON.stringify(response.sessionId))
							window.localStorage.setItem("customerid", JSON.stringify(response.customerId))
							callback()
						}else{
							alert(response.resultString + "\nYou may need to check spam folder.")
							$("#loginlabel").trigger("click")
						}
					}
					else if (rc == 2){
						if (response.resultString === "Your account is not yet verified. Please check your inbox.")
							alert(response.resultString + "\nConfirmation may be in spam folder.")
					}
					else
						alert("There was a problem logging in. Try again")
				},
				error: function(e) {
				   console.log(e.message);
				}
		});
	}

	this.processTransaction = function(json, successCallback, errorCallback){
		$.ajax({
				type: 'POST',
				data: json,
				url: this.api_payment,
				success: function(response) {
console.log(response)

					if (response.resultCode = 0){
						successCallback()
					}else{
						errorCallback()
						alert(response.resultString)
						ga('send', 'event', 'failed transaction', 'click', response.resultString)
					}

				},
				error: function(e) {
				   console.log(e.message);
				}
		});
	}

	this.getEventList(successCallback)
}