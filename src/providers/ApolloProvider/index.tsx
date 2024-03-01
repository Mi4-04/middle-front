import { type ReactElement, type ReactNode } from "react";
import {
  ApolloClient,
  concat,
  type DefaultOptions,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
  split,
} from "@apollo/client";
import { apiUrl } from "@/config";
import authValidationLink from "@/utils/apollo/auth-validation-link";

type ApolloProviderProps = {
  children: ReactNode;
};

const httpLink = new HttpLink({
  uri: apiUrl,
  credentials: "include",
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network",
  },
};

const client = new ApolloClient({
  link: concat(authValidationLink, httpLink),
  cache: new InMemoryCache(),
  defaultOptions,
});

export default function ApolloProvider({
  children,
}: ApolloProviderProps): ReactElement {
  return <Provider client={client}>{children}</Provider>;
}
