import { Container, Row, Col } from "react-bootstrap";
import { MeansOfTransport, TripInfo } from "../../server/model/Types";
import { useEffect, useState } from "react";

import compass from "../img/compass.png"

export default function InfoList(props: {
  footTrip: TripInfo;
  trainTrip: TripInfo;
  bikeTrip: TripInfo;
  carTrip: TripInfo;
  centerContent: string;
  transport: MeansOfTransport | undefined;
  handleCenterContent: any;
  searched: any;
  handlePage: any;
}) {
  const [footTripLink, setFootTripLink] = useState("");
  const [bikeTripLink, setBikeTripLink] = useState("");
  const [carTripLink, setCarTripLink] = useState("");

  useEffect(() => {
    if (
      props.footTrip.positionsList.length > 1 &&
      props.bikeTrip.positionsList.length > 1 &&
      props.trainTrip.positionsList.length > 1 &&
      props.carTrip.positionsList.length > 1
    ) {
      var destFootPos =
        props.footTrip.positionsList[props.footTrip.positionsList.length - 1];
      var startFootPos = props.footTrip.positionsList[0];
      var startFootLong = startFootPos[0];
      var startFootLat = startFootPos[1];
      var destFootLong = destFootPos[0];
      var destFootLat = destFootPos[1];

      // var destTrainPos =
      //   props.trainTrip.positionsList[props.trainTrip.positionsList.length - 1];
      // var startTrainPos = props.trainTrip.positionsList[0];
      // var startTrainLong = startTrainPos[0];
      // var startTrainLat = startTrainPos[1];
      // var destTrainLong = destTrainPos[0];
      // var destTrainLat = destTrainPos[1];

      var destCarPos =
        props.carTrip.positionsList[props.carTrip.positionsList.length - 1];
      var startCarPos = props.carTrip.positionsList[0];
      var startCarLong = startCarPos[0];
      var startCarLat = startCarPos[1];
      var destCarLong = destCarPos[0];
      var destCarLat = destCarPos[1];

      var destBikePos =
        props.bikeTrip.positionsList[props.bikeTrip.positionsList.length - 1];
      var startBikePos = props.bikeTrip.positionsList[0];
      var startBikeLong = startBikePos[0];
      var startBikeLat = startBikePos[1];
      var destBikeLong = destBikePos[0];
      var destBikeLat = destBikePos[1];
      setFootTripLink(
        `https://www.google.com/maps/dir/?api=1&origin=${startFootLat},${startFootLong}&destination=${destFootLat},${destFootLong}&travelmode=walking/`,
      );
      //trainTripLink = `https://www.google.com/maps/dir/?api=1&origin=${startTrainLat},${startTrainLong}&destination=${destTrainLat},${destTrainLong}&travelmode=transit/`;
      setCarTripLink(
        `https://www.google.com/maps/dir/?api=1&origin=${startCarLat},${startCarLong}&destination=${destCarLat},${destCarLong}&travelmode=driving/`,
      );
      setBikeTripLink(
        `https://www.google.com/maps/dir/?api=1&origin=${startBikeLat},${startBikeLong}&destination=${destBikeLat},${destBikeLong}&travelmode=bicycling/`,
      );
      console.log(footTripLink);
      console.log(bikeTripLink);
      console.log(carTripLink);
    }
  }, [props.transport, props.bikeTrip, props.carTrip, props.trainTrip, props.footTrip]);

  return (
    <>
      {props.searched && props.transport === MeansOfTransport.OnFoot && (
        <a href={footTripLink} target="_blank">
          <div className="moreInfoButton inattGreen">
            <img
              src={compass}
              alt="moreInfo"
              style={{ width: "85%", height: "85%" }}
            ></img>
          </div>
        </a>
      )}
      {props.searched && props.transport === MeansOfTransport.ByCar && (
        <a href={carTripLink} target="_blank">
          <div className="moreInfoButton inattRed">
            <img
              src={compass}
              alt="moreInfo"
              style={{ width: "85%", height: "85%" }}
            ></img>
          </div>
        </a>
      )}
      {props.searched && props.transport === MeansOfTransport.ByBike && (
        <a href={bikeTripLink} target="_blank">
          <div className="moreInfoButton inattOrange">
            <img
              src={compass}
              alt="moreInfo"
              style={{ width: "85%", height: "85%" }}
            ></img>
          </div>
        </a>
      )}
      {props.searched &&
        props.transport === MeansOfTransport.ByTrain &&
        props.trainTrip.transport.length > 0 && (
          <label onClick={() => props.handlePage("moreInfo")}>
            <div className="moreInfoButton inattBlue">
              <img
                src={compass}
                alt="moreInfo"
                style={{ width: "85%", height: "85%" }}
              ></img>
            </div>
          </label>
        )}

      <Container>
        <Row
          className={
            props.transport === MeansOfTransport.ByBike
              ? props.centerContent === "duration"
                ? "roundBoxesFooter attOrange"
                : "roundBoxesFooter inattOrange"
              : props.transport === MeansOfTransport.ByTrain
              ? props.centerContent === "duration"
                ? "roundBoxesFooter attBlue"
                : "roundBoxesFooter inattBlue"
              : props.transport === MeansOfTransport.ByCar
              ? props.centerContent === "duration"
                ? "roundBoxesFooter attRed"
                : "roundBoxesFooter inattRed"
              : props.transport === MeansOfTransport.OnFoot
              ? props.centerContent === "duration"
                ? "roundBoxesFooter attGreen"
                : "roundBoxesFooter inattGreen"
              : "roundBoxesFooter"
          }
          onClick={() => props.handleCenterContent("duration")}
        >
          <Col className="info1Font justify-content-center">Duration</Col>
          <Col className="info1Font justify-content-center">
            {props.transport === MeansOfTransport.ByTrain &&
              (props.trainTrip !== undefined &&
              props.trainTrip.duration !== undefined
                ? props.trainTrip.duration
                    .replace("PT", "")
                    .replace("m", "min".toLowerCase())
                    .replace("h", "h ".toLowerCase())
                : ":-(")}

            {props.transport === MeansOfTransport.OnFoot &&
              (props.footTrip !== undefined &&
              props.footTrip.duration !== undefined
                ? props.footTrip.duration
                    .replace("PT", "")
                    .replace("m", "min".toLowerCase())
                    .replace("h", "h ".toLowerCase())
                : ":-(")}

            {props.transport === MeansOfTransport.ByCar &&
              (props.carTrip !== undefined &&
              props.carTrip.duration !== undefined
                ? props.carTrip.duration
                    .replace("PT", "")
                    .replace("m", "min".toLowerCase())
                    .replace("h", "h ".toLowerCase())
                : ":-(")}

            {props.transport === MeansOfTransport.ByBike &&
              (props.bikeTrip !== undefined &&
              props.bikeTrip.duration !== undefined
                ? props.bikeTrip.duration
                    .replace("PT", "")
                    .replace("m", "min".toLowerCase())
                    .replace("h", "h ".toLowerCase())
                : ":-(")}
          </Col>
        </Row>
        <Row
          className={
            props.transport === MeansOfTransport.ByBike
              ? props.centerContent === "distance"
                ? "roundBoxesFooter attOrange"
                : "roundBoxesFooter inattOrange"
              : props.transport === MeansOfTransport.ByTrain
              ? props.centerContent === "distance"
                ? "roundBoxesFooter attBlue"
                : "roundBoxesFooter inattBlue"
              : props.transport === MeansOfTransport.ByCar
              ? props.centerContent === "distance"
                ? "roundBoxesFooter attRed"
                : "roundBoxesFooter inattRed"
              : props.transport === MeansOfTransport.OnFoot
              ? props.centerContent === "distance"
                ? "roundBoxesFooter attGreen"
                : "roundBoxesFooter inattGreen"
              : "roundBoxesFooter"
          }
          onClick={() => props.handleCenterContent("distance")}
        >
          <Col className="info1Font justify-content-center">Distance</Col>
          <Col className="info1Font justify-content-center">
            {props.transport === MeansOfTransport.ByTrain &&
              (props.trainTrip !== undefined
                ? props.trainTrip.distance
                : 0)}{" "}
            {props.transport === MeansOfTransport.ByBike &&
              (props.bikeTrip !== undefined ? props.bikeTrip.distance : 0)}{" "}
            {props.transport === MeansOfTransport.ByCar &&
              (props.carTrip !== undefined ? props.carTrip.distance : 0)}{" "}
            {props.transport === MeansOfTransport.OnFoot &&
              (props.footTrip !== undefined ? props.footTrip.distance : 0)}{" "}
            km
          </Col>
        </Row>
        <Row
          className={
            props.transport === MeansOfTransport.ByBike
              ? props.centerContent === "emissions"
                ? "roundBoxesFooter attOrange"
                : "roundBoxesFooter inattOrange"
              : props.transport === MeansOfTransport.ByTrain
              ? props.centerContent === "emissions"
                ? "roundBoxesFooter attBlue"
                : "roundBoxesFooter inattBlue"
              : props.transport === MeansOfTransport.ByCar
              ? props.centerContent === "emissions"
                ? "roundBoxesFooter attRed"
                : "roundBoxesFooter inattRed"
              : props.transport === MeansOfTransport.OnFoot
              ? props.centerContent === "emissions"
                ? "roundBoxesFooter attGreen"
                : "roundBoxesFooter inattGreen"
              : "roundBoxesFooter"
          }
          onClick={() => props.handleCenterContent("emissions")}
        >
          <Col className="info1Font justify-content-center">Emissions</Col>
          {props.transport === MeansOfTransport.OnFoot && (
            <Col className="info1Font justify-content-center">0g CO2</Col>
          )}
          {props.transport === MeansOfTransport.ByBike && (
            <Col className="info1Font justify-content-center">
              {Math.round((props.bikeTrip.distance * 33) / 1000)}kg CO2
            </Col>
          )}
          {props.transport === MeansOfTransport.ByTrain && (
            <Col className="info1Font justify-content-center">
              {Math.round((props.trainTrip.distance * 35) / 1000)}kg CO2
            </Col>
          )}
          {props.transport === MeansOfTransport.ByCar && (
            <Col className="info1Font justify-content-center">
              {Math.round((props.carTrip.distance * 123.6) / 1000)}kg CO2
            </Col>
          )}
        </Row>
        <Row
          className={
            props.transport === MeansOfTransport.ByBike
              ? props.centerContent === "costs"
                ? "roundBoxesFooter attOrange"
                : "roundBoxesFooter inattOrange"
              : props.transport === MeansOfTransport.ByTrain
              ? props.centerContent === "costs"
                ? "roundBoxesFooter attBlue"
                : "roundBoxesFooter inattBlue"
              : props.transport === MeansOfTransport.ByCar
              ? props.centerContent === "costs"
                ? "roundBoxesFooter attRed"
                : "roundBoxesFooter inattRed"
              : props.transport === MeansOfTransport.OnFoot
              ? props.centerContent === "costs"
                ? "roundBoxesFooter attGreen"
                : "roundBoxesFooter inattGreen"
              : "roundBoxesFooter"
          }
          onClick={() => props.handleCenterContent("costs")}
        >
          <Col className="info1Font justify-content-center">Costs</Col>
          {props.transport === MeansOfTransport.OnFoot && (
            <Col className="info1Font justify-content-center">0 CHF</Col>
          )}
          {props.transport === MeansOfTransport.ByBike && (
            <Col className="info1Font justify-content-center">
              {Math.round(props.bikeTrip.distance * 0.0377)} CHF
            </Col>
          )}
          {props.transport === MeansOfTransport.ByTrain && (
            <Col className="info1Font justify-content-center">
               {Math.round(props.trainTrip.distance * 0.3)} CHF
            </Col>
          )}
          {props.transport === MeansOfTransport.ByCar && (
            <Col className="info1Font justify-content-center">
              {Math.round(props.carTrip.distance * 0.75)} CHF
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
