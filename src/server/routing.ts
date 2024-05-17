import getOJPTripStops from "../server/model/getOJPTripStops";
import { NominatimModel } from "./model/NominatimModel";
import { OsrmModel } from "./model/OsrmModel";
import { MeansOfTransport, TripInfo } from "./model/Types";
import transformOsrmToTripInfo from "./model/transformOsrmToTripInfo";

const BIKE_COST_PER_KM = 0.0377;
const CAR_COST_PER_KM = 0.75;
const FOOT_COST_PER_KM = 0.0;
const TRAIN_COST_PER_KM = 0.31;

const BIKE_EMISSIONS_PER_KM = 33.0;
const CAR_EMISSIONS_PER_KM = 123.6;
const FOOT_EMISSIONS_PER_KM = 0.0;
const TRAIN_EMISSIONS_PER_KM = 35.0;

export default async function findRoute(
  srcPlace: string,
  destPlace: string,
  datetime: Date,
  meansOfTransport: MeansOfTransport,
) {
  const srcCoords = await NominatimModel.getCoordsByName(srcPlace);
  const destCoords = await NominatimModel.getCoordsByName(destPlace);

  let routeInfo: TripInfo;

  switch (meansOfTransport) {
    case MeansOfTransport.OnFoot:
      console.log(
        `Getting routing information on foot between source and dest`,
      );
      routeInfo = transformOsrmToTripInfo(
        await OsrmModel.getRouteOnFoot(srcCoords, destCoords) /*, datetime*/,
      );
      routeInfo.cost = FOOT_COST_PER_KM * routeInfo.distance;
      routeInfo.emissions = FOOT_EMISSIONS_PER_KM * routeInfo.distance;
      console.log("By foot", routeInfo.duration);
      break;

    case MeansOfTransport.ByBike:
      console.log(
        `Getting routing information by bike between source and dest`,
      );
      routeInfo = transformOsrmToTripInfo(
        await OsrmModel.getRouteByBike(srcCoords, destCoords) /*, datetime*/,
      );
      routeInfo.cost = BIKE_COST_PER_KM * routeInfo.distance;
      routeInfo.emissions = BIKE_EMISSIONS_PER_KM * routeInfo.distance;
      console.log("By bike", routeInfo.duration);
      break;

    case MeansOfTransport.ByCar:
      console.log(`Getting routing information by car between source and dest`);
      routeInfo = transformOsrmToTripInfo(
        await OsrmModel.getRouteByCar(srcCoords, destCoords) /*, datetime*/,
      );
      routeInfo.cost = CAR_COST_PER_KM * routeInfo.distance;
      routeInfo.emissions = CAR_EMISSIONS_PER_KM * routeInfo.distance;
      console.log("By car", routeInfo.duration);

      break;

    case MeansOfTransport.ByTrain:
      console.log(
        `Getting routing information by train between source and dest`,
      );
      routeInfo = await getOJPTripStops(
        datetime.toISOString(),
        srcCoords,
        srcPlace,
        destCoords,
        destPlace,
      ).catch((error: Error) => {
        throw error;
      });
      routeInfo.cost = TRAIN_COST_PER_KM * routeInfo.distance;
      routeInfo.emissions = TRAIN_EMISSIONS_PER_KM * routeInfo.distance;
      console.log("By train", routeInfo.duration);
      break;

    default:
      throw new Error("Unsupported means of transportation requested.");
  }
  return routeInfo;
}
