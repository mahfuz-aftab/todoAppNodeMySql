var express = require('express');
var bodyParser = require('body-parser');
var taskController = require('./app/task/taskController');
var connection = require('./app/lib/database').connection;

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api/v1.0/task', taskController.createTask);
app.get('/api/v1.0/task', taskController.getTask);
app.get('/api/v1.0/task/id/:taskId', taskController.getTaskById);
app.put('/api/v1.0/task/id/:taskId', taskController.updateTaskById);
app.delete('/api/v1.0/task/id/:taskId', taskController.deleteTaskById);



app.listen(1337, function() {
  console.log("Server strated on port: 1317");
});
