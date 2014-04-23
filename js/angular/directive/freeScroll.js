IonicModule

.directive('freeScroll', function($freeScroll,$ionicScrollDelegate, $compile, $ionicBind){
	return {
	restrict: 'E',
    priority: 1000,
    terminal: true, 
	require: '^$ionicScroll',
    link: function(scope, element, attr, scrollCtrl) {
		sc = scrollCtrl;
			var scrollView = scrollCtrl.scrollView,
				children = angular.element(element.children()[0]),
				contentElement = scrollCtrl.$element;
			
			var dataSource = scope[attr.data],
				dataItemName = attr.bind,
				dataItemLength = parseInt(attr.length);
				dataItems = [],
				cachItems = {},
				scrollHeight = 0,
				topElementHeight = 0,
				offsetTop = 0,
				preScrollTop = 0,
				thisElementNumber = 0,
				thisDataSourceItem = 0;
				
			var childrens;
			
			for(var i = 0; i < dataItemLength && i < dataSource.length; i++){
				dataItems.push({i:dataSource[i]});
			}
			
			scope['$freeScrollData'] = dataItems;
			
			children.attr('ng-repeat', dataItemName+' in $freeScrollData');
			
			$compile(children)(scope);
			
			if(dataSource.length <= dataItemLength){
				return;
			}
			
			element.ready(function(){
				childrens = element.children();
				topElementHeight = childrens[0].getBoundingClientRect().height;
				for(var i = 0; i < childrens.length; i++){
					thisDataSourceItem++;
					var children = childrens[i];
					children.style.position = 'absolute';
					children.style.width = "100%";
					$freeScroll.setElementPosition(children, scrollHeight);
					scrollHeight += children.getBoundingClientRect().height;
				}
			});
			
			contentElement.on('scroll', function(e){
				var scrollTop = e.detail.scrollTop;
				var offset = offsetTop+topElementHeight;
				if(scrollTop > preScrollTop && scrollTop > offset){
					offsetTop = offset;
					$freeScroll.setElementPosition(childrens[thisElementNumber], scrollHeight);
					
					dataItems[thisElementNumber] = dataSource[thisDataSourceItem]; 
					
					thisDataSourceItem++;
					if(thisElementNumber == dataItemLength){
						thisElementNumber = 0;
					}else{
						thisElementNumber++;
					}
					
					//scrollCtrl.resize();
					//scope.$digest();
					
				}
				else
				if(scrollTop < preScrollTop && scrollTop < offsetTop){
					
				}
				preScrollTop = scrollTop;
			});
			
			
		}
	}
})