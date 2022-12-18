import axios from "axios";
import { utilService } from "./util-service";

export const spotifyService = {
  getSpotifyUrl,
  getPlaylists,
  search,
};

function getSpotifyUrl() {
  var state = utilService.makeId(16);
  var scope = "user-read-private user-read-email";
  const rootUrl = "https://accounts.spotify.com/authorize?";
  const options = {
    response_type: "code",
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    scope: scope,
    redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT,
    state: state,
  };
  const qs = new URLSearchParams(options);
  return `${rootUrl}${qs.toString()}`;
}

async function getPlaylists() {
  const access_token = utilService.getCookieByName("spotify_access_token");
  var authOptions = {
    url: "https://api.spotify.com/v1/me/playlists",
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    json: true,
  };
  try {
    const res = await axios(authOptions);
    return res.data;
  } catch (error) {
    console.log(error);
  }
  // curl --request GET \
  //   --url https://api.spotify.com/v1/me \
  //   --header 'Authorization: ' \
  //   --header 'Content-Type: application/json'
}

async function search(val) {
  const access_token = utilService.getCookieByName("spotify_access_token");
  var authOptions = {
    url: "https://api.spotify.com/v1/search",
    method: "get",
    params: {
      q: val,
      type: "track,artist,album",
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    json: true,
  };
  try {
    const res = await axios(authOptions);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
