const TaskSchema = require("../schemas/tasksSchema");
const TaskTypeSchema = require("../schemas/taskTypeSchema");
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

exports.getTaskTypes = function (callback) {
  TaskTypeSchema.find({}, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
};

exports.createTaskType = function (taskType, callback) {
  TaskTypeSchema.exists(
    {
      _id: taskType._id
    },
    function (error, bool) {
      if (error) {
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        const new_taskType = new TaskTypeSchema({
          _id : taskType._id,
          Description: taskType.Description
        });
        new_taskType.save(function (err, saved) {
          if (err || saved == {}) {
            callback(false);
          } else {
            callback(saved);
          }
        });
      }
    }
  );
};

exports.createTask = function (task, callback) {
  TaskSchema.exists(
    {
      TaskDescription: task.TaskDescription,
      TaskStartDate: task.TaskStartDate,
      TaskEndDate: task.TaskEndDate,
    },
    function (error, bool) {
      if (error) {
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        const new_task = new TaskSchema({
          TaskDescription: task.TaskDescription,
          TaskType: task.TaskType,
          Project: task.Project,
          Employee: task.Employee,
          TaskStartDate: task.TaskStartDate,
          TaskEndDate: task.TaskEndDate,
          Duration: task.Duration,
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

exports.deleteTask = function (taskDescription,startDate,endDate, callback) {
  if (startDate && endDate) {
    TaskSchema.findOneAndDelete(
      {
        TaskDescription: taskDescription,
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
      { TaskDescription: taskDescription },
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

exports.modifyTask = function (updateTask,taskDescription,startDate,endDate,callback) {
  const modify_task = {
    TaskDescription: updateTask.TaskDescription,
    TaskType: updateTask.TaskType,
    Project: updateTask.Project,
    Employee: updateTask.Employee,
    TaskStartDate: updateTask.TaskStartDate,
    TaskEndDate: updateTask.TaskEndDate,
    Duration: updateTask.Duration,
  };
  if (startDate && endDate) {
    TaskSchema.findOneAndUpdate(
      {
        TaskDescription: taskDescription,
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
      { TaskDescription: taskDescription },
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
