import { XMLParser } from "fast-xml-parser";

import key from "./ojpKey";
import { Coords, OjpLegInfo, TripInfo } from "./Types";
//import getOJPFare from './getOJPFare';

const parser: any = new XMLParser();

async function getOJPTripStops(
  depTime: string,
  dep: Coords,
  depName: string,
  arr: Coords,
  arrName: string,
): Promise<TripInfo> {
  let tripObject: TripInfo = {
    transport: [],
    positionsList: [],
    loaded: true,
    duration: "0",
    distance: 0,
    cost: 0.0,
    emissions: 0,
  };
  const depLong = dep.longitude;
  const depLat = dep.latitude;

  const arrLong = arr.longitude;
  const arrLat = arr.latitude;

  const currentDate = new Date();
  const apiUrl = "https://api.opentransportdata.swiss/ojp2020";
  const xmlData = `<?xml version="1.0" encoding="utf-8"?>
    <OJP xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://www.siri.org.uk/siri" version="1.0" xmlns:ojp="http://www.vdv.de/ojp" xsi:schemaLocation="http://www.siri.org.uk/siri ../ojp-xsd-v1.0/OJP.xsd">
        <OJPRequest>
            <ServiceRequest>
                <RequestTimestamp>${currentDate.toISOString()}</RequestTimestamp>
                <RequestorRef>API-Explorer</RequestorRef>
                <ojp:OJPTripRequest>
                    <RequestTimestamp>${currentDate.toISOString()}</RequestTimestamp>
                    <ojp:Origin>
                        <ojp:PlaceRef>
                            <ojp:GeoPosition>
                                <Longitude>${depLong}</Longitude>
                                <Latitude>${depLat}</Latitude>
                            </ojp:GeoPosition>
                            <ojp:LocationName>
                                <ojp:Text>${depName}</ojp:Text>
                            </ojp:LocationName>
                        </ojp:PlaceRef>
                        <ojp:DepArrTime>${depTime}</ojp:DepArrTime>
                    </ojp:Origin>
                    <ojp:Destination>
                        <ojp:PlaceRef>
                            <ojp:GeoPosition>
                                <Longitude>${arrLong}</Longitude>
                                <Latitude>${arrLat}</Latitude>
                            </ojp:GeoPosition>
                            <ojp:LocationName>
                                <obj:Text>${arrName}</obj:Text>
                            </ojp:LocationName>
                        </ojp:PlaceRef>
                    </ojp:Destination>
                    <ojp:Params>
                        <ojp:IncludeTrackSections>true</ojp:IncludeTrackSections>
                        <ojp:IncludeTurnDescription></ojp:IncludeTurnDescription>
                        <ojp:IncludeLegProjection>true</ojp:IncludeLegProjection>
                        <ojp:IncludeIntermediateStops>true</ojp:IncludeIntermediateStops>

                    </ojp:Params>
                </ojp:OJPTripRequest>
            </ServiceRequest>
        </OJPRequest>
    </OJP>`;
  const headers = {
    "Content-Type": "application/xml",
    Authorization: `Bearer ${key}`, // Replace with the actual API key
  };

  const fetchData = async () => {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: xmlData,
    });

    const xmlText = await response.text();

    const result: any = parser.parse(xmlText);

    //const trip = result!['siri:OJP']!['siri:OJPResponse']!['siri:ServiceDelivery']!!['ojp:OJPTripDelivery']!['ojp:TripResult']![0]['ojp:Trip']!
    //getOJPFare(parser.parse(trip));
    if (
      result !== null &&
      result !== undefined &&
      result!["siri:OJP"] !== undefined &&
      result["siri:OJP"]["siri:OJPResponse"] !== undefined &&
      result["siri:OJP"]["siri:OJPResponse"]["siri:ServiceDelivery"] !==
        undefined &&
      result["siri:OJP"]["siri:OJPResponse"]["siri:ServiceDelivery"][
        "ojp:OJPTripDelivery"
      ] !== undefined &&
      result["siri:OJP"]["siri:OJPResponse"]["siri:ServiceDelivery"][
        "ojp:OJPTripDelivery"
      ]["ojp:TripResult"] !== undefined &&
      result["siri:OJP"]["siri:OJPResponse"]["siri:ServiceDelivery"][
        "ojp:OJPTripDelivery"
      ]["ojp:TripResult"][0] !== undefined &&
      result["siri:OJP"]["siri:OJPResponse"]["siri:ServiceDelivery"][
        "ojp:OJPTripDelivery"
      ]["ojp:TripResult"][0]["ojp:Trip"] !== undefined &&
      result["siri:OJP"]["siri:OJPResponse"]["siri:ServiceDelivery"][
        "ojp:OJPTripDelivery"
      ]["ojp:TripResult"][0]["ojp:Trip"]["ojp:TripLeg"] !== undefined
    ) {
      const ojpTrip =
        result["siri:OJP"]["siri:OJPResponse"]["siri:ServiceDelivery"][
          "ojp:OJPTripDelivery"
        ]["ojp:TripResult"][0]["ojp:Trip"]["ojp:TripLeg"];

      tripObject.distance = Math.floor(
        result!["siri:OJP"]!["siri:OJPResponse"]!["siri:ServiceDelivery"]!![
          "ojp:OJPTripDelivery"
        ]!["ojp:TripResult"]![0]!["ojp:Trip"]!["ojp:Distance"] / 1000,
      );
      const duration =
        result!["siri:OJP"]!["siri:OJPResponse"]!["siri:ServiceDelivery"]!![
          "ojp:OJPTripDelivery"
        ]!["ojp:TripResult"]![0]!["ojp:Trip"]!["ojp:Duration"];
      tripObject.duration = duration
        .replace("PT", "")
        .replace("M", "m")
        .replace("H", "h ");

      for (let i = 0; i < ojpTrip.length; i++) {
        if (ojpTrip[i]["ojp:TimedLeg"] !== undefined) {
          let leg: OjpLegInfo = {
            startPointName: "",
            startTime: undefined,
            arrivalName: undefined,
            arrivalTime: undefined,
            plannedDepQuay: undefined,
            plannedArrQuay: undefined,
            line: undefined,
            destination: undefined,
          };
          leg.startPointName =
            ojpTrip[i]["ojp:TimedLeg"]["ojp:LegBoard"]["ojp:StopPointName"][
              "ojp:Text"
            ];
          leg.startTime =
            ojpTrip[i]["ojp:TimedLeg"]["ojp:LegBoard"]["ojp:ServiceDeparture"][
              "ojp:TimetabledTime"
            ];
          leg.arrivalName =
            ojpTrip[i]["ojp:TimedLeg"]["ojp:LegAlight"]["ojp:StopPointName"][
              "ojp:Text"
            ];
          leg.arrivalTime =
            ojpTrip[i]["ojp:TimedLeg"]["ojp:LegAlight"]["ojp:ServiceArrival"][
              "ojp:TimetabledTime"
            ];

          let plannedDepQuay =
            ojpTrip[i]["ojp:TimedLeg"]["ojp:LegBoard"]["ojp:PlannedQuay"];
          if (plannedDepQuay !== undefined) {
            leg.plannedDepQuay = plannedDepQuay["ojp:Text"];
          } else {
            leg.plannedDepQuay = "";
          }

          let plannedArrQuay =
            ojpTrip[i]["ojp:TimedLeg"]["ojp:LegAlight"]["ojp:PlannedQuay"];
          if (plannedArrQuay !== undefined) {
            leg.plannedArrQuay = plannedArrQuay["ojp:Text"];
          } else {
            leg.plannedArrQuay = "";
          }

          leg.line =
            ojpTrip[i]["ojp:TimedLeg"]["ojp:Service"]["ojp:PublishedLineName"][
              "ojp:Text"
            ];
          leg.destination =
            ojpTrip[i]["ojp:TimedLeg"]["ojp:Service"]["ojp:DestinationText"][
              "ojp:Text"
            ];

          tripObject.transport.push(leg);

          const pathPositions =
            ojpTrip[i]["ojp:TimedLeg"]["ojp:LegTrack"]["ojp:TrackSection"][
              "ojp:LinkProjection"
            ]["ojp:Position"];

          let countPositions = 0;
          for (let i = 0; i < pathPositions.length; i += 1) {
            const coord = [
              pathPositions[i]["siri:Latitude"],
              pathPositions[i]["siri:Longitude"],
            ];
            tripObject.positionsList.push(coord);
            countPositions++;
          }

          if (countPositions < 5) {
            console.log(ojpTrip[i]["ojp:TimedLeg"]);
          }
        }

        if (ojpTrip[i]["ojp:TranferLeg"] !== undefined) {
          const pathPositions =
            ojpTrip[i]["ojp:ContinuousLeg"]["ojp:LegTrack"]["ojp:TrackSection"][
              "ojp:LinkProjection"
            ]["ojp:Position"];
          for (let i = 0; i < pathPositions.length; i += 1) {
            const coord = [
              pathPositions[i]["siri:Latitude"],
              pathPositions[i]["siri:Longitude"],
            ];
            tripObject.positionsList.push(coord);
          }
        }

        if (ojpTrip[i]["ojp:ContinuousLeg"] !== undefined) {
          const pathPositions =
            ojpTrip[i]["ojp:ContinuousLeg"]["ojp:LegTrack"]["ojp:TrackSection"][
              "ojp:LinkProjection"
            ]["ojp:Position"];
          for (let i = 0; i < pathPositions.length; i += 1) {
            const coord = [
              pathPositions[i]["siri:Latitude"],
              pathPositions[i]["siri:Longitude"],
            ];
            tripObject.positionsList.push(coord);
          }
        }
      }
    } else {
      throw new Error(
        `Could not get SBB train trip information between ${depName} and ${arrName}.`,
      );
    }
  };

  await fetchData();

  return tripObject;
}

export default getOJPTripStops;
