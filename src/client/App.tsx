import { useState } from "react";
import { Modal, Row, Spinner } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "./components/Footer";

import MapSteven from "./MapSteven";
import { MeansOfTransport, TripInfo, TripRequest } from "../server/model/Types";
import TrainTripDisplay from "./components/TrainTripDisplay";

export default function App() {
  const [showSpinnerModal, setShowSpinnerModal] = useState(false);
  const [searched, setSearched] = useState(false);

  const [tripReqState, setTripReqState] = useState<TripRequest>({
    originName: "",
    suggestedOriginLoc: undefined,
    destinationName: "",
    suggestedDestinationLoc: undefined,
    date: new Date().toISOString().slice(0, 16),
  });

  // Format the date as YYYY-MM-DDThh:mm (required by datetime-local input)

  const [footTrip, setFootTrip] = useState<TripInfo>({
    transport: [],
    positionsList: [],
    loaded: false,
    duration: "0h0m",
    distance: 0,
    cost: 0.0,
    emissions: 0.0,
  });
  const [trainTrip, setTrainTrip] = useState<TripInfo>({
    transport: [],
    positionsList: [],
    loaded: false,
    duration: "0h0m",
    distance: 0,
    cost: 0.0,
    emissions: 0.0,
  });

  const [carTrip, setCarTrip] = useState<TripInfo>({
    transport: [],
    positionsList: [],
    loaded: false,
    duration: "0h0m",
    distance: 0,
    cost: 0.0,
    emissions: 0.0,
  });

  const [bikeTrip, setBikeTrip] = useState<TripInfo>({
    transport: [],
    positionsList: [],
    loaded: false,
    duration: "0h0m",
    distance: 0,
    cost: 0.0,
    emissions: 0.0,
  });

  const [centerContent, setCenterContent] = useState("");
  const [selectedTrip, setSelectedTrip] = useState({} as TripInfo);
  const [transport, setTransport] = useState<MeansOfTransport | undefined>(
    MeansOfTransport.ByTrain,
  );

  const handleCenterContent = (myContent: string) => {
    if (centerContent === myContent) {
      setCenterContent("");
    } else {
      setCenterContent(myContent);
    }
  };

  const handleTransports = (mytransport: MeansOfTransport) => {
    if (transport == mytransport) {
      setTransport(undefined);
      handleCenterContent("");
    } else {
      setTransport(mytransport);
    }
    switch (transport) {
      case MeansOfTransport.OnFoot:
        setSelectedTrip(footTrip);
        break;
      case MeansOfTransport.ByTrain:
        setSelectedTrip(trainTrip);
        break;
      case MeansOfTransport.ByCar:
        setSelectedTrip(carTrip);
        break;
      case MeansOfTransport.ByBike:
        setSelectedTrip(bikeTrip);
        break;
    }
  };

  const [page, setPage] = useState("Home");

  const handlePage = (page: string) => {
    setPage(page);
  };

  return (
    <>
      {(page == "Home" || page == "Home2") && (
        <div className="headerBox">
          <Row>
            <Header
              setFootTrip={setFootTrip}
              setTrainTrip={setTrainTrip}
              setCarTrip={setCarTrip}
              setBikeTrip={setBikeTrip}
              setShowSpinnerModal={setShowSpinnerModal}
              setSearched={setSearched}
              setPage={setPage}
              setSelectedTrip={setSelectedTrip}
              transport={transport}
              tripReqState={tripReqState}
              setTripReqState={setTripReqState}
            />
          </Row>
        </div>
      )}
      {page == "Home2" && (
        <div className="footerBox">
          <Row>
            <Footer
              handleCenterContent={handleCenterContent}
              handleTransports={handleTransports}
              handlePage={handlePage}
              transport={transport}
              centerContent={centerContent}
              page={page}
              footTrip={footTrip}
              trainTrip={trainTrip}
              carTrip={carTrip}
              bikeTrip={bikeTrip}
              searched={searched}
            />
          </Row>
        </div>
      )}

      {page == "moreInfo" && transport !== undefined && (
        <TrainTripDisplay
          footTrip={footTrip}
          trainTrip={trainTrip}
          carTrip={carTrip}
          bikeTrip={bikeTrip}
          trip={selectedTrip.transport}
          transport={transport}
          from={tripReqState.originName}
          to={tripReqState.destinationName}
          goback={() => handlePage("Home2")}
        />
      )}
      {page != "moreInfo" && (
        <div className="MapContainer">
          <MapSteven
            trainTrip={trainTrip}
            footTrip={footTrip}
            carTrip={carTrip}
            bikeTrip={bikeTrip}
            transport={transport}
            setTransport={setTransport}
          />
        </div>
      )}

      {/* Spinner modal */}
      <Modal
        size="sm"
        show={showSpinnerModal}
        onHide={() => setShowSpinnerModal(false)}
        aria-labelledby="spinner-modal"
      >
        <Modal.Header closeButton={false}>
          <Modal.Title id="spinner-modal">
            Fetching available routes...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Modal.Body>
      </Modal>
    </>
  );
}
