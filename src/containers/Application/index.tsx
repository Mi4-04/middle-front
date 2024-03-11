import ApolloProvider from "@/providers/ApolloProvider";
import UserProvider from "@/providers/UserProvider";
import Root from "@/scenes";
import { ReactElement } from "react";
import SessionListener from "./components/SessionEmitter";

function App(): ReactElement {
  return (
    <>
      <ApolloProvider>
        <SessionListener />
        <UserProvider>
          <Root />
        </UserProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
