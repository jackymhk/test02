// Initialize Firebase


// Initialize Cloud Firestore through Firebase
db = firebase.firestore();

// Disable deprecated features
db.settings({
	timestampsInSnapshots: true
});

var common = new function() {

    this.timestampToDateStr = function(ts, nullStr) {
		if (typeof(nullStr) == 'undefined') {
			nullStr = '';
		}
		
		if (ts == null) {
			return nullStr;
		}
		
		var d = ts.toDate();
		return  d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
    };
	
	this.checkNull = function(str, nullStr) {
		if (typeof(nullStr) == 'undefined') {
			nullStr = '';
		}
		
		if (typeof(str) == 'undefined' || str == null) {
			return nullStr;
		}
		return str;
	}
	
	this.buildHtml = function(...args) {
		return args.join("\n");
	}
	
	this.where = function(...args) {
		for (var i = 0; i < args.length; i += 2) {
			if (args[i])
				return args[i+1];
		}
		return args[args.length-1];
	}
	
	this.select = function(conditionArray, true_strArray, default_str = '') {
		for (var i = 0; i < conditionArray.length; i++) {
			if (conditionArray[i])
				return true_strArray[i];
		}
		return default_str;
	}
};
