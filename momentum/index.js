//fetching photo from unsplash api
function bodyStyle(){
document.body.style.backgroundRepeat='no-repeat'
document.body.style.backgroundSize='cover'
document.body.style.backgroundPosition = 'center center';
document.body.style.backgroundOrigin='border-box'
document.body.style.backgroundAttachment = 'fixed';
document.body.style.backgroundClip = 'content-box';
// document.body.style.filter = 'brightness(0.8)';
document.body.style.transition = 'background-image 1s ease-in-out';

}
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature").then((response)=>response.json()).then((data)=>{console.log(data)

document.body.style.backgroundImage=`url(${data.urls.full})`
bodyStyle();
document.getElementById('author').innerHTML=`<span id="auth">By: ${data.user.name}</span>`
});



setInterval(()=>{

    let time=new Date();
    let distime=`${time.toLocaleTimeString("en-us",{timeStyle:"short"})}`
    document.getElementById('middle').innerHTML=`<br><br><span id="time">${distime}</span>`
},1000)



fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        console.log(res.status)
        return res.json()
    })
    .then(data => {
        console.log(data)
        document.getElementById("crypto").innerHTML = `
           <div id="cryptos"> <img src=${data.image.small} />
            <span>${data.name}</span></div>
            <div id="currency"><p>$ ${data.market_data.current_price.usd}</p>
            <p>$ ${data.market_data.high_24h.usd}</p>
            <p>$ ${data.market_data.low_24h.usd}</p></div>
        `
    })
    .catch(err => console.error(err))





if(navigator.geolocation){

navigator.geolocation.getCurrentPosition((position)=>{fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`).then((res)=>{
if(!res.ok){

    throw Error('something went wrong at server side')

    
}
return res.json()

}).then((data)=>{console.log(data)

document.getElementById('weather').innerHTML=`<div id="icon-temp"><img id='weather-icon' src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/ ><span id='temp'>${data.main.temp}&#176;C</span></div>
<span id="city">${data.name}</span>`

}).catch((err)=>{console.log(err)})


},(err)=>{console.log(err.message)})

}

