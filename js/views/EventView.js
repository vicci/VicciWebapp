var EventView = function(data) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $("<div id='appwrapper'/>");
    };

    this.render = function() {
		var events = data.events;
		var header = headerHTML("events");
		var html = header + 
			"<div id='' class='content-wrapper'>" +
				"<ul class='event-list responsive'>"
		for (var i=0; i < events.length; i++) {
       		e = events[i];
			html += 
			"<li class='event-li'" +
			" style='background:url(" + e.eventImage + ") no-repeat center; -webkit-background-size:cover;" +
			"-moz-background-size:cover; -o-background-size:cover; background-size:cover;'>" +
			"<a href='#merch/" + e.eventId + "' class='event-click' >" +
				"<div class='event-info-wrapper'>" +
					"<h3 class='event-title indent'>" + 
						e.eventTitle + 
					"</h3>" + 
					"<div class='event-details-wrapper text-padding'>" +
						"<h4 class='event-address indent'>" + 
							e.place + 
						"</h4>" +
						"<h4 class='event-date-time indent'>" +
							"<span class='event-date'>" + 
								e.startDate + 
							"</span>" +
							"<span class='shop-icon'>Shop</span>" +
						"</h4>" +
					"</div>" +
				"</div>" +
				"</a>" +
			"</li>" 
		}
		html += "</ul>" +
			"</div>";

		this.el.html(html);
		return this;
    };


    this.initialize();

}
