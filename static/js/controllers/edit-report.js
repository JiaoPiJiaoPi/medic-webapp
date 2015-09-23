var modal = require('../modules/modal');

(function () {
  'use strict';

  angular.module('inboxControllers').controller('EditReportCtrl',
    ['$scope', '$state', '$translate', 'DB', 'DbNameService', 'UpdateFacility', 'Enketo',
    function ($scope, $state, $translate, DB, DbNameService, UpdateFacility, Enketo) {

      $(document).on('hidden.bs.modal', '#edit-report', function() {
        $(this).find('.form-wrapper .container').empty();
        Enketo.unload($scope.enketo_report && $scope.enketo_report.formInstance);
        delete $scope.enketo_report;
      });

      $scope.saveReport = function() {
        var $modal = $('#edit-report');
        var docId = $modal.find('[name=id]').val();
        var facilityId = $modal.find('[name=facility]').val();
        if (!docId) {
          $modal.find('.modal-footer .note')
            .text($translate.instant('Error updating facility'));
          return;
        }
        if (!facilityId) {
          $modal.find('.modal-footer .note')
            .text($translate.instant('Please select a facility'));
          return;
        }
        var pane = modal.start($modal);
        UpdateFacility(docId, facilityId, function(err) {
          pane.done($translate.instant('Error updating facility'), err);
        });
      };

    }
  ]);
}());
