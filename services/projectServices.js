const projectSchema = require("../schemas/projectSchema");
const projectTypeSchema = require("../schemas/projectType");
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

exports.getProjectTypes = function (callback) {
  projectTypeSchema.find({}, function (err, result) {
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
          ProjectName: project.ProjectName,
          Category: project.Category,
          ProjectType: project.ProjectType,
          Technology: project.Technology,
          OnsiteCount: project.OnsiteCount,
          OffshoreCount: project.OffshoreCount,
          ClientName: project.ClientName,
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

exports.createProjectType = function (project, callback) {
  projectTypeSchema.exists(
    {
      _id: project._id
    },
    function (error, bool) {
      if (error) {
        callback(false);
      } else if (bool) {
        callback(exists);
      } else {
        const new_projectType = new projectTypeSchema({
          _id : project._id,
          Description: project.Description
        });
        new_projectType.save(function (err, saved) {
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
    ProjectName: updateProject.ProjectName,
    Category: updateProject.Category,
    ProjectType: updateProject.ProjectType,
    Technology: updateProject.Technology,
    OnsiteCount: updateProject.OnsiteCount,
    OffshoreCount: updateProject.OffshoreCount,
    ClientName: updateProject.ClientName
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
