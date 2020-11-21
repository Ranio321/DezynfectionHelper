import React, { ReactNode, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../Users/authorization";
interface RestircedAreaProps {
  children: ReactNode;
  redirectTo: string;
}

export function RestircedArea(props: RestircedAreaProps) {
  const { user } = useAuth();
  const { children, redirectTo } = props;
  const history = useHistory();

  // useEffect(() => {
  //   if (!user) {
  //     history.push({
  //       pathname: redirectTo,
  //     });
  //   }
  // }, []);

  console.log(user);

  return <>{user ? children : <Redirect to={redirectTo} />}</>;
}
