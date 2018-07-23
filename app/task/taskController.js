var connection = require('../lib/database').connection;

module.exports = {

  createTask: function(req, res) {
    var requestData = req.body;
    console.log(requestData);

    if (!requestData.taskMsg) {
      return res.status(400).json({
        code: "Creation Failed",
        message: "Task not available"
      })
    }

    var taskData = {
      taskMsg: requestData.taskMsg,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    connection.query('INSERT INTO task SET?', taskData, function(err, result, fields) {

      if (err) {
        //console.log(err);
        return res.status(500).json({
          code: 'taskCreation Failed',
          message: "Error!!!"
        })
      }
      //console.log(res);
      return res.status(200).json({
        code: 'taskCreated',
        message: "Successful"
      });
    });
  },

  getTask: function(req, res) {
    connection.query('SELECT * FROM task', function(err, result, fields) {

      if (err) {
        //console.log(err);
        return res.status(500).json({
          code: 'task not found',
          message: "Error!!!"
        })
      }
      //console.log(res);
      return res.status(200).json({
        code: 'taskfound',
        data: result
      });
    });
  },

  getTaskById: function(req, res) {

    var taskId = req.params.taskId;
    console.log(taskId);

    connection.query('SELECT * FROM task WHERE id=?', [taskId], function(err, result, fields) {

      if (err) {
        //console.log(err);
        return res.status(500).json({
          code: 'task not found',
          message: "Error!!!"
        })
      }
      if (result.length === 0) {
        //console.log(res);
        return res.status(404).json({
          code: 'taskIDNotfound',
          message: 'Task ID not found'
        });
      }
      //console.log(res);
      return res.status(200).json({
        code: 'taskIDfound',
        data: result
      });
    });
  },

  updateTaskById: function(req, res) {

    var taskId = req.params.taskId;

    var requestData = req.body;

    if (!requestData.taskMsg) {
      //console.log(res);
      return res.status(400).json({
        code: 'task Update Failed',
        message: 'Task Msg not found'
      });
    }

    connection.query('SELECT * FROM task WHERE id=?', [taskId], function(err, result, fields) {

      if (err) {
        //console.log(err);
        return res.status(500).json({
          code: 'task Update Not done',
          message: "Error Accessing DB!!!"
        })
      }

      if (result.length === 0) {
        //console.log(res);
        return res.status(500).json({
          code: 'task Update Failed',
          message: 'No Task Saved with this ID'
        });
      }

      connection.query('UPDATE task SET taskMsg=?, updatedAt=? where id=?', [requestData.taskMsg, new Date(), taskId], function(err, result, fields) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            code: 'task Update Not done',
            message: "Error During Update!!!"
          })
        }
        return res.status(200).json({
          code: 'taskUpdated'
        });

      })
    });
  },

  deleteTaskById: function(req, res) {

    var taskId = req.params.taskId;

    var requestData = req.body;

    connection.query('SELECT * FROM task WHERE id=?', [taskId], function(err, result, fields) {

      if (err) {
        //console.log(err);
        return res.status(500).json({
          code: 'task Delete Not done',
          message: "Error Accessing DB!!!"
        })
      }

      if (result.length === 0) {
        //console.log(res);
        return res.status(500).json({
          code: 'task Delete Failed',
          message: 'No Task Saved with this ID'
        });
      }

      connection.query('DELETE FROM task WHERE id=?', [taskId], function(err, result, fields) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            code: 'task Update Not done',
            message: "Error During Deleting!!!"
          })
        }
        return res.status(200).json({
          code: 'taskDeletedted'
        });

      })
    });
  }
};
