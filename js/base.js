(function($, NS) {
	/**
	 * Main Application Namespace.
	 */
	window[NS] = window[NS] || {};
	/**
	 * Dummy console implementation. Prevents code crashing when no Firebug (or another console implementer plug-in) is running in the browser.
	 */
	if (!window.console) {
		var i, noop = function() {
		}, fnc = [ 'log', 'debug', 'info', 'warn', 'error', 'assert', 'clear', 'dir', 'dirxml', 'trace', 'group', 'groupCollapsed', 'groupEnd', 'time', 'timeEnd', 'profile','profileEnd', 'count', 'exception', 'table' ];

		window.console = {};
		for (i = 0; i < fnc.length; i++) {
			window.console[fnc[i]] = noop;
		}
	}

	/**
	 * Global constants used across all page of application
	 */
	window[NS].Constants = window[NS].Constants || {};

	/**
	 * Helper method for extending native JavaScript objects with custom methods in a more compact and non-obtrusive way.
	 */
	Function.prototype.method = function(name, fnc) {
		if (this.prototype[name] === undefined) {
			this.prototype[name] = fnc;
		}
		return this;
	};
	Number.method('padLeft',function(n,char){
		return Array(n-String(this).length+1).join(char||'0')+this;
	});
	Number.random=function(a,b){
		return Math.round(a+ (b-a)*Math.random());
	};
	Number.method('constrain', function(lo,hi) {
		var v=this.valueOf();
		return v < lo ? lo : (v > hi ? hi : v);
	});
	Array.method('choose',function(){
		return this[Number.random(0,this.length-1)];
	});

	/**
	 * Client-side templating method. Useful when generationg dynamic markup based on JSON objects received by Ajax. Eg.: '<span>{firstName}, {lastName}</span>'.tmpl({"firstName":
	 * "Elemér", "lastName" : "Zágoni"}) = '<span>Elemér, Zágoni</span>';
	 */
	String.method('tmpl', function(obj) {
		var prop, result = this;

		for (prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				result = result.replace(new RegExp('{' + prop + '}', 'g'), obj[prop]);
			}
		}
		return result;
	});
	
	/**
	 * OGNL (Deep version of templating resolver.)
	 */
	String.method('tmplDeep', function(obj) {
		var result = this,rex=new RegExp("\\{\\b[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\}","mig"),
		getOGNLValue=function(obj, props) {
				return props.length === 1 ? obj[props[0]] : getOGNLValue(obj[props.shift()],props);
		};
		
		result = result.replace(rex, function(match){
			var props=match.substring(1,match.length-1).split('.');
			return getOGNLValue(obj,props);
		});
		return result;
	});

	/**
	 * Base class for any UI support class.
	 */
	window[NS].Base = window[NS].Base || Class.extend({
		/**
		 * Constructor. Here comes code to be executed on after page load regardless on which page we are.
		 * Eg.: - Marking required fields, Setting global Ajax Hooks etc.
		 */
		init : function() {
		},

		/**
		 * Should be overridden for debugging purposes.
		 */
		toString : function() {
			return NS + '.Base Class';
		},

		/**
		 * Returns the exact type of any JavaScript object.
		 * Note: the neither the typeof operator nor the .constructor method are not precise enough.
		 * They do NOT make difference between certain objects: Eg.: typeof {} == 'object'; typeof /\s+/ = 'object' 
		 * Inside a function: typeof arguments = 'object'.
		 */
		objType: function(obj) {
		  var t=Object.prototype.toString.call(obj).split(' ')[1];
		  return t.substring(0,t.length-1);
		}
	});
	/*
	 * DON'T ATTACH ONLOAD BEHAVIOUR, this is an ABSTRACT CLASS, extenders should bind their behaviour, constructor of Base class is AUTOMATICALLY called when the EXTENDER class is
	 * INSTANTIATED.
	 */

}(jQuery, "PRJ"));
