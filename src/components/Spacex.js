import React, { useState, useEffect } from 'react';
import moment from "moment";

function SpaceXLaunch() {
    const [flights, setFlight] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const background = "https://spacenews.com/wp-content/uploads/2014/11/Falcon9_SpaceX02-427x485.jpg"

    useEffect(() => {
        fetch('https://api.spacexdata.com/v3/launches/upcoming',{
            method: "GET",
        })
        .then(res => res.json())
        .then(response => {
            setFlight(response)
            setIsLoading(false)
        })
        .catch(error => console.log(error))
    })

    return (
      <div>
        <h4 class="font-semibold text-lg leading-tight mt-1 text-3xl text-white text-center my-5 pt-5">
          SpaceX Upcoming Flights
        </h4>
        <p class="text-white text-center">
          This app is built using React and TailwindCSS and uses data from
          <a className="text-blue-600" href="https://github.com/r-spacex/SpaceX-API">&nbsp;SpaceX-API.</a>
        </p>
        {isLoading && (
          <p class="text-white text-center">
            Wait I'm Loading comments for you
          </p>
        )}

        {flights.map((flight, index) => (
          <div class="bg-white border rounded-lg overflow-hidden my-2 shadow max-w-sm w-full lg:max-w-full lg:flex mx-auto">
            <div
              class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style={{ backgroundImage: `url(${background}` }}
              title="Look at those Cavemen go"
            ></div>
            <div class="p-6">
              <div class="text-gray-600 text-xs uppercase font-semibold tracking-wide">
                Launch # {flight.flight_number} | {flight.rocket_name}
              </div>
              <h4 class="font-semibold text-lg leading-tight mt-1 text-3xl">
                {flight.mission_name}
              </h4>
              <div class="mt-4">
                <span class="text-red-600 font-semibold">
                  {moment(flight.launch_date_utc).format("DD/MM/YYYY HH:mm A")}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div class="flex text-xs text-white font-semibold tracking-wide text-center py-3">
          <span class="mx-auto md:w-1/3 sm:w-full pt-3 text-2xl">
            Made with ❤️ by
            <a className="text-blue-600" href="https://twitter.com/Dmdboi">
              &nbsp;Diamond Boi.
            </a>
          </span>
        </div>
      </div>
    );
}

export default SpaceXLaunch

