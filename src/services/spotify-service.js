import { utilService } from "./util-service";

export const getSpotifyUrl = () => {
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
};



