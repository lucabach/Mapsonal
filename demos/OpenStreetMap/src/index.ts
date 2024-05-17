async function searchPlace(query:string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    console.log(res);
    return (await res.json())[0];
}

type NominatimRes = {
    addresstype:string,
    boundingbox:Array<number>,
    class:string,
    display_name:string,
    importance:number,
    lat:string,
    licence:string,
    lon:string,
    name:string,
    osm_id:number,
    osm_type:string,
    place_id:number,
    place_rank:number,
    type:string
}

type Leg = {
    distance:number,
    duration:number,
    steps:Array<any>
    summary:string,
    weight:number
}

type Route = {
    weight_name:string,
    weight:number,
    duration:number
    distance:number,
    legs:Array<Leg>
}

async function onFormSubmit(evt: SubmitEvent) {
    evt.preventDefault();
    const sourceInput = document.querySelector("#source") as HTMLInputElement;
    const destinationInput = document.querySelector("#destination") as HTMLInputElement;
    if (sourceInput !== null &&
        destinationInput !== null) {
        const source = sourceInput.value;
        const dest = destinationInput.value;
        const sourceJson = await searchPlace(source);
        const destJson = await searchPlace(dest);
        console.log(sourceJson);
        console.log(destJson);
        const responseContainer = document.querySelector("#responseText");
        if (responseContainer !== null) {
            console.log(sourceJson);
            console.log(destJson);

            const osrmUrl = `http://router.project-osrm.org/route/v1/walking/${sourceJson.lon},${sourceJson.lat};${destJson.lon},${destJson.lat}?alternatives=true&steps=true&overview=simplified`;
            // const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${sourceJson.lon},${sourceJson.lat};${destJson.lon},${destJson.lat}?alternatives=true&steps=true&overview=simplified`;
            const res = await fetch(osrmUrl);
            const osmrJson = await res.json();
            const routes:Array<Route> = osmrJson.routes;
            console.log(osmrJson);

            let resHtml = `<dl>`;
            
            resHtml += `<dt>From:</dt>`;
            resHtml += `<dd>${osmrJson.waypoints[0].name}</dd>`;
            resHtml += `<dt>To:</dt>`;
            resHtml += `<dd>${osmrJson.waypoints[1].name}</dd>`;

            routes.forEach((route:Route) => {
                console.log(route);
             
                for (const key in route) {
                    if (Object.prototype.hasOwnProperty.call(route, key)) {
                        const element = route[key as keyof Route];
                        if (key === "duration") {
                            const allSecs = element as number;
                            const seconds = allSecs % 60;
                            const allMinutes = Math.floor(allSecs / 60);
                            const minutes = allMinutes % 60;
                            const hours = Math.floor(allMinutes / 60);
                            resHtml += `<dt>${key}</dt>`;
                            resHtml += `<dd>${hours} h, ${minutes} min, ${seconds} s</dd>`;
                        } else if (key === "distance") {
                            resHtml += `<dt>${key}</dt>`;
                            resHtml += `<dd>${Math.floor((element as number) / 1000)} km, ${Math.floor((element as number) % 1000)} m</dd>`;
                        } else {
                            resHtml += `<dt>${key}</dt>`;
                            resHtml += `<dd>${element}</dd>`;
                        }
                    }
                }
            });

            resHtml += `</dl>`;
            responseContainer.innerHTML = resHtml;
        }
    }
}