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

class Eqiupment {
	constructor(doc) {
		this.id = doc.id;
	}
	
	showId() {
		console.log('[Eqiupment]'+this.id);
	}
}

class Tent extends Eqiupment {
	constructor(doc) {
		super(doc);
		this.brand = doc.data().brand;
		this.model = doc.data().model;
		this.pur_dt = doc.data().pur_dt;
		this.pur_chnl = doc.data().pur_chnl;
		this.size = doc.data().size;
		this.capacity = doc.data().capacity;
		this.base_corners = doc.data().base_corners;
		this.tent_base = doc.data().tent_base;
		this.bag = doc.data().bag;
		this.poles = doc.data().poles;
		this.shelter = doc.data().shelter;
	}
	
	showId() {
		console.log('[Tent]'+this.id+' '+this.model);
	}
	
	viewHtml() {
		return common.buildHtml(
			"<div class='card mb-3'>",
				"<div class='card-body'>",
					"<h5 class='card-title'>" + this.id + "</h5>",
					"<div class='row card-text'>",
						"<div class='col-sm'>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Brand</div>",
								"<div class='d-table-cell'>" + common.checkNull(this.brand) + "</div>",
							"</div>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Model</div>",
								"<div class='d-table-cell'>" + common.checkNull(this.model) + "</div>",
							"</div>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Pur. Date</div>",
								"<div class='d-table-cell'>" + common.timestampToDateStr(this.pur_dt) + "</div>",
							"</div>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Pur. Chnl</div>",
								"<div class='d-table-cell'>" + common.checkNull(this.pur_chnl) + "</div>",
							"</div>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Size</div>",
								"<div class='d-table-cell'>" + this.size.w + " x " + this.size.l + " x " + this.size.h + " " + this.size.unit + "</div>",
							"</div>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Capacity</div>",
								"<div class='d-table-cell'>" + this.capacity + "</div>",
							"</div>",
						"</div>",
						"<div class='col-sm'>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Base Corners</div>",
								"<div class='d-table-cell'><i class='far fa-check-circle'></i> " + this.base_corners.good + " <i class='far fa-times-circle'></i> " + this.base_corners.broken + "</div>",
							"</div>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Tent Base</div>",
								"<div class='d-table-cell'>",
									common.where(
										this.tent_base.status == "good", 
											"<i class='far fa-check-circle'></i> ", 
										this.tent_base.status == "patched", 
											"<i class='fas fa-exclamation-circle'></i> ",
										this.tent_base.status == "broken", 
											"<i class='far fa-times-circle'></i> ", 
											""
									),
									common.checkNull(this.tent_base.remarks),
								"</div>",
							"</div>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Tent Bag</div>",
								"<div class='d-table-cell'>",
									common.where(
										this.bag.status == "good", 
											"<i class='far fa-check-circle'></i> ", 
										this.bag.status == "patched", 
											"<i class='fas fa-exclamation-circle'></i> ",
										this.bag.status == "broken", 
											"<i class='far fa-times-circle'></i> ", 
										this.bag.status == "lost", 
											"<i class='far fa-times-circle'></i> ", 
											""
									),
									//common.checkNull(this.bag.remarks),
								"</div>",
							"</div>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Poles</div>",
								"<div class='d-table-cell'>",
									common.where(
										this.poles.status == "good", 
										"				<i class='far fa-check-circle'></i> ", 
										this.poles.status == "patched", 
										"				<i class='fas fa-exclamation-circle'></i> ",
										this.poles.status == "broken", 
										"				<i class='far fa-times-circle'></i> ", 
										""
									),
									common.checkNull(this.poles.color),
								"</div>",
							"</div>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Poles Bag</div>",
								"<div class='d-table-cell'>",
									common.where(
										this.poles.bag == "good", 
											"<i class='far fa-check-circle'></i> ", 
										this.poles.bag == "patched", 
											"<i class='fas fa-exclamation-circle'></i> ",
										this.poles.bag == "broken", 
											"<i class='far fa-times-circle'></i> ", 
											""
									),
								"</div>",
							"</div>",
							"<div class='d-table-row'>",
								"<div class='d-table-cell pr-3'>Shelter</div>",
								"<div class='d-table-cell'>",
									common.where(
										this.shelter.status == "good", 
											"<i class='far fa-check-circle'></i> ", 
										this.shelter.status == "patched", 
											"<i class='fas fa-exclamation-circle'></i> ",
										this.shelter.status == "broken", 
											"<i class='far fa-times-circle'></i> ", 
											""
									),
								"</div>",
							"</div>",
						"</div>",
					"</div>",
				"</div>",
			"</div>"
		);
	}
}
