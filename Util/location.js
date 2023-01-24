const API_KEY = "AIzaSyBJADgRQQtWHAa-1PQIcXpuNfwMySIPXmY";
export function getMapPreview(lat,lng) {
    const image_URL = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lng},${lat},15.25,0,60/400x400?access_token=pk.eyJ1IjoidmFzdTI0MjAwMSIsImEiOiJja3g5OHZmdzUwNTZuMzFtd3c4ZGxqejF4In0.M0xs9JPeVARKxTx2rne1YA`;
    console.log(image_URL);
    return image_URL;
}
export async function getAddress(lat,lng) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1IjoidmFzdTI0MjAwMSIsImEiOiJja3g5OHZmdzUwNTZuMzFtd3c4ZGxqejF4In0.M0xs9JPeVARKxTx2rne1YA`;
    console.log(url);


    const respo = await fetch(url);

    if (!respo) {
        throw new Error("Failed to fetch address");
    }
    const result = await respo.json();
    const address = result.features[0].place_name;
    return address;

}