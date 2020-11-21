import React from "react";
import { AuthContext } from "./authorization";
import { useAuthorization } from "./useAuthorization";
interface ProvideAuthProps {
  children: React.ReactNode;
}

export function ProvideAuth(props: ProvideAuthProps) {
  const { children } = props;
  const Provider = AuthContext.Provider;
  const { ...values } = useAuthorization();
  return <Provider value={values}>{children}</Provider>;
}
