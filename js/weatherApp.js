
function searchCity()
{
    let input = document.createElement('input');
    input.placeholder = "Search a City";
    input.name = "SearchWeather";
    input.classList.add("form-control");
    document.body.appendChild(input);
}

searchCity()

function addSubmitButton()
{
    let button = document.createElement('button');
    button.innerText = "Submit";
    button.classList.add("form-control", "btn", "btn-primary");
    button.addEventListener("click", (event) => handleSubmit(event));
    document.body.appendChild(button);
}

addSubmitButton()

function handleSubmit(event)
{
    event.stopPropagation();
    event.preventDefault();
    console.log("Form was submitted");
    const searchWeather = document.getElementsByName("SearchWeather")[0].value;
    console.log(searchWeather);
    doAPICall(searchWeather);
}

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=9bca6f75a19b915ea8f552b7172ffa67

async function doAPICall(cityName)
{
    let result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9bca6f75a19b915ea8f552b7172ffa67`
    )

    result = result.data

    let high = document.getElementById("high")
    high.innerText = `High: ${toF(result["main"]["temp_max"])}F`
    document.body.appendChild(high)

    let low = document.getElementById("low")
    low.innerText = `low: ${toF(result["main"]["temp_min"])}F`
    document.body.appendChild(low)

    let forecast = document.getElementById("forecast")
    forecast.innerText = `forecast: ${result["weather"]["0"]["description"]}`
    document.body.appendChild(forecast)

    let humidity = document.getElementById("humidity")
    humidity.innerText = `humidity: ${result["main"]["humidity"]}%`
    document.body.appendChild(humidity)
}

function toF(num)
{
    return Math.ceil((num - 273.15) * (9/5) + 32)
}
