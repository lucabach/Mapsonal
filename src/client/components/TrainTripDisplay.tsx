import {
  MeansOfTransport,
  OjpLegInfo,
  TripInfo,
} from "../../server/model/Types";
import SingleTrainDisplay from "./SingleTrainDisplay";

import back from "../img/back.png"
import rightArrow from "../img/right-arrow.png"

import bike from "../img/bike.png";
import train from "../img/train.png";
import foot from "../img/walking.png";
import car from "../img/car.png";




export default function TrainTripDisplay(props: {
  footTrip: any;
  trainTrip: TripInfo;
  bikeTrip: any;
  carTrip: any;
  trip: OjpLegInfo[];
  transport: MeansOfTransport;
  from: string;
  to: string;
  goback: any;
}) {
  console.log(props.transport);

  // var destFootPos =
  //   props.footTrip.positionsList[props.footTrip.positionsList.length - 1];
  // var startFootPos = props.footTrip.positionsList[0];
  // var startFootLong = startFootPos[0];
  // var startFootLat = startFootPos[1];
  // var destFootLong = destFootPos[0];
  // var destFootLat = destFootPos[1];

  // var destTrainPos =
  //   props.trainTrip.positionsList[props.trainTrip.positionsList.length - 1];
  // var startTrainPos = props.trainTrip.positionsList[0];
  // var startTrainLong = startTrainPos[0];
  // var startTrainLat = startTrainPos[1];
  // var destTrainLong = destTrainPos[0];
  // var destTrainLat = destTrainPos[1];

  // var destCarPos =
  //   props.carTrip.positionsList[props.carTrip.positionsList.length - 1];
  // var startCarPos = props.carTrip.positionsList[0];
  // var startCarLong = startCarPos[0];
  // var startCarLat = startCarPos[1];
  // var destCarLong = destCarPos[0];
  // var destCarLat = destCarPos[1];

  // var destBikePos =
  //   props.bikeTrip.positionsList[props.bikeTrip.positionsList.length - 1];
  // var startBikePos = props.bikeTrip.positionsList[0];
  // var startBikeLong = startBikePos[0];
  // var startBikeLat = startBikePos[1];
  // var destBikeLong = destBikePos[0];
  // var destBikeLat = destBikePos[1];

  return (
    <div className="moreInfoContainer">
      <div className="headerMoreInfo">
        <label className="back" onClick={props.goback}>
          <img
            className="backImg"
            src={back}
            alt="goBack"
          />
        </label>
        <div className="bigHeader">
          <img
            className="headerImg"
            src={
              props.transport === MeansOfTransport.OnFoot
                ? foot
                : props.transport === MeansOfTransport.ByTrain
                ? train
                : props.transport === MeansOfTransport.ByCar
                ? car
                : bike
            }
            alt="walking"
          />
          <div>{props.from}</div>
          <img
            className="headerImg"
            src={rightArrow}
            alt={MeansOfTransport[props.transport]}
          />
          <div>{props.to}</div>
          {/*}
      {props.transport === MeansOfTransport.OnFoot &&
      <a href={footTripLink}>link to the full route</a>
      }

      {props.transport === MeansOfTransport.ByCar &&
       <a href={carTripLink}>link to the full route</a>
      }

      {props.transport === MeansOfTransport.ByBike &&
       <a href={bikeTripLink}>link to the full route</a>
      }
*/}
        </div>
      </div>
      {props.trainTrip.transport.map((singleTrip, index) => (
        <SingleTrainDisplay
          transport={props.transport}
          key={index}
          singleTrip={singleTrip}
        />
      ))}
    </div>
  );
}
