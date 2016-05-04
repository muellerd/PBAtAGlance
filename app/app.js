'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAnimate'
])
    .directive('hcLineChart', function () {
      return{
        restrict: 'E',
        template: '<div></div>',
        scope: {
          title: '@',
          data: '='
        },
        link: function (scope, element) {
          Highcharts.chart(element[0], {
            credits: { enabled: false },
                tooltip:{ crosshairs: [true] },
                chart: {
                    renderTo: 'container',
                    defaultSeriesType: 'line',
                    width: 500,
                    height: 400
                },
                title: { text: 'Einwohner in Paderborn' },
                xAxis: { categories: [] },
                yAxis: {
                    title: { text: 'Units' }
                },
                series: [{data: scope.data}],
                plotOptions: {
                    line: {
                        marker: { enabled: false }
                    }
                }
          });
        }
      };
    })
    .config(function ($routeProvider) {
      $routeProvider
          .when('/', {templateUrl: 'articles.html'})
          .when('about', {templateUrl: 'Über unsere Pizzeria'})
          .otherwise({redirectTo: '/'});
    })
.factory('Cart', function(){
  var items = [];
  return {
    getItems: function(){
      return items;
    },
    addArticle: function (article) {
      items.push(article);
    },
    sum: function () {
      return items.reduce(function (total, article) {
        return total + article.price;
      }, 0);
    }
  }
})
.directive('price', function () {
  return {
    restrict: 'E',
    scope: {
      value: '='
    },
    template: '<span ng-show="value == 0">kostenlos</span>' +
        '<span ng-show="value > 0">{{value | currency}}</span>'
  }
})
.controller('ArticlesCtrl', function ($scope, $http, Cart) {
  $scope.cart = Cart;
  $http.get('articles.json').then(function(articlesResponse){
    $scope.articles = articlesResponse.data;
  });
})
.controller('CartCtrl', function($scope, Cart){
  $scope.cart = Cart;
});
