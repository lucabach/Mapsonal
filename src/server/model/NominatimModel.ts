import { Coords, NominatimRes } from "./Types";

export class NominatimModel {
  /**
   * Looks for a place's coordinates by querying Nominatim API for a given string.
   * @throws Error in case a network error occurs, the Nominatim API returns any HTTP status code other than 200 "OK", or if the place was not found by Nominatim's API.
   * @param placeName The name of the place to look up.
   * @returns Promise<Coords> A Promise that resolves to an object of type Coords
   * containing the longitude and latitude of the place that was searched.
   */
  public static async getCoordsByName(placeName: string): Promise<Coords> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${placeName}`;
    // Fetch Nominatim's API to obtain information on the given place.
    const res = await fetch(url);
    // If an HTTP status code other than 200 "OK" is returned, then throw an error
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    // Debug information
    //console.log(`Gotten data for place ${placeName}`);
    //console.log(res);
    // Parse JSON body of response
    const jsonObj: NominatimRes | undefined = (await res.json())[0];
    // If no such place was found, Nominatim's API will return an empty body, which will be parsed as `undefined` by `Body.json()`.
    // Thus, if the `jsonObj` tied to the response is undefined, that means that the place was never found.
    if (jsonObj === undefined) {
      throw new Error(`Could not find place ${placeName} on map.`);
    }
    // Return longitude and latitude
    return { longitude: jsonObj.lon, latitude: jsonObj.lat };
  }
}
