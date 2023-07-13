import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSnapshot } from "valtio";
import { state } from "../state";

export default function ProtectedRoute(props) {
  const { element: Comp, path } = props;
  const snap = useSnapshot(state);
  const location = useLocation().pathname;

  return (
    <>
      {snap.auth ? (
        Comp
      ) : (
        <>
          {(state.path = location)} <Navigate to="/login" />{" "}
        </>
      )}
    </>
  );
}
