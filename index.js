var express = require('express');
var mysql = require('mysql');
var path = require('path');
var app = express();
var mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'name',
    password: 'password',
    database: 'motoqdb'
});

// Make a route to serve files
app.use(express.static(path.join(__dirname, 'public')));

// API that uses URL query string parameters to search quotes in the #moto quote database
app.get("/api", function(req, res){
    var search = "%" + req.query.search + "%";
    var queryString = "SELECT * FROM quotes WHERE title LIKE ? OR quote LIKE ? ORDER BY RAND() LIMIT 1";
    //var queryString =  mysql.format(queryString, search);
    mysqlPool.getConnection(function(err, connection){
        if (err) throw err;
        connection.query(queryString, [search, search], function(err, rows, fields){
            if (!err) {
                res.send('<xmp>' + JSON.stringify(rows[0], null, 2) + '</xmp>');
                connection.release();
            }else { 
                console.log('Error while performing Query.');
                connnection.release();
            }
         });
    });
   
});

app.set('port', process.env.PORT || 4000);

// Start listening for HTTP requests
var server = app.listen(app.get('port'), function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s\nPress ctrl^c to stop the app.', host, port);          
});

