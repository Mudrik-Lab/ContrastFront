import React from "react";
import { getToken, isValidToken } from "../Utils/tokenHandler";
import { state } from "../state";
import { useSnapshot } from "valtio";

export default function useAuth() {
  const snap = useSnapshot(state);

  const [isLoadingToken, setIsLoadingToken] = React.useState(true);

  React.useEffect(() => {
    let tokenFromState = snap.auth;
    console.log(tokenFromState);
    if (!tokenFromState) {
      const resToken = getToken();
      console.log(resToken);
      if (resToken) {
        if (isValidToken(resToken)) {
          state.auth = resToken;
        }
        setIsLoadingToken(false);
      } else {
        setIsLoadingToken(false);
      }
    } else {
      setIsLoadingToken(false);
    }
  }, []);

  return { isLoadingToken, snap };
}
