var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var InvoiceSchema = mongoose.Schema({
	ContractAddress: {
		type: String,		
	},
	Cost: {
		type: Number
	},
	Seller: {
		type: String
	},
	Buyer: {
		type: String
	},
	Status:{
		type: String
	}
});
	
var Invoice = module.exports = mongoose.model('if', InvoiceSchema);


module.exports.createMessage = function(newInvoice, callback){

	        newInvoice.save(callback);	
}

