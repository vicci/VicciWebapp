var MerchListView = function(merch) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $("<div id='appwrapper'/>");
//console.log(merch)
    };

    this.render = function() {
		var merchandise = merch;
		var header = headerHTML("merchlist", merch);
		var html = 
			"<div id='' class='content-wrapper'>" +
				header + 
				"<ul class='merch-list'>"

		for (var i=0; i < merchandise.length; i++) {
       		m = merchandise[i];
			html += 
			"<li id='" + m.itemId + "' class='merch-li'" +
			" style='background:url(" + m.itemImage + ") no-repeat center; -webkit-background-size:cover;" +
			"-moz-background-size:cover; -o-background-size:cover; background-size:cover;'>" +
				"<div id='" + m.itemId + "' class='merch-details-wrapper text-padding'>" +
					"<h4 id='" + m.itemId + "' class='merch-title'>" +
						m.itemName +
					"</h4>" +
					"<h4 id='" + m.itemId + "' class='merch-price indent'>$" + 
						m.itemPrice + 
					"</h4>"
				"</div>" +
			"</li>"
		}

		html += "</ul>" +
			"</div>"		

		this.el.html(html);
		return this;
    };

	this.screenWidth = function(){
		return ($(window).width()/2) - 1
	}


    this.initialize();

}
