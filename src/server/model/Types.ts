export type NominatimRes = {
  addresstype: string;
  boundingbox: Array<number>;
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  place_rank: number;
  type: string;
};

export type LocationSuggestion = {
  suggestionName: string;
  position: Coords;
};

export type TripRequest = {
  originName: string;
  suggestedOriginLoc: Coords | undefined;
  destinationName: string;
  suggestedDestinationLoc: Coords | undefined;
  date: string;
};

export type Coords = {
  longitude: string;
  latitude: string;
};
/**
 * Additional information for your request
 */
type ResponseInfo = {
  /**
   * Attribution according to GraphHopper documentation is necessary if no white-label option included.
   */
  copyrights: Array<string>;
  /**
   * How much time the request took
   */
  took: number;
};

/**
 * A response obtained by fetching the OSRM (Open Source Map Routing) API. Contains the following properties:
 * - `code`: if the request was successful, will be "Ok", otherwise will be "NoRoute" to signify that no route has been found,
 * - `message`: an optional human-readable error message,
 * - `routes`: an array of `Route` objects, ordered by descending recommendation rank,
 * - `waypoints`: an array of `Waypoint` objects representing all waypoints in order.
 */
export type OsrmRes = {
  info: ResponseInfo;
  message?: string;
  /**
   * Optional error information.
   */
  hints: Array<Object>;
  paths: Array<RouteResponsePath>;
};

type RouteInstruction = {
  /**
   * A description what the user has to do in order to follow the route. The language depends on the locale parameter.
   */
  text: string;
  /**
   * The name of the street to turn onto in order to follow the route.
   */
  street_name: string;
  /**
   * The distance for this instruction, in meters.
   * @type number<double>
   */
  distance: number;
  /**
   * The duration for this instruction, in milliseconds.
   * @type integer <int32>
   */
  time: number;
  /**
   * Two indices into points, referring to the beginning and the end of the segment of the route this instruction refers to.
   * @type Array<int32>
   */
  interval: Array<number>;
  /**
   * A number which specifies the sign to show:
   * - `-98`: an U-turn without the knowledge if it is a right or left U-turn
   * - `-8`: a left U-turn
   * - `-7`: keep left
   * - `-6`: (**not yet used**) leave roundabout
   * - `-3`: turn sharp left
   * - `-2`: turn left
   * - `-1`: turn slight left
   * - `0`: continue on street
   * - `1`: turn slight right
   * - `2`: turn right
   * - `3`: turn sharp right
   * - `4`: the finish instruction before the last point
   * - `5`: the instruction before a via point
   * - `6`: the instruction before entering a roundabout
   * - `7`: keep right
   * - `8`: a right U-turn
   */
  sign: number;
  /**
   * Only available for roundabout instructions (`sign` is 6). The count of exits at which the route leaves the roundabout.
   * @type integer <int32>
   */
  exit_number: number;
  /**
   * Only available for roundabout instructions (`sign` is 6).
   * The radian of the route within the roundabout `0 < r < 2*PI` for clockwise and `-2*PI < r < 0` for counterclockwise turns.
   * @type number<double>
   */
  turn_angle: number;
};

type RouteResponsePath = {
  /**
   * The total distance, in meters. To get this information for one 'leg' please read https://www.graphhopper.com/blog/2019/11/28/routing-api-using-path-details/.
   * @type integer <double>
   */
  distance: number;
  /**
   * The total travel time, in milliseconds. To get this information for one 'leg' please read https://www.graphhopper.com/blog/2019/11/28/routing-api-using-path-details/.
   * @type integer <int64>
   */
  time: number;
  /**
   * The total ascent, in meters.
   * @type number <double>
   */
  ascend: number;
  /**
   * The total descent, in meters.
   * @type number <double>
   */
  descend: number;
  /**
   * The geometry of the route. The format depends on the value of `points_encoded`.
   * @type EncodedLineString (string)
   */
  points: {
    /**
     * The encoding type of the points
     */
    type: string;
    /**
     * A polyline-encoded list of positions (lat-lon coordinates).
     */
    coordinates: Array<Array<number>>;
  };
  /**
   * The snapped input points. The format depends on the value of `points_encoded`.
   * @type EncodedLineString (string)
   */
  snapped_waypoints: string;
  /**
   * Whether the `points` and `snapped_waypoints` fields are polyline-encoded strings rather than JSON arrays of coordinates. See the field description for more information on the two formats.
   */
  points_encoded: boolean;
  /**
   * The bounding box of the route geometry. Format: [minLon, minLat, maxLon, maxLat].
   * @type Array<double>
   */
  bbox: Array<number>;
  /**
   * The instructions for this route.
   */
  instructions: Array<RouteInstruction>;
  /**
   * Path details, as requested with the `details` parameter.
   */
  details: {
    road_class: Array<[number, number, string]>;
    surface: Array<[number, number, string]>;
    /**
     * Per-'leg' distance from junction to junction, in meters.
     * One element will have the following format: [ from, end, distance ]
     */
    distance: Array<[number, number, number]>;
    /**
     * Per-'leg' estimated time to go from junction to junction, in milliseconds.
     * One element will have the following format: [ from, end, time ]
     */
    time: Array<[number, number, number]>;
    /**
     * Per-'leg' street name from junction to junction.
     * One element will have the following format: [ from, end, street_name ]. Street name will be `null` if no value may be found.
     */
    street_name: Array<[number, number, string | null]>;
  };
  /**
   * An array of indices (zero-based), specifiying the order in which the input points are visited. Only present if the optimize parameter was used.
   */
  points_order?: Array<number>;
};

