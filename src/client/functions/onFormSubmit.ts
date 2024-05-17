import React from "react";
import {
  MeansOfTransport,
  TripInfo,
  TripRequest,
} from "../../server/model/Types";

export default function onFormSubmit(
  evt: React.FormEvent<HTMLFormElement>,
  setFootTrip: React.Dispatch<React.SetStateAction<TripInfo>>,
  setTrainTrip: React.Dispatch<React.SetStateAction<TripInfo>>,
  setCarTrip: React.Dispatch<React.SetStateAction<TripInfo>>,
  setBikeTrip: React.Dispatch<React.SetStateAction<TripInfo>>,
  setShowSpinnerModal: React.Dispatch<React.SetStateAction<boolean>>,
  setSearched: React.Dispatch<React.SetStateAction<boolean>>,
  setPage: React.Dispatch<React.SetStateAction<string>>,
  setSelectedTrip: React.Dispatch<React.SetStateAction<TripInfo>>,
  transport: MeansOfTransport,
  tripReqState: TripRequest,
) {
  setShowSpinnerModal(true);
  evt.preventDefault();
  setSearched(true);

  // Get form inputs data
  const fromInput = document.getElementById("from") as HTMLInputElement;
  const toInput = document.getElementById("to") as HTMLInputElement;
  const datetimeInput = document.getElementById("datetime") as HTMLInputElement;

  if (
    fromInput === null ||
    toInput === null ||
    datetimeInput === null ||
    fromInput.value === "" ||
    toInput.value === "" ||
    datetimeInput.value === ""
  ) {
    throw "up";
  }

  const url = `/api/route/`;

  const meansOfTransport = [
    MeansOfTransport.ByBike,
    MeansOfTransport.ByCar,
    MeansOfTransport.ByTrain,
    MeansOfTransport.OnFoot,
  ];

  console.log("datetime, ", datetimeInput.value);
  const len = meansOfTransport.length;
  let resCounter = 0;
  meansOfTransport.forEach((mot) => {
    fetch(url, {
      body: JSON.stringify({
        from: fromInput.value,
        to: toInput.value,
        suggestedOriginLoc: tripReqState.suggestedOriginLoc,
        suggestedDestinationLoc: tripReqState.suggestedDestinationLoc,
        datetime: `${datetimeInput.value.replace("T", " ")}`,
        meansOfTransport: mot,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      referrer: "client",
    }).then(async (res) => {
      res.json().then((data: TripInfo | { message: string }) => {
        if (!res.ok) {
          const errorData = data as { message: string };
          console.log(errorData.message);
          alert(errorData.message);
        } else {
          switch (mot) {
            case MeansOfTransport.ByBike:
              setBikeTrip(data as TripInfo);
              console.log("Setting bike trip info");
              if (transport === MeansOfTransport.ByBike) {
                setSelectedTrip(data as TripInfo);
              }

              break;
            case MeansOfTransport.ByCar:
              setCarTrip(data as TripInfo);
              console.log("Setting car trip info");
              if (transport === MeansOfTransport.ByCar) {
                setSelectedTrip(data as TripInfo);
              }

              break;
            case MeansOfTransport.ByTrain:
              setTrainTrip(data as TripInfo);
              console.log("Setting train trip info");
              if (transport === MeansOfTransport.ByTrain) {
                setSelectedTrip(data as TripInfo);
              }

              break;
            case MeansOfTransport.OnFoot:
              setFootTrip(data as TripInfo);
              console.log("Setting foot trip info");
              if (transport === MeansOfTransport.OnFoot) {
                setSelectedTrip(data as TripInfo);
              }
              break;
            default:
              throw "sideways";
          }
        }
        setPage("Home2");

        if (++resCounter === len) setShowSpinnerModal(false);
      });
    });
  });
}
