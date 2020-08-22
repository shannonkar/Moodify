const express = require('express'); // Express web server framework
const cors = require('cors')
const app = express();
const path = require("path");
const port = process.env.PORT || 8888;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
console.log('Listening on PORT');
app.listen(port);