import { TripInfo, OsrmRes } from "./Types";

// var polyline = require('@mapbox/polyline');

export default function transformOsrmToTripInfo(
  object: OsrmRes /*, startTime:Date*/,
) {
  if (object === undefined || object === null) {
    throw "[transformOsrmToTripInfo] Argument object is undefined or null.";
  }
  if (object.paths[0] === undefined) {
    throw "[transformOsrmToTripInfo] Argument object does not contain any routes.";
  }
  // Copy start time
  // const startTimeClone = new Date(startTime.getTime());

  //console.log("the ormRes is: ", object.paths[0]?.legs[0]?.steps)
  let tripObject: TripInfo = {
    transport: [],
    positionsList: [],
    loaded: true,
    duration: "0",
    distance: 0,
    cost: 0.0,
    emissions: 0.0,
  };

  tripObject.positionsList = object.paths[0].points.coordinates;
  // const legs = object.paths[0].legs;
  // for(let j=0; j<legs.length; j++){
  //     const steps = legs[j]!.steps!
  //     for(let i=0; i<steps.length; i++) {
  //         tripObject.positionsList.push([steps[i]!.maneuver.location[1], steps[i]!.maneuver.location[0]]);
  //     }
  // }

  tripObject.distance = Math.round(object.paths[0].distance / 1000);

  object.paths[0].time = object.paths[0].time / 1000;

  let duration = "0";

  if (Math.floor(object.paths[0].time / 3600) > 0) {
    duration = `${Math.floor(object.paths[0].time / 3600)}h ${Math.floor(
      (object.paths[0].time % 3600) / 60,
    )}m`;
  } else {
    duration = `${Math.floor((object.paths[0].time % 3600) / 60)}m`;
  }
  tripObject.duration = duration;

  // The following section, meant to convert the trip details such as street names and travel indications, does not work, since most street names are `null`.
  // const path = object.paths[0];
  // const legs = [];
  // const len = Math.min(Math.min(path.details.distance.length, path.details.time.length), path.details.street_name.length);

  // for (let i = 0; i < len; ++i) {
  //     const legStartTime:Date = startTimeClone;
  //     const legArrivalTime:Date = new Date(startTimeClone.setMilliseconds(startTimeClone.getMilliseconds() + path.details.time[i]![2]!));
  //     const leg:OjpLegInfo = {
  //         startPointName: path.details.street_name[i]![2]!,
  //         startTime: legStartTime.toLocaleString(),
  //         arrivalName: path.details.street_name[i]![2]!,
  //         arrivalTime: legArrivalTime.toLocaleString(),
  //         plannedDepQuay: "-1",
  //         plannedArrQuay: "-1",
  //         line: "",
  //         destination: path.details.street_name[i]![2]!
  //     };
  //     legs.push(leg);
  // }
  // tripObject.transport = legs;

  // const encodedPolyline = object.paths[0].geometry;

  // tripObject.positionsList = polyline.decode(encodedPolyline);

  // Now you can use the `decodedCoordinates` array to display the route on a map.

  return tripObject;
}
