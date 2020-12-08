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