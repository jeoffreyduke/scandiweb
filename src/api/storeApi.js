import { ApolloClient, InMemoryCache } from "@apollo/client";
import { FETCH_ALL_DATA, FETCH_PRODUCT_BY_ID } from "./queries";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/",
});

export const ApiFetchAllData = async () => {
  return client.query({ query: FETCH_ALL_DATA });
};

export const ApiFetchProductById = async (id) => {
  return client.query({ query: FETCH_PRODUCT_BY_ID, variables: { id } });
};
