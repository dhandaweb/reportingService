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


// var dbConfig = {
//     user:  "sa",
//     password: "dhanda@123",
//     server: "LTNBN5CG6223WGN",
// 	database: "Reporting",
// 	options: {           
//         encrypt: false
//     }
// };

// var dbConfig = {
//     user:  "reporting",
//     password: "dhanda@123",
//     server: "reportingdatababse.database.windows.net",
// 	database: "Reporting",
// 	options: {           
// 		        encrypt: true
// 		    }
// };

// var dbConfig = {
//     user:  "tracoplug",
//     password: "dhanda@123",
//     server: "tracoplug.database.windows.net",
// 	database: "tracoplug",
// 	options: {           
// 		        encrypt: true
// 		    }
// };

var dbConfig = {
    user:  "DB_A4DC07_tracoplug_admin",
    password: "dhanda123",
    server: "sql5045.site4now.net",
	database: "DB_A4DC07_tracoplug",
	options: {           
		        encrypt: true
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
					res.status(500).send(err);
				}
				else {
					res.send(response);
				}
			});
		}
	});	
}

app.get('/api/hello', (req, res) => res.send('Hello World!'))

app.post("/api/finduser", (req, res) =>{
	var query = "SELECT * from [users] WHERE [userName] ='" + req.body.userName + "' AND [password]='" + req.body.password + "';";
	executeQuery(res, query);
});

app.post("/api/adduser", (req, res) =>{
	var query = "INSERT INTO [users] (firstName,lastName,groupId,role,userName,password,accountStatus) VALUES ('"+
	 req.body.firstName + "','" + req.body.lastName + "','" + req.body.groupId + "','" + req.body.role + "','" + req.body.userName + "','" + req.body.password + "','"+ req.body.accountStatus + "')";
	executeQuery(res, query);
});
app.post("/api/getuserList", (req, res) =>{
	var query = "SELECT * from [users] WHERE [groupId] ='" + req.body.groupId + "' AND [accountStatus]='1';";
	executeQuery(res, query);
});

app.get("/api/getuserList", (req, res) =>{
	var query = "SELECT * from [users] WHERE [groupId] ='" + 1 + "' AND [accountStatus]='1';";
	executeQuery(res, query);
});

app.post("/api/inActiveUser", (req, res) =>{
	var query = "UPDATE [users] SET accountStatus = 0 where id =  "+ req.body.id + ";";
	executeQuery(res, query);
});


//POST API
 app.post("/api/addDetails", function(req , res){
	var query = "INSERT INTO [candidates] (title,firstName,lastName,gender,"+
	"ethnicity,citizenship,workStatus,source,candidateStatus," +
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
	"userId,userGroupId" +
	 ") VALUES ('" + 
	 req.body.title + "','" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.gender + "','" + 
	 req.body.ethnicity + "','" + req.body.citizenship + "','"+ req.body.workStatus + "','"+ req.body.source + "','" + req.body.candidateStatus + "','" +
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
	 req.body.userId + "','" + req.body.userGroupId + 
	 "')";

	 console.log(query);
	executeQuery (res, query);
});

app.post("/api/updateDetails", function(req , res){
	var query = "UPDATE [candidates] SET "+
	"title = '" + req.body.title + "' ,"+
	"firstName = '" + req.body.firstName + "' ,"+
	"lastName = '" + req.body.lastName + "' ,"+
	"gender = '" + req.body.gender + "' ,"+
	"ethnicity = '" + req.body.ethnicity + "' ,"+
	"citizenship = '" + req.body.citizenship + "' ,"+
	"workStatus = '" + req.body.workStatus + "' ,"+
	"source = '" + req.body.source + "' ,"+
	"candidateStatus = '" + req.body.candidateStatus + "' ,"+
	"currentEmployer = '" + req.body.currentEmployer + "' ,"+
	"primarySkill = '" + req.body.primarySkill + "' ,"+
	"salaryMin = '" + req.body.salaryMin + "' ,"+
	"salaryMax = '" + req.body.salaryMax + "' ,"+
	"workExpMin = '" + req.body.workExpMin + "' ,"+
	"workExpMax = '" + req.body.workExpMax + "' ,"+
	"address = '" + req.body.address + "' ,"+
	"city = '" + req.body.city + "' ,"+
	"state = '" + req.body.state + "' ,"+
	"country = '" + req.body.country + "' ,"+
	"client = '" + req.body.client + "' ,"+
	"hiringManager = '" + req.body.hiringManager + "' ,"+
	"jobTitle = '" + req.body.jobTitle + "' ,"+
	"jobType = '" + req.body.jobType + "' ,"+
	"jobCategory = '" + req.body.jobCategory + "' ,"+
	"jobAddress = '" + req.body.jobAddress + "' ,"+
	"jobCity = '" + req.body.jobCity + "' ,"+
	"jobState = '" + req.body.jobState + "' ,"+
	"jobCountry = '" + req.body.jobCountry + "' ,"+
	"offerStatus = '" + req.body.offerStatus + "' ,"+
	"jobOpenedDate = '" + req.body.jobOpenedDate + "' ,"+
	"cvSubmissionDate = '" + req.body.cvSubmissionDate + "' ,"+
	"offerDate = '" + req.body.offerDate + "' ,"+
	"joiningDate = '" + req.body.joiningDate + "' ,"+
	"recruiter = '" + req.body.recruiter + "' ,"+
	"cre = '" + req.body.cre + "' ,"+
	"accountManager = '" + req.body.accountManager + "' ,"+
	"accountDirector = '" + req.body.accountDirector + "' ,"+
	"countryManager = '" + req.body.countryManager + "' ,"+
	"team = '" + req.body.team + "' ,"+
	"geo = '" + req.body.geo + "' ,"+
	"commissionAmount = '" + req.body.commissionAmount + "' ,"+
	"commissionStatus = '" + req.body.commissionStatus + "' ,"+
	"commissionDate = '" + req.body.commissionDate + "' ,"+
	"netRevenue = '" + req.body.netRevenue + "' ,"+
	"pipelineType = '" + req.body.pipelineType + "' ,"+
	"invoiceType = '" + req.body.invoiceType + "' ,"+
	"invoiceNo = '" + req.body.invoiceNo + "' ,"+
	"gst = '" + req.body.gst + "' ,"+
	"invoiceAmount = '" + req.body.invoiceAmount + "' ,"+
	"orderBookAmount = '" + req.body.orderBookAmount + "' ,"+
	"orderBookDate = '" + req.body.orderBookDate + "' ,"+
	"revenueRealizationDate = '" + req.body.revenueRealizationDate + "' ,"+
	"revenueAmount = '" + req.body.revenueAmount + "' ,"+
	"updatedDate = '" + req.body.updatedDate + "'"+
	"WHERE [userGroupId] ='" + req.body.userGroupId + "' AND [userId]='" + req.body.userId + "' AND [id]="+  req.body.id +";";

	 console.log(query);
	executeQuery (res, query);
});

