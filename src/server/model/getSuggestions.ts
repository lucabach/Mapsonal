import { XMLParser } from "fast-xml-parser";

import key from "./ojpKey";
import { LocationSuggestion, Coords } from "./Types";

const parser: any = new XMLParser();

async function getSuggestions(
  input: string,
  setSuggestions: React.Dispatch<React.SetStateAction<LocationSuggestion[]>>,
): Promise<LocationSuggestion[]> {
  console.log("getSuggestions() called", input);

  let suggestions: LocationSuggestion[] = [];

  const apiUrl = "https://api.opentransportdata.swiss/ojp2020";
  const currentDate = new Date();
  const xmlData = `
    <?xml version="1.0" encoding="UTF-8"?>
    <OJP xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://www.siri.org.uk/siri" version="1.0" xmlns:ojp="http://www.vdv.de/ojp" xsi:schemaLocation="http://www.siri.org.uk/siri ../ojp-xsd-v1.0/OJP.xsd">
        <OJPRequest>
            <ServiceRequest>
                <RequestTimestamp>${currentDate.toISOString()}</RequestTimestamp>
                <RequestorRef>API-Explorer</RequestorRef>
                <ojp:OJPLocationInformationRequest>
                    <RequestTimestamp>${currentDate.toISOString()}</RequestTimestamp>
                    <ojp:InitialInput>
                        <ojp:LocationName>${input}</ojp:LocationName>
                    </ojp:InitialInput>
                    <ojp:Restrictions>
                        <ojp:Type>stop</ojp:Type>
                        <ojp:NumberOfResults>4</ojp:NumberOfResults>
                        <ojp:IncludePtModes>false</ojp:IncludePtModes>
                    </ojp:Restrictions>
                </ojp:OJPLocationInformationRequest>
            </ServiceRequest>
        </OJPRequest>
    </OJP>
    `;
  const headers = {
    "Content-Type": "application/xml",
    Authorization: `Bearer ${key}`, // Replace with the actual API key
  };

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: xmlData,
      });

      const xmlText = await response.text();

      const result: any = parser.parse(xmlText);

      // TODO: ADD ERROR HANDLING IN CASE INPUT CANNOT BE FOUND
      if (result !== null) {
        const recSuggestions =
          result["siri:OJP"]["siri:OJPResponse"]["siri:ServiceDelivery"][
            "ojp:OJPLocationInformationDelivery"
          ]["ojp:Location"];
        console.log(recSuggestions);
        if (recSuggestions === undefined) {
          return;
        }

        for (let i = 0; i < recSuggestions.length; i++) {
          if (recSuggestions[i]["ojp:Complete"]) {
            const probability = recSuggestions[i]["ojp:Probability"];
            if (probability > 0.85) {
              const locationName =
                recSuggestions[i]["ojp:Location"]["ojp:StopPlace"][
                  "ojp:StopPlaceName"
                ]["ojp:Text"];
              const longitude =
                recSuggestions[i]["ojp:Location"]["ojp:GeoPosition"][
                  "siri:Longitude"
                ];
              const latitude =
                recSuggestions[i]["ojp:Location"]["ojp:GeoPosition"][
                  "siri:Latitude"
                ];
              const coord: Coords = {
                longitude: longitude,
                latitude: latitude,
              };
              suggestions.push({
                suggestionName: locationName,
                position: coord,
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  await fetchData();

  setSuggestions(suggestions);

  return suggestions;
}

export default getSuggestions;
