import { type PropsWithChildren, type ReactElement } from "react";
import { useCurrentUserQuery } from "@/api/hooks/current-user";
import UserContext from "./context";

type UserProviderProps = PropsWithChildren<{}>;

export default function UserProvider({
  children,
}: UserProviderProps): ReactElement | null {
  const { data, loading, refetch: performRefetch } = useCurrentUserQuery();

  const currentUser = data?.currentUser ?? null;
  if (loading) return <h2>loading...</h2>;

  const refetch = async (): Promise<void> => {
    await performRefetch().catch(() => undefined);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
