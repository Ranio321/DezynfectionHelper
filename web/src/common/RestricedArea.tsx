import React, { ReactNode, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../Users/authorization";
interface RestircedAreaProps {
  children: ReactNode;
  redirectTo: string;
}

export function RestircedArea(props: RestircedAreaProps) {
  const { user, promise } = useAuth();
  const { children, redirectTo } = props;
  const [promiseResolved, setPromiseResolved] = useState(false);

  useEffect(() => {
    if (promise) {
      promise
        .then(() => setPromiseResolved(true))
        .catch(() => setPromiseResolved(true));
    }
  }, [promise]);

  const redirect = <>{promiseResolved ? <Redirect to={redirectTo} /> : null}</>;

  return <>{user ? children : redirect}</>;
}
