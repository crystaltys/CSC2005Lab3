var total_lots = [];
var lot_type = [];
var lots_available = [];
var carpark_number = [];
var update_date = [];
var utilization_arr = []; 
var utilization , count;
fetch("https://api.data.gov.sg/v1/transport/carpark-availability")
.then((resp) => resp.json())
.then(function(data) {
    //console.log(data.items[0]);  
    var info = data.items[0].carpark_data;
    var timeStamp = data.items[0].timeStamp;
    var lenOfData = data.items[0].carpark_data.length;
    for (var i=0; i<lenOfData; i++){
        (total_lots.push(info[i].carpark_info[0].total_lots));
        (lot_type.push(info[i].carpark_info[0].lot_type));
        (lots_available.push(info[i].carpark_info[0].lots_available));
        (carpark_number.push(info[i].carpark_number));
        (update_date.push(info[i].update_datetime));
        
        if (lots_available[i] == 0) {
            utilization = 100 
        }else{
            utilization = ((lots_available[i]/total_lots[i])*100).toFixed(0)
        }
        (utilization_arr.push(utilization));
        
        $("#carTable tr:last").after("<tr><td>"+carpark_number[i]+"</td><td>"+update_date[i]+"</td><td>"+lot_type[i]+"</td><td>"+total_lots[i]+"</td><td>"+lots_available[i]+"</td><td>"+utilization_arr[i]+"%"+"</td></tr>");
    
        if (total_lots[i] == 0){
            $("tr:last").css("background-color","yellow");
        }
        if (utilization > 80){
            $("td:last").css("color","red");
        }
    } 
  
})
