import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "./LoadingArea.scss";

interface LoadingAreaProps {
  height: string;
  width?: string;
  promise?: Promise<any>;
  children?: React.ReactNode;
}

export function LoadingArea({
  height,
  width,
  promise,
  children,
}: LoadingAreaProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [promiseFailed, setPromiseFailed] = useState(false);

  useEffect(() => {
    promise
      ?.then(() => setIsCompleted(true))
      .catch(() => {
        setPromiseFailed(true);
        setIsCompleted(true);
      });
  }, [promise]);

  console.log(isCompleted);
  console.log(promiseFailed);
  console.log(promise);
  return (
    <>
      {!isCompleted && !promiseFailed ? (
        <div style={{ width: width ? width : "100%", height }}>
          <Spinner
            className="loading-chart-spinner"
            animation="border"
            variant="primary"
            style={{ width: "6em", height: "6em" }}
          />
        </div>
      ) : (
        children
      )}
    </>
  );
}
