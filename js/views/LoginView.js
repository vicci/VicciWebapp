var LoginView = function() {

    this.initialize = function() {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $("<div id='appwrapper'/>");
    };

    this.render = function() {
		var header = headerHTML("login");

		var html = 
			"<div id='login-content-wrapper' class='content-wrapper'>" +
				header +		
				
				"<fieldset class='pw'>  " +
					"<p>" +
						"<span class='vicciorange'>To provide access to this exclusive merchandise and process your order, we need to authenticate your preferred e-mail address:</span>" +			
						"<span class=''>1) Sign Up with email/password. (Use the form below)</span>" +	
						"<span class=''>2) Go to your e-mail inbox and open the confirmation e-mail from 'Vicci Admin;' Click link in the e-mail to authenticate.</span>" +	
						"<span class=''>3) Click on the 'Sign In' button, and use your preferred e-mail/password.</span>" +	
					"</p>" +
					"<div id='styled-password-input'>" +
						"<input class='login' placeholder='EMAIL' type='text' id='emailinput' name='email' />"  +
					"</div>" +
					"<div id='styled-password-input'>" +
						"<img id='pw-image' src='img/eyeopen.png' title='Show Password'/>" +
						"<input class='login' placeholder='PASSWORD' type='password' id='passwordinput' name='password' />" +
					"</div>" +
					"<div id='signin-button-container'>" +
						"<button id='login-button' class='page-button up' type='button'>Sign Up</button>" +						
						"<span id='loginlabel' val='0' class='' title='Click if you already have an account'>[existing user]</span>" +
					"</div>" +
				"</fieldset>" + 
			"</div>"

		this.el.html(html);
		return this;
    };

	
    this.initialize();

}// JavaScript Document{