app.post("/api/getDetails", (req, res) =>{
	var query = "SELECT * from [candidates] WHERE [userGroupId] ='" + req.body.userGroupId + "' AND [userId]='" + req.body.userId + "' ORDER BY ID DESC;";
	executeQuery(res, query);
});

app.post("/api/deleteDetails", (req, res) =>{
	var query = "DELETE from [candidates] WHERE [userGroupId] ='" + req.body.userGroupId + "' AND [userId]='" + req.body.userId + "' AND [id]='"+  req.body.id +"';";
	executeQuery(res, query);
});

//PUT API
//  app.put("/api/user/:id", function(req , res){
// 	var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
// 	executeQuery (res, query);
// });

// // DELETE API
//  app.delete("/api/user/:id", function(req , res){
// 	var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
// 	executeQuery (res, query);
// });


app.post("/api/addOption", (req, res) =>{
	var query = "INSERT INTO " + req.body.tableName + " (sortId, label) VALUES (" + req.body.sortId + ", '"  + req.body.label + "')";
	executeQuery(res, query);
});

app.post("/api/getOption", (req, res) =>{
	var query = "SELECT * from [" + req.body.tableName  + "]" + " ORDER BY id DESC;";
	executeQuery(res, query);
});

app.post("/api/deleteOption", (req, res) =>{
	var query = "DELETE FROM [" + req.body.tableName  + "] where id= " + req.body.id+ ";";
	console.log(query);
	executeQuery(res, query);
});

app.post("/api/updateOption", (req, res) =>{
	var query = "Update [" + req.body.tableName  + "] set label = '" + req.body.label + "' where id= " + req.body.id+";";
	console.log(query);
	executeQuery(res, query);
});


app.post("/api/getClientList", (req, res) =>{
	var query = "SELECT * from [clients] where userGroupId= " + req.body.userGroupId+ " ORDER BY id DESC;";
	executeQuery(res, query);
});

app.post("/api/addClient", (req, res) =>{
	var query = "INSERT INTO [clients] (name, description,userGroupId,status) VALUES ('" + req.body.name + "', '"  + req.body.description + "', '"  + req.body.userGroupId + "', "  + req.body.status + ")";
	console.log(query);
	executeQuery(res, query);
});

app.post("/api/addHiringManager", (req, res) =>{
	var query = "INSERT INTO [hiringManagerList] (name, client,status) VALUES ('" + req.body.name + "', "  + req.body.client + ", "  + req.body.status + ")";
	console.log(query);
	executeQuery(res, query);
});

app.post("/api/getHiringManagerList", (req, res) =>{
	var query = "SELECT * from [hiringManagerList]  where client= " + req.body.client+ " ORDER BY id DESC;";
	console.log(query);
	executeQuery(res, query);
});

app.post("/api/deleteHiringManager", (req, res) =>{
	var query = "DELETE FROM [hiringManagerList]  where id= " + req.body.id+ ";";
	console.log(query);
	executeQuery(res, query);
});

app.post("/api/updateHiringManager", (req, res) =>{
	var query = "Update [hiringManagerList] set name = '" + req.body.name + "' where id= " + req.body.id+ ";";
	console.log(query);
	executeQuery(res, query);
});

app.post("/api/deleteHiringManagerbyClient", (req, res) =>{
	var query = "DELETE FROM [hiringManagerList]  where client= " + req.body.id+ ";";
	console.log(query);
	executeQuery(res, query);
});

app.post("/api/deleteClient", (req, res) =>{
	var query = "DELETE FROM [clients]  where id= " + req.body.id+ ";";
	console.log(query);
	executeQuery(res, query);
});