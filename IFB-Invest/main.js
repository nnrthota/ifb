var express = require('express');
var app = express();
var path = require('path');
var Model = require('./models/user');
app.use(express.static('public'));
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/IFB";
var util=require('util');
var io=require('socket.io').listen(server);
var bodyParser = require('body-parser');
var resultInvoice = [];

//Bodey Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');
//end view Engine for handlebars

var server = app.listen(8085, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})


app.get('/', function (req, res) {
   res.render( 'invest' );
})
app.post('/invoices/search', function(req,res){
  var result = [];
MongoClient.connect(url, function(err, db) {
  var qselect = req.body.search_categories;
  if (qselect=='Seller')
    var query = { 'Seller': req.body.searchValue };
    else if(qselect=='Buyer')
      var query = { 'Buyer': req.body.searchValue };
      else if(qselect=='Cost')
        var query = { 'Cost': req.body.searchValue };
        else if(qselect=='Status')
          var query = { 'Status': req.body.searchValue };
          else if(qselect=='')
            var query = {};
var cursor = db.collection('if').find(query);
  cursor.forEach(function(doc, err) {
    result.push(doc);
  }, function() {
    db.close();
        res.render('dashboard', {invoices: result});
  });
          });
});
app.get('/dashboard', function (req, res) {
// var resultInvoices = [];
	//MongoClient.connect(url, function(err, db) {
	//var cursor = db.collection('if').find();
  //  cursor.forEach(function(doc, err) {
  //  resultInvoices.push(doc);
  //}, function() {
  //  db.close();
  //res.render('dashboard', {invoices: resultInvoice});
  res.render('dashboard');
    //});
						//});

});


// socket chat

var io=require('socket.io').listen(server);
var users=[];
var connections=[];
io.sockets.on('connection',function(socket){
	connections.push(socket);
	util.log('one socket connected: %s sockets connected', connections.length);

	//Disconnect
	socket.on('disconnect', function (data) {
		users.splice(users.indexOf(socket.username),1);
		updateUsernames();
		connections.splice(connections.indexOf(socket),1);
	util.log('one socket Disconnected: %s sockets connected', connections.length);
	});
	// Send Message
	socket.on('send address',function(data){
	if(data!==''){

			io.sockets.emit('new address', {address:data.address, user: socket.username} );
			console.log(socket.username+'sadfgsdf');
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var myquery = { "ContractAddress": data.address };
              var newvalues =  {$set:{ "Status":data.newstatus } };
              db.collection("if").update(myquery, newvalues );
      });
	}
	});

	// new user
	socket.on('new user',function(data, callback){

		if(data==''){
			callback(false);
		}else {
				callback(true);
				socket.username=data;
				users.push(socket.username);
				updateUsernames();
		}

	});
	function updateUsernames(){
		io.sockets.emit('get users', users);
	}
});
