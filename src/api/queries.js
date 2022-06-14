import { gql } from "@apollo/client";

export const FETCH_ALL_DATA = gql`
  query FetchAllData {
    categories {
      name
      products {
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        id
        name
        gallery
        inStock
      }
    }
    currencies {
      label
    }
    category {
      name
      products {
        id
        name
        description
        prices {
          amount
        }
      }
    }
  }
`;

export const FETCH_PRODUCT_BY_ID = gql`
  query FetchProductById($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      brand
      gallery
      description
      attributes {
        name
        id
        type
        items {
          id
          value
          displayValue
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;
