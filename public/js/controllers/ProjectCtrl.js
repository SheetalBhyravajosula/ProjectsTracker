angular
    .module("ProjectController", ["ProjectService"])
    .controller("ProjectController", [
        "Project",
        "$scope",
        function(Project, $scope) {
            $scope.projData = null;
            $scope.display = function() {
                Project.getProjects()
                    .then(function({ data }) {
                        $scope.projData = data.data;
                    })
                    .catch(function(err) {
                        $scope.projData = err;
                    });
                
            }
        }
    ]);