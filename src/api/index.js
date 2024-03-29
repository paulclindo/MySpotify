import config from "./config";

const { apiKey } = config;
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:argentina&api_key=${apiKey}&format=json`;

async function getArtists(country) {
  const url = URL.replace(":argentina", country);
  const response = await fetch(url);
  const data = await response.json();
  return data.topartists.artist;
}

export default getArtists;
