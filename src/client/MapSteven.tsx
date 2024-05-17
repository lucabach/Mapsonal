import {
  MapContainer,
  TileLayer,
  Polyline,
  useMapEvent,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import React, { useEffect, useRef, useState } from "react";
import { MeansOfTransport, TripInfo } from "../server/model/Types";
import { LatLng } from "leaflet";
import L from "leaflet";

const LeafletMap = (props: {
  trainTrip: TripInfo;
  footTrip: TripInfo;
  carTrip: TripInfo;
  bikeTrip: TripInfo;
  transport: MeansOfTransport | undefined;
  setTransport: React.Dispatch<
    React.SetStateAction<MeansOfTransport | undefined>
  >;
}) => {
  //const departureTime = '2023-12-15T17:20:20'

  const [position, setPosition] = useState<LatLng>(
    new LatLng(46.82852, 8.246107),
  );
  const [zoom, setZoom] = useState(8);
  const [reload, setReload] = useState("false");

  useEffect(() => {
    if (props.footTrip.loaded) {
      const longitude =
        (parseFloat(props.footTrip.positionsList[0][0]) +
          parseFloat(
            props.footTrip.positionsList[
              props.footTrip.positionsList.length - 1
            ][0],
          )) /
        2;
      const latitude =
        (parseFloat(props.footTrip.positionsList[0][1]) +
          parseFloat(
            props.footTrip.positionsList[
              props.footTrip.positionsList.length - 1
            ][1],
          )) /
        2;
      setPosition(new LatLng(latitude, longitude));
      setZoom(
        getZoomLevel(
          props.footTrip.positionsList[0][0],
          parseFloat(props.footTrip.positionsList[0][1]),
          props.footTrip.positionsList[
            props.footTrip.positionsList.length - 1
          ][0],
          parseFloat(
            props.footTrip.positionsList[
              props.footTrip.positionsList.length - 1
            ][1],
          ),
        ),
      );
    }
  }, [props.footTrip]);

  //this reloads the map when something changes.
  //how it works: the mapcontainer reloads when the prop key changes
  // (If somebody finds a better way please change this!)
  useEffect(() => {
    if (props.footTrip.loaded) {
      setReload(reload === "false" ? "true" : "false");
    }
  }, [props.transport, props.footTrip]);

  function getZoomLevel(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    // Calculate distance using Haversine formula
    const R: number = 6371; // Earth radius in kilometers
    const dLat: number = (lat2 - lat1) * (Math.PI / 180);
    const dLon: number = (lon2 - lon1) * (Math.PI / 180);
    let a: number =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c: number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance: number = R * c; // Distance in kilometers
    console.log("computed distance", distance);
    // Get the diagonal screen distance in pixels

    let zoom = 0;
    if (distance < 3) {
      zoom = 16;
    } else if (distance < 3.5) {
      zoom = 15;
    } else if (distance < 4.5) {
      zoom = 14;
    } else if (distance < 5.5) {
      zoom = 13;
    } else if (distance < 7) {
      zoom = 12;
    } else if (distance < 9) {
      zoom = 11;
    } else if (distance < 15) {
      zoom = 10;
    } else if (distance < 50) {
      zoom = 9;
    } else if (distance < 100) {
      zoom = 8;
    } else if (distance < 200) {
      zoom = 7;
    } else {
      zoom = 6;
    }

    console.log("computed zoom", zoom);

    return zoom;
  }

  const trainPolylineRef = useRef<L.Polyline>(null);
  const footPolylineRef = useRef<L.Polyline>(null);
  const carPolylineRef = useRef<L.Polyline>(null);
  const bikePolylineRef = useRef<L.Polyline>(null);
  const mapRef = useRef<L.Map | null>(null);

  //This function is run when clicking on a trip line.
  //It activates/deactivates the tipe of transport of the line clicked
  const handlePolylineClick = (
    t: MeansOfTransport,
    polylineRef: React.RefObject<L.Polyline>,
  ) => {
    if (props.transport === t) {
      props.setTransport(undefined);
    } else {
      props.setTransport(t);
      if (mapRef.current && polylineRef.current) {
        const bounds = polylineRef.current.getBounds();
        mapRef.current.fitBounds(bounds);
      }
    }
  };

  //This component is placed inside the map container, it allows easy access to map controls.
  function MapSettings() {
    const zoom = useMapEvent("zoomend", () => {
      if (zoom !== undefined) {
        setZoom(zoom.getZoom());
        setPosition(zoom.getCenter());
      }
    });
    const center = useMapEvent("dragend", () => {
      if (center !== undefined) {
        setZoom(center.getZoom());
        setPosition(center.getCenter());
      }
    });
    return null;
  }

  var destCoord = null;
  var lastPosition = null;

  if (
    props.footTrip &&
    props.footTrip.loaded &&
    props.footTrip.positionsList.length > 0
  ) {
    lastPosition =
      props.footTrip.positionsList[props.footTrip.positionsList.length - 1];
    destCoord = new LatLng(lastPosition[1], lastPosition[0]);
  }

  var arrivalIcon = L.icon({
    iconUrl: "../../../src/client/img/checkered-flag.png",
    iconSize: [30, 30],
    iconAnchor: lastPosition ? [lastPosition[0], lastPosition[1]] : undefined,
    className: "arrIcon",
  });

  /*THE MAP COMPONENT
  The *apparently* redundant polylines are the solution for placing the active lines on top of the other trips
  and for showing the borders of the other trips.
   */
  return (
    <div>
      <MapContainer
        key={reload}
        center={position}
        zoom={zoom}
        zoomControl={false}
      >
        <MapSettings />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.trainTrip.loaded &&
          props.transport !== MeansOfTransport.ByTrain && (
            <Polyline
              className="polyLineTrain"
              positions={props.trainTrip.positionsList}
              color="rgb(92, 103, 161)"
              weight={6}
              ref={trainPolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(
                    MeansOfTransport.ByTrain,
                    trainPolylineRef,
                  );
                },
              }}
            />
          )}

        {props.footTrip!.loaded &&
          props.transport !== MeansOfTransport.OnFoot && (
            <Polyline
              className="polyLineFoot"
              positions={props.footTrip.positionsList.map((item) => [
                item[1],
                item[0],
              ])}
              color={"#b7ab00"}
              weight={6}
              ref={footPolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(MeansOfTransport.OnFoot, footPolylineRef);
                },
              }}
            />
          )}
        {props.carTrip!.loaded &&
          props.transport !== MeansOfTransport.ByCar && (
            <Polyline
              className="polyLineCar"
              positions={props.carTrip.positionsList.map((item) => [
                item[1],
                item[0],
              ])}
              color={"rgb(160, 86, 86)"}
              weight={6}
              ref={carPolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(MeansOfTransport.ByCar, carPolylineRef);
                },
              }}
            />
          )}
        {props.bikeTrip!.loaded &&
          props.transport !== MeansOfTransport.ByBike && (
            <Polyline
              className="polyLineBike"
              positions={props.bikeTrip.positionsList.map((item) => [
                item[1],
                item[0],
              ])}
              color={"rgb(168, 115, 15)"}
              weight={6}
              ref={bikePolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(MeansOfTransport.ByBike, bikePolylineRef);
                },
              }}
            />
          )}

        {/*We want the active polyline to be the last one called as it should cover the other ones*/}

        {props.trainTrip.loaded &&
          props.transport === MeansOfTransport.ByTrain && (
            <Polyline
              positions={props.trainTrip.positionsList}
              color="rgb(92, 103, 161)"
              weight={15}
              ref={trainPolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(
                    MeansOfTransport.ByTrain,
                    trainPolylineRef,
                  );
                },
              }}
            />
          )}

        {props.trainTrip.loaded &&
          props.transport === MeansOfTransport.ByTrain && (
            <Polyline
              positions={props.trainTrip.positionsList}
              color={"rgb(20, 0, 200)"}
              weight={9}
              ref={trainPolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(
                    MeansOfTransport.ByTrain,
                    trainPolylineRef,
                  );
                },
              }}
            />
          )}

        {props.footTrip!.loaded &&
          props.transport === MeansOfTransport.OnFoot && (
            <Polyline
              positions={props.footTrip.positionsList.map((item) => [
                item[1],
                item[0],
              ])}
              color={"#b7ab00"}
              weight={15}
              ref={footPolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(MeansOfTransport.OnFoot, footPolylineRef);
                },
              }}
            />
          )}

        {props.footTrip!.loaded &&
          props.transport === MeansOfTransport.OnFoot && (
            <Polyline
              positions={props.footTrip.positionsList.map((item) => [
                item[1],
                item[0],
              ])}
              color="rgb(232, 236, 0)"
              weight={9}
              ref={footPolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(MeansOfTransport.OnFoot, footPolylineRef);
                },
              }}
            />
          )}

        {props.carTrip!.loaded &&
          props.transport === MeansOfTransport.ByCar && (
            <Polyline
              positions={props.carTrip.positionsList.map((item) => [
                item[1],
                item[0],
              ])}
              color="rgb(160, 86, 86)"
              weight={15}
              ref={carPolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(MeansOfTransport.ByCar, carPolylineRef);
                },
              }}
            />
          )}

        {props.carTrip!.loaded &&
          props.transport === MeansOfTransport.ByCar && (
            <Polyline
              positions={props.carTrip.positionsList.map((item) => [
                item[1],
                item[0],
              ])}
              color="rgb(190, 0, 0)"
              weight={9}
              ref={carPolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(MeansOfTransport.ByCar, carPolylineRef);
                },
              }}
            />
          )}

        {props.bikeTrip!.loaded &&
          props.transport === MeansOfTransport.ByBike && (
            <Polyline
              positions={props.bikeTrip.positionsList.map((item) => [
                item[1],
                item[0],
              ])}
              color={"rgb(168, 115, 15)"}
              weight={15}
              ref={bikePolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(MeansOfTransport.ByBike, bikePolylineRef);
                },
              }}
            />
          )}
        {props.bikeTrip!.loaded &&
          props.transport === MeansOfTransport.ByBike && (
            <Polyline
              positions={props.bikeTrip.positionsList.map((item) => [
                item[1],
                item[0],
              ])}
              color={"rgb(230, 104, 0)"}
              weight={9}
              ref={bikePolylineRef}
              eventHandlers={{
                click: () => {
                  handlePolylineClick(MeansOfTransport.ByBike, bikePolylineRef);
                },
              }}
            />
          )}

        {destCoord && <Marker position={destCoord} icon={arrivalIcon} />}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
