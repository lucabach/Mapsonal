import { MeansOfTransport } from "../../server/model/Types";

export default function Graph(props: {
  footTrip: any;
  trainTrip: any;
  bikeTrip: any;
  carTrip: any;
  centerContent: string;
  transport: MeansOfTransport | undefined;
  handleTransports: any;
}) {
  const durationToNumber = (input: String) => {
    console.log("input", input);
    let newstring: number;
    if (input.includes("h")) {
      newstring =
        parseInt(input.slice(0, input.indexOf("h"))) * 60 +
        parseInt(input.slice(input.indexOf("h") + 2, input.indexOf("m")));
    } else {
      newstring = parseInt(input.slice(0, input.indexOf("m")));
    }
    console.log("output", newstring);
    return newstring;
  };

  return (
    <>
      {props.centerContent == "duration" && (
        <div className="inBox">
          <div className="inCol">
            <div className={"passiveInfo"}>{props.footTrip?.duration}</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.OnFoot)}
              className={
                props.transport === MeansOfTransport.OnFoot
                  ? "inGra attGreen"
                  : "inGra inattGreen"
              }
              style={{
                height:
                  (durationToNumber(props.footTrip.duration) /
                    Math.max(
                      durationToNumber(props.footTrip.duration),
                      durationToNumber(props.trainTrip.duration),
                      durationToNumber(props.carTrip.duration),
                      durationToNumber(props.bikeTrip.duration),
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>{props.trainTrip?.duration}</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByTrain)}
              className={
                props.transport === MeansOfTransport.ByTrain
                  ? "inGra attBlue"
                  : "inGra inattBlue"
              }
              style={{
                height:
                  (durationToNumber(props.trainTrip.duration) /
                    Math.max(
                      durationToNumber(props.footTrip.duration),
                      durationToNumber(props.trainTrip.duration),
                      durationToNumber(props.carTrip.duration),
                      durationToNumber(props.bikeTrip.duration),
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>{props.carTrip?.duration}</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByCar)}
              className={
                props.transport === MeansOfTransport.ByCar
                  ? "inGra attRed"
                  : "inGra inattRed"
              }
              style={{
                height:
                  (durationToNumber(props.carTrip.duration) /
                    Math.max(
                      durationToNumber(props.footTrip.duration),
                      durationToNumber(props.trainTrip.duration),
                      durationToNumber(props.carTrip.duration),
                      durationToNumber(props.bikeTrip.duration),
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>{props.bikeTrip?.duration}</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByBike)}
              className={
                props.transport === MeansOfTransport.ByBike
                  ? "inGra  attOrange"
                  : "inGra inattOrange"
              }
              style={{
                height:
                  (durationToNumber(props.bikeTrip.duration) /
                    Math.max(
                      durationToNumber(props.footTrip.duration),
                      durationToNumber(props.trainTrip.duration),
                      durationToNumber(props.carTrip.duration),
                      durationToNumber(props.bikeTrip.duration),
                    )) *
                  160,
                backgroundColor: "rgba(255, 165, 0)",
              }}
            ></label>
          </div>
        </div>
      )}

      {props.centerContent == "distance" && (
        <div className="inBox">
          <div className="inCol">
            <div className={"passiveInfo"}>{props.footTrip?.distance}</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.OnFoot)}
              className={
                props.transport === MeansOfTransport.OnFoot
                  ? "inGra attGreen"
                  : "inGra inattGreen"
              }
              style={{
                height:
                  (props.footTrip?.distance /
                    Math.max(
                      props.footTrip.distance,
                      props.carTrip.distance,
                      props.trainTrip.distance,
                      props.bikeTrip.distance,
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>{props.trainTrip?.distance}</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByTrain)}
              className={
                props.transport === MeansOfTransport.ByTrain
                  ? "inGra attBlue"
                  : "inGra inattBlue"
              }
              style={{
                height:
                  (props.trainTrip!.distance /
                    Math.max(
                      props.footTrip.distance,
                      props.carTrip.distance,
                      props.trainTrip.distance,
                      props.bikeTrip.distance,
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>{props.carTrip?.distance}</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByCar)}
              className={
                props.transport === MeansOfTransport.ByCar
                  ? "inGra attRed"
                  : "inGra inattRed"
              }
              style={{
                height:
                  (props.carTrip?.distance /
                    Math.max(
                      props.footTrip?.distance,
                      props.carTrip?.distance,
                      props.trainTrip!.distance,
                      props.bikeTrip?.distance,
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>{props.bikeTrip?.distance}</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByBike)}
              className={
                props.transport === MeansOfTransport.ByBike
                  ? "inGra attOrange"
                  : "inGra inattOrange"
              }
              style={{
                height:
                  (props.bikeTrip?.distance /
                    Math.max(
                      props.footTrip?.distance,
                      props.carTrip?.distance,
                      props.trainTrip!.distance,
                      props.bikeTrip?.distance,
                    )) *
                  160,
              }}
            ></label>
          </div>
        </div>
      )}
      {props.centerContent == "emissions" && (
        <div className="inBox">
          <div className="inCol">
            <div className={"passiveInfo"}>0 kg</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.OnFoot)}
              className={
                props.transport === MeansOfTransport.OnFoot
                  ? "inGra attGreen"
                  : "inGra inattGreen"
              }
              style={{
                height:
                  ((props.footTrip!.distance * 0) /
                    Math.max(
                      props.carTrip.distance * 123.6,
                      props.trainTrip.distance * 35,
                      props.bikeTrip!.distance * 33,
                      props.footTrip!.distance * 0,
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>
              {Math.round((props.trainTrip?.distance * 35) / 1000)} kg
            </div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByTrain)}
              className={
                props.transport === MeansOfTransport.ByTrain
                  ? "inGra attBlue"
                  : "inGra inattBlue"
              }
              style={{
                height:
                  ((props.trainTrip!.distance * 35) /
                    Math.max(
                      props.carTrip.distance * 123.6,
                      props.trainTrip.distance * 35,
                      props.bikeTrip!.distance * 33,
                      props.footTrip!.distance * 0,
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>
              {Math.round((props.carTrip?.distance * 123.6) / 1000)} kg
            </div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByCar)}
              className={
                props.transport === MeansOfTransport.ByCar
                  ? "inGra attRed"
                  : "inGra inattRed"
              }
              style={{
                height:
                  ((props.carTrip!.distance * 123.6) /
                    Math.max(
                      props.carTrip.distance * 123.6,
                      props.trainTrip.distance * 35,
                      props.bikeTrip!.distance * 33,
                      props.footTrip!.distance * 0,
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>
              {Math.round((props.bikeTrip!.distance * 33) / 1000)} kg
            </div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByBike)}
              className={
                props.transport === MeansOfTransport.ByBike
                  ? "inGra attOrange"
                  : "inGra inattOrange"
              }
              style={{
                height:
                  ((props.bikeTrip!.distance * 33) /
                    Math.max(
                      props.carTrip.distance * 123.6,
                      props.trainTrip.distance * 35,
                      props.bikeTrip!.distance * 33,
                      props.footTrip!.distance * 0,
                    )) *
                  160,
              }}
            ></label>
          </div>
        </div>
      )}
      {props.centerContent == "costs" && (
        <div className="inBox">
          <div className="inCol">
            <div className={"passiveInfo"}>0 CHF</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.OnFoot)}
              className={
                props.transport === MeansOfTransport.OnFoot
                  ? "inGra attGreen"
                  : "inGra inattGreen"
              }
              style={{
                height:
                  (0 /
                    Math.max(
                      Math.floor(props.bikeTrip.distance * 0.0377 * 2),
                      Math.floor(props.carTrip.distance * 0.75 * 2),
                      Math.floor(props.trainTrip.distance * 0.3 * 2),
                      0,
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>{Math.round((props.trainTrip.distance * 0.3))} CHF</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByTrain)}
              className={
                props.transport === MeansOfTransport.ByTrain
                  ? "inGra attBlue"
                  : "inGra inattBlue"
              }
              style={{
                height:
                  (Math.floor(props.trainTrip.distance * 0.3 * 2) /
                    Math.max(
                      Math.floor(props.bikeTrip.distance * 0.0377 * 2),
                      Math.floor(props.carTrip.distance * 0.75 * 2),
                      Math.floor(props.trainTrip.distance * 0.3 * 2),
                      0,
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>{Math.round(props.carTrip.distance * 0.75 )} CHF</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByCar)}
              className={
                props.transport === MeansOfTransport.ByCar
                  ? "inGra attRed"
                  : "inGra inattRed"
              }
              style={{
                height:
                  (Math.floor(props.carTrip.distance * 0.75 * 2) /
                    Math.max(
                      Math.floor(props.bikeTrip.distance * 0.0377 * 2),
                      Math.floor(props.carTrip.distance * 0.75 * 2),
                      Math.floor(props.trainTrip.distance * 0.3 * 2),
                      0,
                    )) *
                  160,
              }}
            ></label>
          </div>
          <div className="inCol">
            <div className={"passiveInfo"}>{Math.round(props.bikeTrip.distance * 0.03772)} CHF</div>
            <label
              onClick={() => props.handleTransports(MeansOfTransport.ByBike)}
              className={
                props.transport === MeansOfTransport.ByBike
                  ? "inGra  attOrange"
                  : "inGra inattOrange"
              }
              style={{
                height:
                  (Math.floor(props.bikeTrip.distance * 0.0377 * 2) /
                    Math.max(
                      Math.floor(props.bikeTrip.distance * 0.0377 * 2),
                      Math.floor(props.carTrip.distance * 0.75 * 2),
                      Math.floor(props.trainTrip.distance * 0.3 * 2),
                      0,
                    )) *
                  160,
                backgroundColor: "rgba(255, 165, 0)",
              }}
            ></label>
          </div>
        </div>
      )}
    </>
  );
}
