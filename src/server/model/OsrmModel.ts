import { Coords, OsrmRes } from "./Types";
import key from "./graphhopperkey";

export class OsrmModel {
  private static async fetchOsmr(bodyRequest: any): Promise<OsrmRes> {
    // Fetch OSRM's API to obtain information on the route between the two places.
    const query = new URLSearchParams({
      key: key,
    }).toString();

    const res = await fetch(`https://graphhopper.com/api/1/route?${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyRequest),
    });

    //const res = await fetch(url);
    // If an HTTP status code other than 200 "OK" is returned, then throw an error
    if (!res.ok) {
      throw `HTTP error! status: ${res.status}.`;
    }
    // Debug information
    //console.log(res);
    // Parse JSON body of response
    const osmrJson: OsrmRes = await res.json();
    //console.log(osmrJson);
    // Return parsed response object
    return osmrJson;
  }

  public static async getRouteByCar(
    origin: Coords,
    destination: Coords,
  ): Promise<OsrmRes> {
    //console.log(`Getting data for route by car from (${origin.latitude}, ${origin.longitude}) to (${destination.latitude}, ${destination.longitude})`);
    //console.log(`Sending request to https://graphhopper.com/api/1/route?vehicle=car&point=${origin.longitude},${origin.latitude}&point=${destination.longitude},${destination.latitude}&alternatives=true&steps=true&overview=simplified&key=${key}`);
    //const osrmUrl = `https://graphhopper.com/api/1/route?vehicle=car&point=${origin.longitude},${origin.latitude}&point=${destination.longitude},${destination.latitude}&points_encoded=false&details=street_name&details=distance&details=time&key=${key}`;

    const body = {
      points: [
        [origin.longitude, origin.latitude],
        [destination.longitude, destination.latitude],
      ],
      snap_preventions: [],
      details: ["road_class", "surface", "street_name", "distance", "time"],
      profile: "car",
      locale: "en",
      instructions: true,
      calc_points: true,
      points_encoded: false,
    };

    return await this.fetchOsmr(body);
  }

  public static async getRouteByBike(
    origin: Coords,
    destination: Coords,
  ): Promise<OsrmRes> {
    //console.log(`Getting data for route by bike from (${origin.latitude}, ${origin.longitude}) to (${destination.latitude}, ${destination.longitude})`);
    //console.log(`Sending request to https://graphhopper.com/api/1/route?vehicle=bike&point=${origin.longitude},${origin.latitude}&point=${destination.longitude},${destination.latitude}&alternatives=true&steps=true&overview=simplified&key=${key}`);
    //const osrmUrl = `https://graphhopper.com/api/1/route?vehicle=bike&point=${origin.longitude},${origin.latitude}&point=${destination.longitude},${destination.latitude}&points_encoded=false&details=street_name&details=distance&details=time&key=${key}`;

    const body = {
      points: [
        [origin.longitude, origin.latitude],
        [destination.longitude, destination.latitude],
      ],
      snap_preventions: ["motorway"],
      details: ["road_class", "surface", "street_name", "distance", "time"],
      profile: "bike",
      locale: "en",
      instructions: true,
      calc_points: true,
      points_encoded: false,
    };

    return await this.fetchOsmr(body);
  }

  public static async getRouteOnFoot(
    origin: Coords,
    destination: Coords,
  ): Promise<OsrmRes> {
    //console.log(`Getting data for route on foot from (${origin.latitude}, ${origin.longitude}) to (${destination.latitude}, ${destination.longitude})`);
    //console.log(`Sending request to https://graphhopper.com/api/1/route?vehicle=foot&point=${origin.longitude},${origin.latitude}&point=${destination.longitude},${destination.latitude}&alternatives=true&steps=true&overview=simplified&key=${key}`);
    //const osrmUrl = `https://graphhopper.com/api/1/route?vehicle=foot&point=${origin.longitude},${origin.latitude}&point=${destination.longitude},${destination.latitude}&points_encoded=false&details=street_name&details=distance&details=time&key=${key}`;

    const body = {
      points: [
        [origin.longitude, origin.latitude],
        [destination.longitude, destination.latitude],
      ],
      snap_preventions: ["motorway", "ferry", "tunnel"],
      details: ["road_class", "surface", "street_name", "distance", "time"],
      profile: "foot",
      locale: "en",
      instructions: true,
      calc_points: true,
      points_encoded: false,
    };

    return await this.fetchOsmr(body);
  }
}
