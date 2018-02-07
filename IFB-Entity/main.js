var express = require('express');
var app = express();
var Model = require('./models/user');
var util=require('util');
app.use(express.static('public'));
var server = app.listen(8084, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})


var io=require('socket.io').listen(server);







io.sockets.on('connection',function(socket){
		
	socket.on('send invoice',function(data){
		var MongoClient = require('mongodb').MongoClient;					
		var url = "mongodb://localhost:27017/IFB";
		MongoClient.connect(url, function(err, db) {		
			if (err) throw err;
			var myobj = new Model({	
			ContractAddress: data.ca,
			Cost: data.cost,
            Seller:data.seller,
			Buyer:data.buyer,
			Status:data.status1
		});
			db.collection("if").insertOne(myobj, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted");
			db.close();
			});
		});
		
		  	
	});	
	
});







