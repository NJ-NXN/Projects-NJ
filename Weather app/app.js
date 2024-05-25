window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://corsproxy.io/?";
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=afd092dc026297706ba15d14f85bff8b`;
            fetch(api)
            .then(response => {
                return response.json();            
            })
            .then(data =>{
                console.log(data);
                const {temp} = data.main;
                const {description, main} = data.weather[0];

            //Set DOM Elements from the API
            temperatureDegree.textContent = Math.floor(temp-273);
            temperatureDescription.textContent = description;
            locationTimezone.textContent = data.name;

            //Formula For Farenheit
            let farenheit = ((temp-273) *(9 / 5) + 32);

            //Set Icons
            setIcons(main, document.querySelector('.icon'));

            //Change Temperature to Celsius/Farenheit
            temperatureSection.addEventListener("click", () => {
                if(temperatureSpan.textContent === "C"){
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = Math.floor(farenheit);
                }else{
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(temp-273);
                }
            })
        });       
    });
 }

function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

});
