import ApolloProvider from "@/providers/ApolloProvider";
import { ReactElement } from "react";
import SessionListener from "./components/SessionEmitter";

function App(): ReactElement {
  return (
    <>
      <ApolloProvider>
        <SessionListener />
        <h1> Root</h1>
      </ApolloProvider>
    </>
  );
}

export default App;
