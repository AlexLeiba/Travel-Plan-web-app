import Image from "next/image";
import React from "react";

export async function NextTripWeather({
  lat,
  long,
}: {
  lat: string;
  long: string;
}) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
  );

  if (!response.ok) {
    return (
      <p className="dark:text-white text-center">No weather data was found.</p>
    );
  }
  const responseWeatherApi = await response.json();

  const weather = responseWeatherApi?.weather[0]?.main;
  const icon = responseWeatherApi?.weather[0]?.icon;
  const temp = Math.round(responseWeatherApi?.main?.temp);

  const weatherIconUrl = getIcon(icon);

  return (
    <div className="flex gap-2 items-center">
      <p className="text-gray-300">{temp} °C </p>
      <p>{weather}</p>

      {weatherIconUrl && (
        <Image src={weatherIconUrl} alt="weather-icon" width={50} height={50} />
      )}
    </div>
  );
}

function getIcon(icon: string) {
  const urlIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  return urlIcon;
}
