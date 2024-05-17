//import { XMLParser } from 'fast-xml-parser';

import key from "./ojpKey";

//const parser: any = new XMLParser()

//ACCESS TO API NOT POSSIBLE WITH CURRENT API KEYS :(
//Currently this function is unuseful...

async function getOJPFare(trip: string): Promise<Number> {
  const currentDate = new Date();
  const apiUrl = "https://api.opentransportdata.swiss/ojpfare/";
  const XMLData = `<?xml version="1.0" encoding="UTF-8"?>
    <OJP xmlns="http://www.siri.org.uk/siri" xmlns:ojp="http://www.vdv.de/ojp" version="1.0">
      <OJPRequest>
        <ServiceRequest>
          <RequestTimestamp>${currentDate.toISOString()}</RequestTimestamp>
          <RequestorRef>OJP2NOVA</RequestorRef>
           <ojp:OJPFareRequest>
            <RequestTimestamp>${currentDate.toISOString()}</RequestTimestamp>
            <ojp:TripFareRequest>
              <ojp:Trip>
                ${trip}
              </ojp:Trip>
                            <!-- multiple trips possible -->
            </ojp:TripFareRequest>
            <ojp:Params>
              <ojp:FareAuthorityFilter>ch:1:NOVA</ojp:FareAuthorityFilter>
              <ojp:PassengerCategory>Adult</ojp:PassengerCategory>
              <ojp:TravelClass>second</ojp:TravelClass>
              <ojp:Traveller>
                <ojp:Age>25</ojp:Age>
                <ojp:PassengerCategory>Adult</ojp:PassengerCategory>
                <ojp:EntitlementProducts>
                   <ojp:EntitlementProduct>
                      <ojp:FareAuthorityRef>ch:1:NOVA</ojp:FareAuthorityRef>
                      <ojp:EntitlementProductRef>HTA</ojp:EntitlementProductRef>
                      <ojp:EntitlementProductName>Halbtax-Abonnement</ojp:EntitlementProductName>
                   </ojp:EntitlementProduct>
                </ojp:EntitlementProducts>
              </ojp:Traveller>
            </ojp:Params>
          </ojp:OJPFareRequest>
        </ServiceRequest>
      </OJPRequest>
    </OJP>`;

  const headers = {
    "Content-Type": "application/xml",
    Authorization: `Bearer ${key}`, // Replace with the actual API key
  };

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: XMLData,
      });

      const xmlText = await response.text();

      console.log("answer", xmlText);
    } catch {
      console.log("some error");
    }
  };

  await fetchData();
  return 0;
}

export default getOJPFare;
