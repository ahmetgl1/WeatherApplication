const weatherPart = document.querySelector('.weather-part')
const inputPart = document.querySelector('.input-part')
const cityInput = document.getElementById('cityInput')
const locationButton = document.getElementById('location-btn')
const cityLabel = document.querySelector('.cityLabel')
const locationBtn = document.getElementById('location-btn')
const leftElement = document.querySelector('.fa-left-long'); // Öğeyi seçin
const arrowBack = document.querySelector('.wrapper i')
const bodyElement = document.querySelector('.background');


let api


cityInput.addEventListener("keyup" , event =>{

if(event.key== 'Enter' && cityInput.value != ""){

    requestApi(cityInput.value)
}



})

function requestApi(city) {
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=904f2bb771a2fb3fe77fbf5f5c7cc5cd`;
    
    fetchData()
}


locationBtn.addEventListener('click', () =>{

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess , onError)
}
else{
    alert('Tarayıcınız Desteklemiyor !')
}

})

function onSuccess(position){

const {latitude ,longitude} = position.coords


     api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&units=metric&lon=${longitude}&appid=904f2bb771a2fb3fe77fbf5f5c7cc5cd`
     fetchData()

}

function onError(error){
    
    cityLabel.innerText = error.message
    cityLabel.classList.add('error')

}

function fetchData(){

    cityLabel.innerText = "Sonuçlar Getiriliyor . .";
    cityLabel.classList.add("pending");

    fetch(api)
        .then(response => response.json())
        .then(result => weatherDetails(result));

}
function weatherDetails(info){

    if(info.cod=="404"){
        cityLabel.innerText = `${cityInput.value} Şehri Bulunamadı `
        cityLabel.classList.replace("pending","error")

        setTimeout(() => {
            clear()
        }, 1000);
    }
    else{
        
        const city = info.name
        const country = info.sys.country
        const {description , id} =  info.weather[0]
        const {feels_like , humidity , temp} = info.main
console.log(info)

        weatherPart.querySelector('.temp-number').innerText = Math.floor(temp)
        document.querySelector('.weather').innerText = description
        document.getElementById('location-city').innerText =city
        document.getElementById('location-country').innerText =  country
        document.querySelector('.feel-number').innerText= Math.floor(feels_like)
        document.querySelector('.humidity').innerText = `${humidity}%`

wheatherIcon = document.querySelector('.weather-part img')
if(id ===800){


    wheatherIcon.src = "icons/clear.svg"
    
     bodyElement.style.backgroundImage = 'url("icons/b2.jpg")';

    

}
else if(id >= 200 &&  id<=232){
    wheatherIcon.src = "icons/storm.svg"
    bodyElement.style.backgroundImage = 'url("icons/b6.jpg")';
    

}
else if(id >= 600 &&  id<=622){
    wheatherIcon.src = "icons/snow.svg"
    bodyElement.style.backgroundImage = 'url("icons/b1.jpg")';

}
else if(id >= 701 &&  id<=781){
    wheatherIcon.src = "icons/haze.svg"
    bodyElement.style.backgroundImage = 'url("icons/b5.jpg")';

}
else if(id >= 801 &&  id<=804){
    wheatherIcon.src = "icons/cloud.svg"
    bodyElement.style.backgroundImage = 'url("icons/b5.jpg")';

}

//yagmur yağma durumu
else if(id >= 300 &&  id<=321 || (id >= 500 &&  id<=531)){
    wheatherIcon.src = "icons/rain.svg"

    bodyElement.style.backgroundImage = 'url("icons/b3.jpg" )';

}

        leftElement.style.display = "block"
        inputPart.style.display = " none";
        weatherPart.style.display ="block" 
        
 
    }
}
function clear() {
    cityInput.value = "";
    cityLabel.innerText = "Şehir İsmi Giriniz . ."
    cityLabel.classList.remove("pending", "error");
}


arrowBack.addEventListener('click' , ()=>{


    inputPart.style.display ="block";
    weatherPart.style.display ="none"
       clear()

})



