import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { SessionEmitter } from "@/utils/authentication";
import { CurrentUserDocument } from "@/api/hooks/current-user";

export default function SessionListener(): null {
  const apolloClient = useApolloClient();

  useEffect(() => {
    const handleSignOut = async (): Promise<void> => {
      const currentUser = apolloClient.readQuery({
        query: CurrentUserDocument,
      });

      if (currentUser != null) {
        apolloClient.writeQuery({
          query: CurrentUserDocument,
          data: { currentUser: null },
        });
        await apolloClient.clearStore();
      }
    };

    SessionEmitter.on("signOut", handleSignOut);

    return () => {
      SessionEmitter.off("signOut", handleSignOut);
    };
  }, [apolloClient]);

  return null;
}
