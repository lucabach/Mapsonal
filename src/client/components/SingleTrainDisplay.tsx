import { MeansOfTransport } from "../../server/model/Types";

export default function SingleTrainDisplay(props: {
  singleTrip: any;
  transport: MeansOfTransport;
  key: number;
}) {
  let mycla: string;
  switch (props.transport) {
    case MeansOfTransport.ByCar:
      mycla = "Card_Car";
      break;
    case MeansOfTransport.OnFoot:
      mycla = "Card_Foot";
      break;
    case MeansOfTransport.ByTrain:
      mycla = "Card_Train";
      break;
    case MeansOfTransport.ByBike:
      mycla = "Card_Bike";
      break;
    default:
      mycla = "Card";
      break;
  }
  console.log(props.transport);
  if (
    props.transport === MeansOfTransport.ByTrain &&
    props.singleTrip !== undefined
  ) {
    return (
      <div className={mycla}>
        <div className="line-container">
          <div className="start-point"></div>
          <hr className="line" />
          <div className="end-point"></div>
        </div>
        <div className="CardData">
          <div className="rowclass">
            <div>{props.singleTrip.startPointName}</div>
            <div>
              {/*{props.singleTrip.startTime.slice(0,10).replace("-","/").replace("-","/")}*/}{" "}
              {props.singleTrip.startTime!.slice(11, 16)}
            </div>
            <div>Bin {props.singleTrip.plannedDepQuay}</div>
          </div>
          <div className="trainGenerals">
            {props.singleTrip.line} direction: {props.singleTrip.destination}
          </div>
          <div className="rowclass">
            <div>{props.singleTrip.arrivalName}</div>
            <div>
              {/*{props.singleTrip.arrivalTime.slice(0,10).replace("-","/").replace("-","/")}*/}{" "}
              {props.singleTrip.arrivalTime!.slice(11, 16)}
            </div>
            <div>Bin. {props.singleTrip.plannedArrQuay}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
