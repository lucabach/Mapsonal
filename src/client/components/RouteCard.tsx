type Route = {
  id: string;
  description: string;
  duration: string;
  //aggiungere cio che serve
};

type RouteCardProps = {
  route: Route;
  mode: string;
};

export function RouteCard(props: RouteCardProps) {
  return (
    <div className="route-card">
      <h3>{props.mode} Route</h3>
      <p>{props.route.description}</p>
      <p>Duration: {props.route.duration}</p>

      {/* More route details */}
    </div>
  );
}

export function SimpleRouteCard() {
  return (
    <div className="route-card">
      {/* Content of the card, simpleRouteCard just for testing Matan no worries */}
    </div>
  );
}

export default RouteCard;
