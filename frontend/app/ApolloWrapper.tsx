"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";



import { onError } from '@apollo/client/link/error'
import authenticatedVar from "./authVar";


const logoutLink = onError(({ graphQLErrors }) => {

  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (graphQLErrors?.length && graphQLErrors[0].message === 'Unauthorized') {

    authenticatedVar(false);

  }
})


function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: logoutLink.concat(httpLink),
  });
}


export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}