// /**
//  * A leg of a route, represents a route between two waypoints. A `Route` may be made up of multiple `RouteLeg`s. Contains the following properties:
//  * - `distance`: the distance traveled by this route leg, in `float` meters,
//  * - `duration`: the estimated travel time, in `float` number of seconds,
//  * - `steps`: array of `RouteStep` objects describing the turn-by-turn instructions,
//  * - `summary`: summary of the route taken as `string` (e.g. "A2 in direzione Locarno"),
//  * - `weight`: a weight assigned to the leg. Assumed to be tied to the route's "recommendation rank".
//  */
// export type RouteLeg = {
//     /**
//      * Is expressed in meters
//      */
//     distance: number,
//     /**
//      * Is expressed in seconds
//      */
//     duration: number,
//     steps: Array<RouteStep>
//     summary: string,
//     weight: number
// }

// /**
//  * A step consists of a maneuver such as a turn or merge, followed by a distance of travel along a single way to the subsequent step.
//  * Object contains the following properties:
//  * - `distance`: the distance of travel from the maneuver to the subsequent step, in `float` meters,
//  * - `driving_side`: the side of the road on which one must drive,
//  * - `duration`: the estimated travel time, in `float` number of seconds,
//  * - `intersections`: an array of `Intersection` objects that are passed along the segment, the very first belonging to the `StepManeuver`,
//  * - `maneuver`: a `StepManeuver` object representing the maneuver,
//  * - `mode`: a `string` signifying the mode of transportation.
//  * - `name`: the name of the way along which travel proceeds.
//  * - `weight`: a weight assigned to the step. Assumed to be tied to the route's "recommendation rank".
//  */
// export type RouteStep = {
//     /**
//      * Is expressed in meters
//      */
//     distance: number,
//     driving_side: string,
//     /**
//      * Is expressed in seconds
//      */
//     duration: number,
//     intersections: Array<Intersection>,
//     maneuver: StepManeuver,
//     mode: string
//     name: string
//     weight: number
// }

// /**
//  * An intersection gives a full representation of any cross-way the path passes bay.
//  * For every step, the very first intersection (intersections[0]) corresponds to the location of the `StepManeuver`.
//  * Further intersections are listed for every cross-way until the next turn instruction.
//  * Object contains the following properties:
//  * - `location`: a `[longitude, latitude]` pair describing the location of the turn.
//  * - `bearings`: a list of bearing values (e.g. [0, 90, 180, 270]) that are available at the intersection. The bearings describe all available roads at the intersection.
//  * - `entry`: a list of entry flags, corresponding in a 1:1 relationship to the bearings. A value of true indicates that the respective road could be entered on a valid route. false indicates that the turn onto the respective road would violate a restriction,
//  * - `in`: index into bearings/entry array. Used to calculate the bearing just before the turn. Namely, the clockwise angle from true north to the direction of travel immediately before the maneuver/passing the intersection. Bearings are given relative to the intersection. To get the bearing in the direction of driving, the bearing has to be rotated by a value of 180°. The value is not supplied for depart maneuvers,
//  * - `out`: index into the bearings/entry array. Used to extract the bearing just after the turn. Namely, The clockwise angle from true north to the direction of travel immediately after the maneuver/passing the intersection. The value is not supplied for arrive maneuvers,
//  * - `lanes`: array of `Lane` objects that denote the available turn lanes at the intersection. If no lane information is available for an intersection, the lanes property will not be present.
//  */
// export type Intersection = {
//     location: Array<number>,
//     bearings: Array<number>,
//     entry: Array<string>,
//     in: number
//     out: number
//     lanes: Array<Lane>
// }

