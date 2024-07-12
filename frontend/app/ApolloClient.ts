import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

import { onError } from '@apollo/client/link/error'
import authenticatedVar from "./authVar";


const logoutLink = onError(({ graphQLErrors }) => {

  if (graphQLErrors?.length && graphQLErrors[0].message === 'Unauthorized') {

    authenticatedVar(false);

  }
})


const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  fetchOptions: { cache: "no-store" },

});


export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: logoutLink.concat(httpLink),

  });
});


