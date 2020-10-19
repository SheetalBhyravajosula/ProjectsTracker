const TaskSchema = require("../schemas/tasksSchema");
const exists = "Exists";
const doesNotExist = "DoesNotExist";

exports.getTasks = function (callback) {
  TaskSchema.find({}, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
};

exports.createTask = function (task, callback) {
  TaskSchema.exists(
    {
      TaskDescription: task.taskDescription,
      TaskStartDate: task.taskStartDate,
      TaskEndDate: task.taskEndDate,
    },
    function (error, bool) {
      if (error) {
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        const new_task = new TaskSchema({
          TaskDescription: task.taskDescription,
          TaskType: task.taskType,
          Project: task.project,
          Employee: task.emp,
          TaskStartDate: task.taskStartDate,
          TaskEndDate: task.taskEndDate,
          Duration: task.duration,
        });
        new_task.save(function (err, saved) {
          if (err) {
            callback(false);
          } else {
            callback(saved);
          }
        });
      }
    }
  );
};

exports.deleteTask = function (taskDesc,startDate,endDate, callback) {
  if (startDate && endDate) {
    TaskSchema.findOneAndDelete(
      {
        TaskDescription: taskDesc,
        TaskEndDate: endDate,
        TaskStartDate: startDate,
      },
      function (err, result) {
        if (err) {
          callback(false);
        } else if(result==null){
            callback(doesNotExist)
        }else {
          callback(result);
        }
      }
    );
  } else {
    TaskSchema.findOneAndDelete(
      { TaskDescription: taskDesc },
      function (err, result) {
        if (err) {
          callback(false);
        } else if(result==null){
            callback(doesNotExist)
        } else {
          callback(result);
        }
      }
    );
  }
};

exports.modifyTask = function (updateTask,taskDesc,startDate,endDate,callback) {
  const modify_task = {
    TaskDescription: updateTask.taskDescription,
    TaskType: updateTask.taskType,
    Project: updateTask.project,
    Employee: updateTask.emp,
    TaskStartDate: updateTask.taskStartDate,
    TaskEndDate: updateTask.taskEndDate,
    Duration: updateTask.duration,
  };
  if (startDate && endDate) {
    TaskSchema.findOneAndUpdate(
      {
        TaskDescription: taskDesc,
        TaskEndDate: endDate,
        TaskStartDate: startDate,
      },
      modify_task,
      function (err, result) {
        if (err) {
          callback(false);
        } else if(result==null){
            callback(doesNotExist)
        }else {
          callback(result);
        }
      }
    );
  } else {
    TaskSchema.findOneAndUpdate(
      { TaskDescription: taskDesc },
      modify_task,
      function (err, result) {
        if (err) {
          callback(false);
        } else if(result==null){
            callback(doesNotExist)
        }else {
          callback(result);
        }
      }
    );
  }
};
