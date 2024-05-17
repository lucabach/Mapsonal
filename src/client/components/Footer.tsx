import { useState } from "react";
import { Row, Image } from "react-bootstrap";
import { MeansOfTransport, TripInfo } from "../../server/model/Types";

import Graph from "./Graph";
import InfoList from "./InfoList";

import bike from "../img/bike.png";
import train from "../img/train.png";
import foot from "../img/walking.png";
import car from "../img/car.png";
import upChevron from "../img/up-chevron.png"


export default function Footer(props: {
  handleCenterContent: (myContent: string) => void;
  handleTransports: (myTransport: MeansOfTransport) => void;
  handlePage: (myDetail: string) => void;
  transport: MeansOfTransport | undefined;
  centerContent: string;
  page: string;
  footTrip: TripInfo;
  trainTrip: TripInfo;
  carTrip: TripInfo;
  bikeTrip: TripInfo;
  searched: boolean;
}) {
  // let trainConsume: number;
  // let carConsume: number;
  // let bikeConsume: number;
  // let footConsume: number;

  // if (
  //   props.bikeTrip === undefined ||
  //   props.carTrip === undefined ||
  //   props.footTrip == undefined ||
  //   props.trainTrip === undefined
  // ) {
  // } else {
  //   trainConsume = props.trainTrip.distance / 100;
  //   carConsume = props.trainTrip.distance / 15;
  //   bikeConsume = 0;
  //   footConsume = 0;
  // }

  // const [footTripLink, setFootTripLink] = useState("");
  // const [footTripLink, setFootTripLink] = useState("");
  // const [footTripLink, setFootTripLink] = useState("");
  // const [footTripLink, setFootTripLink] = useState("");

  const [display, setDisplay] = useState(true);

  const toggleDisplay = () => {
    setDisplay(!display);
  };

  return (
    <>
      <Row className="justify-content-center">
        <label onClick={toggleDisplay}>
          <Image
            style={
              display
                ? {
                    width: "60px",
                    height: "30px",
                    rotate: "180deg",
                    marginLeft: "45%",
                  }
                : { marginLeft: "45%", width: "60px", height: "30px" }
            }
            src={upChevron}
            alt="openclose"
          ></Image>
        </label>
      </Row>
      {props.trainTrip === undefined ||
      props.carTrip === undefined ||
      props.footTrip === undefined ||
      props.bikeTrip === undefined ? (
        <div> Loading </div>
      ) : (
        display &&
        props.searched && (
          <>
            {props.page != "Home" && (
              <div className="titleMainContent justify-content-center">
                {props.centerContent}
              </div>
            )}

            <Graph
              footTrip={props.footTrip}
              carTrip={props.carTrip}
              trainTrip={props.trainTrip}
              bikeTrip={props.bikeTrip}
              centerContent={props.centerContent}
              transport={props.transport}
              handleTransports={props.handleTransports}
            />
          </>
        )
      )}

      <div className="footerVeicles">
        <label onClick={() => props.handleTransports(MeansOfTransport.OnFoot)}>
          <img
            className={
              props.transport === MeansOfTransport.OnFoot
                ? "transportAttiveButton attGreen"
                : "transportPassiveButton inattGreen"
            }
            src={foot}
            alt="walking"
          />
        </label>
        <label onClick={() => props.handleTransports(MeansOfTransport.ByTrain)}>
          <img
            className={
              props.transport === MeansOfTransport.ByTrain
                ? "transportAttiveButton attBlue"
                : "transportPassiveButton inattBlue"
            }
            src={train}
            alt="train"
          />
        </label>

        <label onClick={() => props.handleTransports(MeansOfTransport.ByCar)}>
          <img
            className={
              props.transport === MeansOfTransport.ByCar
                ? "transportAttiveButton attRed"
                : "transportPassiveButton inattRed"
            }
            src={car}
            alt="car"
          />
        </label>
        <label onClick={() => props.handleTransports(MeansOfTransport.ByBike)}>
          <img
            className={
              props.transport === MeansOfTransport.ByBike
                ? "transportAttiveButton attOrange"
                : "transportPassiveButton inattOrange"
            }
            src={bike}
            alt="bikes"
          />
        </label>
      </div>

      {display && props.searched && (
        <InfoList
          footTrip={props.footTrip}
          carTrip={props.carTrip}
          trainTrip={props.trainTrip}
          bikeTrip={props.bikeTrip}
          centerContent={props.centerContent}
          transport={props.transport}
          handleCenterContent={props.handleCenterContent}
          searched={props.searched}
          handlePage={props.handlePage}
        />
      )}
    </>
  );
}
