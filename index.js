var express = require('express');
var path = require('path');
var app = express(); 
var UserDAO = require('./model/dao/UserDAO.js');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	//we will put this into route.js once this is working
	if (request.body.inputEmail && request.body.inputPassword){
		var userId = request.body.inputEmail;
		var userPwd = request.body.inputPassword;
		UserDAO.validate(userId, userPwd, 
			function(v){
				if (v){
					response.send('yes, you are an exting user');
				} else {
					response.send('No, you dont exist');
				}
			});
	} else {
		response.sendFile(path.join(__dirname + '/index.html'));
	}
});

// Should define a regex here so that we can send whenever asked for user collection
app.get('/user', function(request, response) {
  response.send('user_collection');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.post('/', function(req, res){
  var userName = req.body.inputEmail;
  var html = 'Hello: ' + userName + '.<br>' +
             '<a href="/">Try again.</a>';
  res.send(html);
});