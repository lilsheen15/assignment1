//We need to do a mapReduce to get our data to look like this

{ "_id" : "MENTAL DISORDERS DUE TO USE OF ALCOHOL", 
  "value" : 
    { "male" : 119, 
      "female" : 120 
    }
}

//Thus, we need to alter our MR to be like this:
mapFunction = function() {
  var key = this.Cause_of_Death;
  var value = {
        sex: this.Sex,
        count: this.Count,
       };

  emit(key, value);
};

reduceFunction = function(key, values) {
  var reducedObject = {
        male: 0,
        female: 0,
       };

  values.forEach(function(value) {
    if(value.sex == "MALE") { 
      reducedObject.male += value.count;
    } else if(value.sex == "FEMALE") { 
      reducedObject.female += value.count;
    }
   });
   
  return reducedObject;
};

db.death_causes_collection.mapReduce(
  mapFunction,
  reduceFunction,
   {
     out: "death_causes_by_sex_collection",
   }
 )

// Format Data
function formatDataTable(chartdata) {
  var data = [];
  var header = ['Cause of Death', 'Male', 'Female'];

  data.push(header);
 
  for (var i = 0; i < chartdata.length; i++) {
    var temp = [];
    temp.push(chartdata[i]._id);
    temp.push(chartdata[i].value.male);
    temp.push(chartdata[i].value.female);
    data.push(temp);
  }