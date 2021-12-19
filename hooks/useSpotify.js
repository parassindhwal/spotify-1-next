import { useSession, signIn } from "next-auth/react"
import { useEffect } from "react";
// import spotifyApi from "../lib/spotify";
import SpotifyWebApi from "spotify-web-api-node/src/spotify-web-api";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

function useSpotify() {
    const { data: session, status} = useSession();

    useEffect(() => {
        if(session) {
            //if refersh access token attempts fails, direct user to login...
            if(session.error === "RefreshAccessTokenError") {
                signIn();
            }

            spotifyApi.setAccessToken(session.user.accessToken);
        }
    }, [session])
    return spotifyApi;
}

export default useSpotify
