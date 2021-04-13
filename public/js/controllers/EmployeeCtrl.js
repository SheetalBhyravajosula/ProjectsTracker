angular
    .module("EmployeeController", ["EmployeeService", "ProjectService", "ngMaterial" ])
    .controller("EmployeeController", ["Employee", "Project", "$location", "$scope",
        function(Employee, Project,$location, $scope) {
            let vm=this;
            $scope.employee = {};
            $scope.empData = null;
            vm.employees = null;
            vm.getEmployeesAll = function(){
                Employee.getEmployees()
                .then(function({ data }) {
                    vm.employees = data.data;
                    vm.employees.forEach((emp) => {
                        Project.getProjects().then(function({data}){
                            vm.emp = emp;
                            let projects=data.data;
                            Project.setProjects(projects);
                            let project = projects.find(id => id._id === emp.Project);
                            vm.emp.Project=project.ProjectName;
                        }).catch(function(err) {
                                vm.employees.Project = err;
                            });
                    });
                    $scope.empData = vm.employees;
                })
                .catch(function(err) {
                    vm.employees = err;
                });
            }
            vm.getEmployeesAll();
            $scope.Edit = function(employee) {
                Employee.setEmployee(employee);
                $location.path('/employees/' + employee.EmployeeId);
            }
            $scope.AddNewEmployee =function(){
                Employee.setEmployee(null);
                $location.path('/employees/new');
            }
            $scope.Delete = function(employee){
                Employee.deleteEmployee(employee).then(function(response){
                    console.log(response);
                }).catch(function(err){
                    console.log(err);
                });
                vm.getEmployeesAll();
            }
        },
    ]);