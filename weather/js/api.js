
let longi,lati;

async function weather(){
if(navigator.geolocation){

navigator.geolocation.getCurrentPosition(async (position)=>{
longi=position.coords.longitude;
lati=position.coords.latitude;


console.log(longi,lati)
try{
const response=await fetch(`https://api.weatherapi.com/v1/current.json?key=ad9c15a78b724e7aa39165805253010&q=${lati},${longi}`)
const data=await response.json()
document.getElementById('degree').textContent=`${data.location.name}, ${data.current.temp_c}`
}

catch(err){

    console.log(err.message)
}





})
}
}

