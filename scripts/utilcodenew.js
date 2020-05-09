function getCountryData() {
	var htmlData = "<div class='row header'><div class='cell' style='text-align:left;'>Country</div><div class='cell'>Positive</div><div class='cell'>Negative</div><div class='cell'>Pending</div><div class='cell'>Total</div><div class='cell'>Recovered</div><div class='cell'>Deaths</div><div class='cell' style='padding-left:25px;'>Modified</div></div>";
	//var htmlData = "<div class='row header'><div class='cell' style='text-align:left;'>Country</div><div class='cell'>Positive</div><div class='cell'>Negative</div><div class='cell'>Total</div></div>";	
	$.getJSON('https://covidtracking.com/api/us', function(data) {
		$.each(data, function(key, value){
			htmlData += "<div class='row'>";
			htmlData += "<div class='cell' style='text-align:left;' data-title='Country'>United States (USA)</div>";
			htmlData += parseData(value);
			htmlData += "<div class='cell' data-title='Last Modified' style='padding-left:25px;'>" + getDateString((new Date( Date.parse(value.lastModified))).toLocaleString()) + "</div>";
			htmlData += "</div>";										
		});
		document.getElementById('divTable').innerHTML = htmlData;				
	});						
}

function getStateData() {
	var htmlStateData = "<div class='row header' style='position:sticky;top:0;'><div class='cell' style='text-align:left;'>State</div><div class='cell'>Positive</div><div class='cell'>Negative</div><div class='cell'>Pending</div><div class='cell'>Total</div><div class='cell'>Recovered</div><div class='cell'>Deaths</div><div class='cell' style='padding-left:25px;'>Modified</div></div>";
	//var htmlStateData = "<div class='row header' style='position:sticky;top:0;'><div class='cell' style='text-align:left;'>State</div><div class='cell'>Positive</div><div class='cell'>Negative</div><div class='cell'>Total</div></div>";
	$.getJSON('https://covidtracking.com/api/states', function(data) {
		$.each(data, function(key, value){
			htmlStateData += "<div class='row'>";
			htmlStateData += "<div class='cell' style='text-align:left;' data-title='State'>" + abbrState(value.state, 'name') + "</div>";
			htmlStateData += parseData(value);
			htmlStateData += "<div class='cell' data-title='Last Modified' style='padding-left:25px;'>" + getDateString((new Date( Date.parse(value.dateModified))).toLocaleString()) + "</div>";					
			htmlStateData += "</div>";					
		});
		document.getElementById('divStateTable').innerHTML = htmlStateData;				
	});						
}

function parseData(value){
	var data = "<div class='cell' data-title='Positive'>" + getValue(value.positive) + "</div>";
	data += "<div class='cell' data-title='Negative'>" + getValue(value.negative) + "</div>";
	data += "<div class='cell' data-title='Pending'>" + getValue(value.pending) + "</div>";
	data += "<div class='cell' data-title='Total'>" + getValue(value.total) + "</div>";
	data += "<div class='cell' data-title='Recovered'>" + getValue(value.recovered) + "</div>";
	data += "<div class='cell' data-title='Deaths'>" + getValue(value.death) + "</div>";
	return data;
}

function getValue(val){
	if(val == null) {
		return 'N/A';
	}
	else {
		return val.toLocaleString('en');
	}			
}
//Remove seconds from time
function getDateString(origDateString) {
	if(origDateString){		
		//var firstPart = origDateString.substr(0, origDateString.length - 6);
		//var secondPart = origDateString.substr(origDateString.length - 3, origDateString.Length);
	    var index = origDateString.indexOf(',');		
	    origDateString = origDateString.substr(0, index);
	}
	return origDateString;
}		

function abbrState(input, to){			
	var states = [
		['Arizona', 'AZ'],
		['Alabama', 'AL'],
		['Alaska', 'AK'],
		['Arkansas', 'AR'],
		['California', 'CA'],
		['Colorado', 'CO'],
		['Connecticut', 'CT'],
		['Delaware', 'DE'],
		['Florida', 'FL'],
		['Georgia', 'GA'],
		['Hawaii', 'HI'],
		['Idaho', 'ID'],
		['Illinois', 'IL'],
		['Indiana', 'IN'],
		['Iowa', 'IA'],
		['Kansas', 'KS'],
		['Kentucky', 'KY'],
		['Louisiana', 'LA'],
		['Maine', 'ME'],
		['Maryland', 'MD'],
		['Massachusetts', 'MA'],
		['Michigan', 'MI'],
		['Minnesota', 'MN'],
		['Mississippi', 'MS'],
		['Missouri', 'MO'],
		['Montana', 'MT'],
		['Nebraska', 'NE'],
		['Nevada', 'NV'],
		['New Hampshire', 'NH'],
		['New Jersey', 'NJ'],
		['New Mexico', 'NM'],
		['New York', 'NY'],
		['North Carolina', 'NC'],
		['North Dakota', 'ND'],
		['Ohio', 'OH'],
		['Oklahoma', 'OK'],
		['Oregon', 'OR'],
		['Pennsylvania', 'PA'],
		['Rhode Island', 'RI'],
		['South Carolina', 'SC'],
		['South Dakota', 'SD'],
		['Tennessee', 'TN'],
		['Texas', 'TX'],
		['Utah', 'UT'],
		['Vermont', 'VT'],
		['Virginia', 'VA'],
		['Washington', 'WA'],
		['West Virginia', 'WV'],
		['Wisconsin', 'WI'],
		['Wyoming', 'WY'],
		['American Samoa', 'AS'],
		['District Of Columbia', 'DC'],
		['Guam', 'GU'],
		['N Mariana Islands', 'MP'],
		['Puerto Rico', 'PR'],
		['US Virgin Islands', 'VI'],
	];

	if (to == 'abbr'){
		input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		for(i = 0; i < states.length; i++){
			if(states[i][0] == input){
				return(states[i][1]);
			}
		}    
	} else if (to == 'name'){
		input = input.toUpperCase();
		for(i = 0; i < states.length; i++){
			if(states[i][1] == input){
				return(states[i][0]);
			}
		}    
	}
}