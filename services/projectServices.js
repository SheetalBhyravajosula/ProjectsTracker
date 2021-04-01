const projectSchema = require("../schemas/projectSchema");
const exists = "Exists";
const doesNotExist = "DoesNotExist";

exports.getProjects = function (callback) {
  projectSchema.find({}, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
};

exports.getProjectById = function (id,callback) {
  projectSchema.findOne({_id : id}, function (err, result) {
    if (err) {
      callback(false);
    } else {
      callback(result);
    }
  });
};


exports.createProject = function (project, callback) {
  projectSchema.exists(
    {
      ProjectName: project.projectName,
    },
    function (error, bool) {
      if (error) {
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        const new_project = new projectSchema({
          ProjectName: project.projectName,
          Category: project.category,
          ProjectType: project.projectType,
          Technology: project.technology,
          OnsiteCount: project.onsiteCount,
          OffshoreCount: project.offshoreCount,
          ClientName: project.clientName,
        });
        new_project.save(function (err, saved) {
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

exports.deleteProject = function (projectName, callback) {
  projectSchema.findOneAndDelete({ ProjectName: projectName }, function (
    err,
    result
  ) {
    if (err) {
      callback(false);
    } else if (result == null) {
      callback(doesNotExist);
    } else {
      callback(result);
    }
  });
};

exports.modifyProject = function (updateProject, projectName, callback) {
  const modify_project = {
    ProjectName: updateProject.projectName,
    Category: updateProject.category,
    ProjectType: updateProject.projectType,
    Technology: updateProject.technology,
    OnsiteCount: updateProject.onsiteCount,
    OffshoreCount: updateProject.offshoreCount,
    ClientName: updateProject.clientName
  };
  projectSchema.findOneAndUpdate(
    { ProjectName: projectName },
    modify_project,
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