// /**
//  * A `Lane` represents a turn lane at the corresponding turn location. Object contains the following properties:
//  * - `indications`: an indication (e.g. marking on the road) specifying the turn lane. A road can have multiple indications (e.g. an arrow pointing straight and left). The indications are given in an array, each containing one of the following types:
//  *  - `none`
//  *  - `uturn`
//  *  - `sharp right`
//  *  - `right`
//  *  - `slight right`
//  *  - `straight`
//  *  - `slight left`
//  *  - `left`
//  *  - `sharp left`
//  * - `valid`: a boolean flag indicating whether the lane is a valid choice in the current maneuver
//  */
// export type Lane = {
//     indications: Array<string>,
//     valid: boolean
// }

// /**
//  * A maneuver at a certain step of a route. Object contains the following properties:
//  * - `bearing_after`: the clockwise angle from true north to the direction of travel immediately after the maneuver,
//  * - `bearing_before`: the clockwise angle from true north to the direction of travel immediately before the maneuver,
//  * - `exit`: An optional `integer` indicating the number of the exit to take. The field exists for the following export type field:
//  *  - `roundabout`: Number of the roundabout exit to take. If exit is undefined the destination is on the roundabout.
//  *  - `rotary`: Number of the roundabout exit to take. If exit is undefined the destination is on the roundabout.
//  *  - any other case: Indicates the number of intersections passed until the turn. Example instruction: "at the fourth intersection, turn left".
//  * - `location`: a `[longitude, latitude]` pair describing the location of the turn,
//  * - `modifier`: an optional string indicating the direction change of the maneuver.
//  * - `type`: a string indicating the export type of maneuver. May be one of the following values:
//  *  - `turn`: a basic turn into direction of the `modifier`,
//  *  - `new name`: no turn is taken/possible, but the road name changes. The road can take a turn itself, following `modifier`,
//  *  - `depart`: indicates the departure of the leg,
//  *  - `arrive`: indicates the destination of the leg,
//  *  - `merge`: merge onto a street (e.g. getting on the highway from a ramp, the `modifier` specifies the direction of the merge),
//  *  - `on ramp`: take a ramp to enter a highway (direction given my `modifier`),
//  *  - `off ramp`: take a ramp to exit a highway (direction given my `modifier`),
//  *  - `fork`: take the left/right side at a fork depending on modifier,
//  *  - `end of road`: road ends in a T intersection turn in direction of modifier
//  *  - `use lane`: going straight on a specific lane,
//  *  - `continue`: turn in direction of `modifier` to stay on the same road,
//  *  - `roundabout`: traverse roundabout, has additional field exit with NR if the roundabout is left. the `modifier` specifies the direction of entering the roundabout,
//  *  - `rotary`: a traffic circle. While very similar to a larger version of a roundabout, it does not necessarily follow roundabout rules for right of way. It can offer `rotary_name`/`rotary_pronunciation` in addition to the `exit` parameter,
//  *  - `roundabout turn`: describes a turn at a small roundabout that should be treated as normal turn. The modifier indicates the turn direction. Example instruction: "At the roundabout turn left",
//  *  - `notification`: not an actual turn but a change in the driving conditions. For example the travel mode. If the road takes a turn itself, the `modifier` describes the direction.
//  */
// export type StepManeuver = {
//     bearing_after: number,
//     bearing_before: number,
//     location: Array<number>,
//     modifier?: string,
//     type: string,
//     exit?: number
// }

// /**
//  * Object used to describe waypoint on a route. Contains the following properties:
//  * - `distance`: the distance of the snapped point from the original, in `float` meters,
//  * - `hint`: unique internal identifier of the segment (ephemeral, not constant over data updates). This can be used on subsequent request to significantly speed up the query and to connect multiple services. E.g. you can use the hint value obtained by the nearest query as hint values for route inputs.
//  * - `location`: array that contains the `[longitude, latitude]` pair of the snapped coordinate,
//  * - `name`: name of the street the coordinate snapped to.
//  */
// export type Waypoint = {
//     distance: number,
//     hint: string,
//     location: Array<Number>, // Longitude and latitude in array form
//     name: string
// }

export enum MeansOfTransport {
  OnFoot,
  ByBike,
  ByCar,
  ByTrain,
}

export type OjpLegInfo = {
  startPointName: string;
  startTime: string | undefined;
  arrivalName: string | undefined;
  arrivalTime: string | undefined;
  plannedDepQuay: string | undefined;
  plannedArrQuay: string | undefined;
  line: string | undefined;
  destination: string | undefined;
};

export type TripInfo = {
  loaded: boolean;
  transport: OjpLegInfo[];
  positionsList: any[];
  duration: String;
  distance: number;
  cost: number;
  emissions: number;
};
