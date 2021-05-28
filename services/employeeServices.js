const employeeSchema = require("../schemas/employeeSchema");
const projectSchema = require("../schemas/projectSchema");
const exists = "Exists";
const doesNotExist = "DoesNotExist";

exports.getEmployees = function (callback) {
  employeeSchema.find({}).lean().exec( async function (err, employees) {
    if (err) {
      callback(false);
    } else {
      await new Promise((resolve)=>{
        employees.forEach(async (emp) => {
          await projectSchema.find(
            { _id: emp.Project },
            function (error, project) {
              if (error) {
                console.log("error in getEmployees" + error);
                callback(false);
              } else {
                emp.Project = project[0].ProjectName;
              }
            }
          );
          resolve();
        });
      })
      callback(employees);
    }
  });
};

exports.createEmployee = function (employee, callback) {
  employeeSchema.exists(
    {
      EmployeeId: employee.employeeId,
    },
    async function (error, bool) {
      if (error) {
        console.log(error);
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        await projectSchema.findOne({ProjectName : employee.Project},function(err,proj){
          if(err){
            callback(false);
          }
          employee.Project = proj._id;
        })
        const new_employee = new employeeSchema({
          EmployeeId: employee.EmployeeId,
          EmployeeName: employee.EmployeeName,
          BillRate: employee.BillRate,
          Project: employee.Project,
        });
        new_employee.save(function (err, saved) {
          if (err) {
            console.log(err);
            callback(false);
          } else {
            callback(saved);
          }
        });
      }
    }
  );
};

exports.deleteEmployee = function (employeeId, callback) {
  employeeSchema.findOneAndDelete(
    { EmployeeId: employeeId },
    function (err, result) {
      if (err) {
        callback(false);
      } else if (result == null) {
        callback(doesNotExist);
      } else {
        callback(result);
      }
    }
  );
};

exports.modifyEmployee = async function (updateEmployee, employeeId, callback) {
  await projectSchema.findOne({ProjectName : updateEmployee.Project},function(err,proj){
    if(err){
      callback(false);
    }
    updateEmployee.Project = proj._id;
    console.log(updateEmployee.Project);
  })
  const modify_employee = {
    EmployeeId: updateEmployee.EmployeeId,
    EmployeeName: updateEmployee.EmployeeName,
    BillRate: updateEmployee.BillRate,
    Project: updateEmployee.Project,
  };
  employeeSchema.findOneAndUpdate(
    { EmployeeId: employeeId },
    modify_employee,
    function (err, result) {
      if (err) {
        callback(false);
      } else if (result == null) {
        callback(doesNotExist);
      } else {
        callback(result);
      }
    }
  );
};
