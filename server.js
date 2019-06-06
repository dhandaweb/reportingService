//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express();

// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var dbConfig = {
    user:  "sa",
    password: "dhanda@123",
    server: "LTNBN5CG6223WGN",
	database: "Reporting",
	options: {           
        encrypt: false
    }
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){	
	sql.connect(dbConfig, function (err) {
		if (err) {   
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(query, function (err, response) {
				if (err) {
					console.log("Error while querying database :- " + err);
					res.send(err);
				}
				else {
					res.send(response);
				}
			});
		}
	});	
}

app.get('/', (req, res) => res.send('Hello World!'))

app.post("/api/finduser", (req, res) =>{
	var query = "SELECT * from [Users] WHERE [UserName] ='" + req.body.username + "' AND [Password]='" + req.body.password + "';";
	executeQuery(res, query);
});

app.post("/api/getuserList", (req, res) =>{
	var query = "SELECT * from [Users] WHERE [UserGroup] ='" + req.body.usergroup + "';";
	executeQuery(res, query);
});

//POST API
 app.post("/api/addDetails", function(req , res){
	var query = "INSERT INTO [Details] (title,firstName,lastName,gender,"+
	"ethnicity,citizenship,workStatus,source," +
	"currentEmployer,primarySkill,salaryMin,salaryMax,workExpMin,workExpMax," +
	"address,city,state,country," +
	"client,hiringManager,jobTitle,jobType,jobCategory," +
	"jobAddress,jobCity,jobState,jobCountry," +
	"offerStatus,jobOpenedDate,cvSubmissionDate,offerDate,joiningDate," +
	"recruiter,cre,accountManager,accountDirector," +
	"countryManager,team,geo," +
	"commissionAmount,commissionStatus,commissionDate,netRevenue," +
	"pipelineType,invoiceType,invoiceNo,gst,billingAmount," +
	"invoiceAmount,orderBookAmount,orderBookDate,revenueRealizationDate,revenueAmount," +
	"createdDate,updatedDate," +
	"UserId,UserGroup" +
	 ") VALUES ('" + 
	 req.body.title + "','" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.gender + "','" + 
	 req.body.ethnicity + "','" + req.body.citizenship + "','"+ req.body.workStatus + "','"+ req.body.source + "','" +
	 req.body.currentEmployer + "','" + req.body.primarySkill + "','"+ req.body.salaryMin + "','"+ req.body.salaryMax + "','" + req.body.workExpMin + "','"+ req.body.workExpMax + "','" +
	 req.body.address + "','" + req.body.city + "','"+ req.body.state + "','"+ req.body.country + "','" +
	 req.body.client + "','" + req.body.hiringManager + "','"+ req.body.jobTitle + "','"+ req.body.jobType + "','" + req.body.jobCategory + "','" +
	 req.body.jobAddress + "','" + req.body.jobCity + "','"+ req.body.jobState + "','"+ req.body.jobCountry + "','" +
	 req.body.offerStatus + "','" + req.body.jobOpenedDate + "','"+ req.body.cvSubmissionDate + "','"+ req.body.offerDate + "','" + req.body.joiningDate + "','" +
	 req.body.recruiter + "','" + req.body.cre + "','" + req.body.accountManager + "','" + req.body.accountDirector + "','" + 
	 req.body.countryManager + "','" + req.body.team + "','" + req.body.geo + "','" + 
	 req.body.commissionAmount + "','" + req.body.commissionStatus + "','" + req.body.commissionDate + "','" + req.body.netRevenue + "','" + 
	 req.body.pipelineType + "','" + req.body.invoiceType + "','"+ req.body.invoiceNo + "','"+ req.body.gst + "','" + req.body.billingAmount + "','" +
	 req.body.invoiceAmount + "','" + req.body.orderBookAmount + "','"+ req.body.orderBookDate + "','"+ req.body.revenueRealizationDate + "','" + req.body.revenueAmount + "','" +
	 req.body.createdDate + "','" + req.body.updatedDate + "','" +
	 req.body.UserId + "','" + req.body.UserGroup + 
	 "')";

	 console.log(query);
	executeQuery (res, query);
});


app.post("/api/getDetails", (req, res) =>{
	var query = "SELECT * from [Details] WHERE [UserGroup] ='" + req.body.UserGroup + "' AND [UserId]='" + req.body.UserId + "';";
	executeQuery(res, query);
});

//PUT API
 app.put("/api/user/:id", function(req , res){
	var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
	executeQuery (res, query);
});

// DELETE API
 app.delete("/api/user/:id", function(req , res){
	var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
	executeQuery (res, query);
});
