/* The values of the login mask. */
var company        = '';
var login          = '';
var pass           = '';

/* Output paths, making them absolute simplifies systemd/cron calls. */
var downloadPath   = 'Abrechnungen/';
var logPath        = 'log/';
var jqueryFilePath = 'jquery.min.js';

var casper = require('casper').create({
    clientScripts: [jqueryFilePath],
	pageSettings: {
        webSecurityEnabled: false
    }
});

casper.start();

casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
});

casper.thenOpen('https://www.adpworld.de', {
    headers: {
        'Accept-Language': 'en'
    }
}, function() {
    this.echo('First Page: ' + this.getTitle());
    this.evaluate(function(c,l,p){
			$("#company").val(c);
			$("#login").val(l);
			$("#login-pw").val(p);
			$('button:contains("Log In")').trigger('click');
    }, company, login, pass);
    casper.page.render(logPath + 'adp_login.png');
});

casper.wait(5000);

casper.thenOpen('https://www.adpworld.de/wps/myportal/ADPWorld/Applications/Archiv/ePayslip', {
    headers: { 
        'Accept-Language': 'en'
    }
}, function() {
	 this.echo('Second Page: ' + this.getTitle());
	 casper.page.render(logPath + 'adp_ePayslip.png');
	 var files = this.evaluate(function(){
		var result = [];
		$("a").each(function() {
			if($(this).parent().prop("tagName") == 'TD') {
				result.push({
					link: this.href,
					name: $(this).parent().parent().children('td').eq(4).text(),
					date: $(this).parent().parent().children('td').eq(5).text()
				});
			}
		});
		return result;
	});
	
	/** Reversed traversal so that file creation dates are in order.  **/ 
	for (var i = files.length - 1; i >= 0; i--) {
		var file = files[i];
		var fileName = (file.name + ' ' + file.date + '.pdf').replace(/[\\/:"*?<>|]/g, '');
		this.echo('Downloading: ' + fileName);
		this.download(file.link, downloadPath + fileName);
	}	 
});

casper.run();
