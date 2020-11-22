import React from "react";
import { LoadingArea } from "../common/LoadingArea";
import { AuthContext } from "./authorization";
import { useAuthorization } from "./useAuthorization";
interface ProvideAuthProps {
  children: React.ReactNode;
}

export function ProvideAuth(props: ProvideAuthProps) {
  const { children } = props;
  const Provider = AuthContext.Provider;
  const { ...values } = useAuthorization();
  return (
    <LoadingArea promise={values.promise} height="100px">
      <Provider value={values}>{children}</Provider>
    </LoadingArea>
  );
}
