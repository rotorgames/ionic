IonicModule

.factory('$freeScroll', function(){
	function freeScroll(){
		var _elementStyle = document.createElement('div').style;
		var _vendor = (function () {
			var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
				transform,
				i = 0,
				l = vendors.length;
	
			for ( ; i < l; i++ ) {
				transform = vendors[i] + 'ransform';
				if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
			}
	
			return false;
		})();
		function _prefixStyle (style) {
			if ( _vendor === false ) return false;
			if ( _vendor === '' ) return style;
			return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
		}
		
		this.prefix = _prefixStyle('transform');
	}
	freeScroll.prototype.setElementPosition = function(element, position){
		console.log(element);
		var style = element.style;
		style[this.prefix] = 'translate(0px, '+position+'px)';
	}
	return new freeScroll;
});