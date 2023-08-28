import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

const styles = {
  circularrProgress: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: " translate(-50%, -50%)",
  },
};
type EventListener = {
  [key: string]: any;
};

const eventlisteners: EventListener = {};
export const CircularProgressListener = {
  on: (eventName: string, funcCall: () => void) => {
    if (!eventName || !funcCall) {
      return;
    }
    eventlisteners[eventName] = funcCall;
  },
  off: (eventName: string) => {
    if (!eventName || !eventlisteners[eventName]) {
      return;
    }
    delete eventlisteners[eventName];
  },
  emit: (eventName: string) => {
    if (!eventName || !eventlisteners[eventName]) {
      return;
    }
    eventlisteners[eventName]();
  },
};

export default function CircularProgressCustomize({}: Props) {
  const [state, setState] = useState(false);

  useEffect(() => {
    CircularProgressListener.on("start", () => setState(true));
    CircularProgressListener.on("stop", () => setState(false));

    return () => {
      CircularProgressListener.off("start");
      CircularProgressListener.off("stop");
    };
  }, []);

  return (
    <>
      {state && (
        <CircularProgress color="success" sx={styles.circularrProgress} />
      )}
    </>
  );
}
