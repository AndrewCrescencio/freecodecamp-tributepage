let date = new Date();
let day = date.getDate();
let hour = date.getHours();
let minute = date.getMinutes();
let dayWeek = date.getDay();
let month = date.getMonth();

let weather = {
	apiKey: "api key here",
	fetchWeather: function (query) {
		fetch(
			`https://api.weatherapi.com/v1/forecast.json?key=ecf729aa32264b8b8e9220838210103&q=${query}&days=3&aqi=no&alerts=no`
		)
			.then((response) => {
				if (!response.ok) {
					alert("No weather found.");
					throw new Error("No weather found.");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				this.displayWeather(data);
			});
	},
	displayWeather: function (data) {
		const icon = data.current.condition.icon;
		const current_temp_c = data.current.temp_c;
		const city = data.location.name;
		const description = data.current.condition.text;
		const mintemp_c = data.forecast.forecastday[0].day.mintemp_c;
		const maxtemp_c = data.forecast.forecastday[0].day.maxtemp_c;
		const daily_chance_of_rain =
			data.forecast.forecastday[0].day.daily_chance_of_rain;

		const sunrise = data.forecast.forecastday[0].astro.sunrise;
		const sunset = data.forecast.forecastday[0].astro.sunset;

		document.getElementById("sunrise").innerHTML = sunrise;
		document.getElementById("sunset").innerHTML = sunset;

		document.getElementById("city").innerHTML = city;
		document.getElementById("icon").src = icon;
		document.getElementById("description").innerHTML = description;
		document.getElementById("temp").innerHTML = current_temp_c;
		document.getElementById("mintemp_c").innerHTML = mintemp_c + "&deg;";
		document.getElementById("maxtemp_c").innerHTML = maxtemp_c + "&deg;";
		document.getElementById("rain").innerHTML = daily_chance_of_rain + "%";

		//day
		let day1_icon = data.forecast.forecastday[1].day.condition.icon;
		let day2_icon = data.forecast.forecastday[2].day.condition.icon;

		let day1_min = data.forecast.forecastday[1].day.mintemp_c;
		let day2_min = data.forecast.forecastday[2].day.mintemp_c;

		let day1_max = data.forecast.forecastday[1].day.maxtemp_c;
		let day2_max = data.forecast.forecastday[2].day.maxtemp_c;

		let day1_rain =
			data.forecast.forecastday[1].day.daily_chance_of_rain + "%";
		let day2_rain = data.forecast.forecastday[2].day.daily_chance_of_rain;

		let day1_wind = data.forecast.forecastday[1].day.maxwind_kph;
		let day2_wind = data.forecast.forecastday[2].day.maxwind_kph;

		document.getElementById("day1_icon").src = day1_icon;
		document.getElementById("day1_min").innerHTML = day1_min;
		document.getElementById("day1_max").innerHTML = day1_max;
		document.getElementById("day1_rain").innerHTML = day1_rain;
		document.getElementById("day1_wind").innerHTML = day1_wind;

		document.getElementById("day2_icon").src = day2_icon;
		document.getElementById("day2_min").innerHTML = day2_min;
		document.getElementById("day2_max").innerHTML = day2_max;
		document.getElementById("day2_rain").innerHTML = day2_rain;
		document.getElementById("day2_wind").innerHTML = day2_wind;
	},

	search: function () {
		weather.fetchWeather(document.getElementById("input").value);
		document.getElementById("input").value = "";
	},
};

// Search button event listener
document.getElementById("btn").addEventListener("click", function (e) {
	e.preventDefault();
	weather.search();
});

function onLoad() {
	if ("geolocation" in navigator) {
		console.log("geolocation available");
		navigator.geolocation.getCurrentPosition((position) => {
			var lat = position.coords.latitude;
			var long = position.coords.longitude;
			let onloadQuery = `${lat},${long}`;
			weather.fetchWeather(onloadQuery);
		});
	} else {
		console.log("geolocation NOT available");
	}
}
