"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function searchPlace(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;
        const res = yield fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        console.log(res);
        return yield res.json();
    });
}
function searchRoute(source, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${source.lon},${source.lat};${dest.lon},${dest.lat}?overview=false`;
        const res = yield fetch(osrmUrl);
        const route = yield res.json();
        console.log(route);
        return route;
    });
}
function onFormSubmit(evt) {
    return __awaiter(this, void 0, void 0, function* () {
        evt.preventDefault();
        const sourceInput = document.querySelector("#source");
        const destinationInput = document.querySelector("#destination");
        if (sourceInput !== null &&
            destinationInput !== null) {
            const source = sourceInput.value;
            const dest = destinationInput.value;
            const sourceJson = yield searchPlace(source);
            const destJson = yield searchPlace(source);
            console.log(sourceJson);
            console.log(destJson);
            const responseContainer = document.querySelector("#responseText");
            if (responseContainer !== null) {
                console.log(sourceJson);
                console.log(destJson);
                const osrmJson = yield searchRoute(sourceJson, destJson);
                let resHtml = `<dl>`;
                // osrmJson.forEach((result:any) => {
                //     console.log(result);
                //     for (const key in result) {
                //         if (Object.prototype.hasOwnProperty.call(result, key)) {
                //             const element = result[key];
                //             resHtml += `<dt>${key}</dt>`;
                //             resHtml += `<dd>${element}</dd>`;
                //         }
                //     }
                // });
                resHtml += `</dl>`;
                responseContainer.innerHTML = resHtml;
            }
        }
    });
}
