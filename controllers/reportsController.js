const reportsService=require('../services/reportsServices');

exports.getTasksByEmpId = function(req, res) {
    const empId=req.params.empId;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    reportsService.getTasksByEmpId(empId,startDate,endDate,function(result) {
        if (result == false) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: `Could not retrieve tasks error occured`
              });
        }else {
            res.status(200).json({
                status: 'success',
                data: result
              });
        }
    });
};

exports.getTasksByProjectName = function(req, res) {
    const projectName=req.params.projectName;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    reportsService.getTasksByProjectName(projectName,startDate,endDate,function(result) {
        if (result == false) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: `Could not retrieve tasks error occured`
              });
        }else {
            res.status(200).json({
                status: 'success',
                data: result
              });
        }
    });
};

exports.getTasksByEmpIdAndProjectName = function(req, res) {
    const empId=req.params.empId;
    const projectName=req.params.projectName;
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    reportsService.getTasksByEmpIdAndProjectName(empId,projectName,startDate,endDate,function(result) {
        if (result == false) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: `Could not retrieve tasks error occured`
              });
        }else {
            res.status(200).json({
                status: 'success',
                data: result
              });
        }
    });
};

exports.getProjectsByCategory = function(req, res) {
    const category=req.params.category;
    reportsService.getProjectsByCategory(category,function(result) {
        if (result == false) {
            res.status(500).json({
                status: 'Internal Server Error',
                message: `Could not retrieve tasks error occured`
              });
        }else {
            res.status(200).json({
                status: 'success',
                data: result
              });
        }
    });
};