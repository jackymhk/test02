// Initialize Firebase
var config = {
	apiKey: "AIzaSyBGT7AIumjPEpJVjgDr02Drhua2YvxRn84",
	authDomain: "test02-80c38.firebaseapp.com",
	databaseURL: "https://test02-80c38.firebaseio.com",
	projectId: "test02-80c38",
	storageBucket: "test02-80c38.appspot.com",
	messagingSenderId: "642799320118"
};
firebase.initializeApp(config);

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
