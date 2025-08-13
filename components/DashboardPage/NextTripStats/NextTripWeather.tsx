import Image from "next/image";
import React from "react";
import * as ct from "countries-and-timezones";

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
  console.log("🚀 ~ NextTripWeather ~ responseWeatherApi:", responseWeatherApi);

  const weather = responseWeatherApi?.weather[0]?.main;
  const icon = responseWeatherApi?.weather[0]?.icon;
  const temp = Math.round(responseWeatherApi?.main?.temp);
  const timezoneOffsetInSeconds = responseWeatherApi?.timezone
    ? responseWeatherApi?.timezone
    : 0;
  const country = responseWeatherApi?.sys?.country;

  const weatherIconUrl = getIcon(icon);

  const updateTime = () => {
    // @ts-ignore
    const timezone = ct?.getAllCountries()[country]?.timezones[0];
    const formatter = new Intl.DateTimeFormat("en-UK", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    });

    return formatter.format(new Date());
  };

  return (
    <div className="flex gap-2 items-center">
      <p className="text-gray-300">{temp} °C </p>
      <p>{weather}</p>
      {weatherIconUrl && (
        <Image src={weatherIconUrl} alt="weather-icon" width={50} height={50} />
      )}
      <p className="text-xl text-gray-300">{updateTime()}</p>
      <p></p>
    </div>
  );
}

function getIcon(icon: string) {
  const urlIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  return urlIcon;
}
