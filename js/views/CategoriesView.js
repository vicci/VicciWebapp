var CategoriesView = function(data) {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $("<div id='cat-view-wrapper' class='appwrapper'/>");
    };

    this.render = function() {
		var header = headerHTML("categories");
		var html = 
			"<div id='cat-content-wrapper' class='content-wrapper'>" +
				header + 
				"<ul class='category-list responsive'>"
		for (var i=0; i < data.length; i++) {
       		c = data[i];
			html += 
			"<li class='category-li'" +
			" style='background:url(" + c.categoryImage + ") no-repeat center; -webkit-background-size:cover;" +
			"-moz-background-size:cover; -o-background-size:cover; background-size:cover;'>" +
				"<a href='#merch/" + window.location.hash.split("/")[1] + "/" + c.categoryId + "' class='category-click' >" +
					"<div class='title-banner'>" +
						"<h4 class=''>" + 
							c.categoryName + 
						"</h4>" +
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
