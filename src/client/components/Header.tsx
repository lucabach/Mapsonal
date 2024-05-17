import React, { useState } from "react";
import { Button, Form, Row, Col, Image } from "react-bootstrap";
import {
  LocationSuggestion,
  MeansOfTransport,
  TripInfo,
  TripRequest,
} from "../../server/model/Types";

import onFormSubmit from "../functions/onFormSubmit";
import getSuggestions from "../../server/model/getSuggestions";
import upChevron from "../img/up-chevron.png"

export default function Header(props: {
  setFootTrip: React.Dispatch<React.SetStateAction<TripInfo>>;
  setTrainTrip: React.Dispatch<React.SetStateAction<TripInfo>>;
  setCarTrip: React.Dispatch<React.SetStateAction<TripInfo>>;
  setBikeTrip: React.Dispatch<React.SetStateAction<TripInfo>>;
  setShowSpinnerModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSearched: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTrip: React.Dispatch<React.SetStateAction<TripInfo>>;
  transport: MeansOfTransport | undefined;
  tripReqState: TripRequest;
  setTripReqState: React.Dispatch<React.SetStateAction<TripRequest>>;
}) {
  const [display, setDisplay] = useState<boolean>(true);
  const [fromActive, setFromActive] = useState<boolean>(false);
  const [toActive, setToActive] = useState<boolean>(false);

  const toggleDisplay = (): void => {
    setDisplay(!display);
  };

  //This function handles letter changes on the origin input
  function onFromChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.setTripReqState({
      ...props.tripReqState,
      suggestedDestinationLoc: undefined,
      originName: e.target.value,
    });

    if (e.target.value.length > 2) {
      try {
        getSuggestions(e.target.value, setSuggestions);
      } catch (error) {
        let errObj = error as Error;
        alert(errObj.message);
      }
    }
  }

  //This function handles letter changes on the destination input.
  function onToChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.setTripReqState({
      ...props.tripReqState,
      suggestedDestinationLoc: undefined,
      destinationName: e.target.value,
    });

    if (e.target.value.length > 2) {
      try {
        getSuggestions(props.tripReqState.destinationName, setSuggestions);
      } catch (error) {
        let errObj = error as Error;
        alert(errObj.message);
      }
    }
  }

  //This function handles when you click on a suggestion location. Suggestion for is either "from" or "to".
  function handleSelectSuggestion(
    suggestion: LocationSuggestion,
    suggestionFor: string,
  ): void {
    if (suggestionFor === "from") {
      props.setTripReqState({
        ...props.tripReqState,
        suggestedOriginLoc: suggestion.position,
        originName: suggestion.suggestionName,
      });
      console.log(suggestion.suggestionName, "clicked and set");
      setSuggestions([]);
    } else if (suggestionFor === "to") {
      props.setTripReqState({
        ...props.tripReqState,
        suggestedDestinationLoc: suggestion.position,
        destinationName: suggestion.suggestionName,
      });
      console.log(suggestion.suggestionName, "clicked and set");
      setSuggestions([]);
    }
  }

  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);

  return (
    <Form
      className="form"
      method="post"
      encType="multipart/form-data"
      onSubmit={(evt) =>
        onFormSubmit(
          evt,
          props.setFootTrip,
          props.setTrainTrip,
          props.setCarTrip,
          props.setBikeTrip,
          props.setShowSpinnerModal,
          props.setSearched,
          props.setPage,
          props.setSelectedTrip,
          props.transport!,
          props.tripReqState,
        )
      }
    >
      {display && (
        <>
          <Form.Group controlId="from">
            <Form.Control
              autoComplete="off"
              className="roundBoxesHeader"
              type="text"
              placeholder="From..."
              value={props.tripReqState.originName}
              onChange={onFromChange}
              onFocus={() => {
                setFromActive(true);
              }}
              onBlur={() => {
                //PROBLEM: I need to deselect onBlur, but if I do it I cannot select a suggestion
                setFromActive(false);
              }}
            />
            {fromActive && suggestions.length > 0 && (
              <div className="autocomplete-list">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onMouseDown={() =>
                      handleSelectSuggestion(suggestion, "from")
                    }
                    className="autocompleteText"
                  >
                    {suggestion.suggestionName}
                  </button>
                ))}
              </div>
            )}
          </Form.Group>
          <Form.Group controlId="to">
            <Form.Control
              autoComplete="off"
              className="roundBoxesHeader"
              type="text"
              placeholder="To..."
              value={props.tripReqState.destinationName}
              onChange={onToChange}
              onFocus={() => {
                setToActive(true);
              }}
              onBlur={() => {
                setToActive(false);
              }}
            />
            {toActive && suggestions.length > 0 && (
              <div className="autocomplete-list">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onMouseDown={() => handleSelectSuggestion(suggestion, "to")}
                    className="autocompleteText"
                  >
                    {suggestion.suggestionName}
                  </button>
                ))}
              </div>
            )}
          </Form.Group>
          <Row>
            <Col xs={8}>
              <Form.Group controlId="datetime">
                <Form.Control
                  className="roundBoxesHeader"
                  size="sm"
                  type="datetime-local"
                  defaultValue={props.tripReqState.date}
                />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Button className="searchButton" variant="primary" type="submit">
                GO
              </Button>
            </Col>
          </Row>
        </>
      )}
      <Row className="justify-content-center">
        <label onClick={toggleDisplay}>
          <Image
            style={
              !display
                ? {
                    width: "60px",
                    height: "30px",
                    rotate: "180deg",
                    marginLeft: "40%",
                  }
                : { marginLeft: "40%", width: "60px", height: "30px" }
            }
            src={upChevron}
            alt="openclose"
          ></Image>
        </label>
      </Row>
    </Form>
  );
}
