import { Coords, TripInfo } from "./Types";
import getOJPTripStops from "./getOJPTripStops";

//I want to save everything on a react state called trainTripInfo using various functions

export default async function getOJPTrip(
  setOjpTrip: React.Dispatch<React.SetStateAction<TripInfo>>,
  depTime: string,
  dep: Coords,
  depName: string,
  arr: Coords,
  arrName: string,
) {
  const ojpTrip = await getOJPTripStops(depTime, dep, depName, arr, arrName);
  console.log(ojpTrip);
  setOjpTrip(ojpTrip);
}
