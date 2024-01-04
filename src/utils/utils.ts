export const defaultQuery = `query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
}`;

export const introspectionQuery = `{
  __schema {
    types {
      name
    }
  }
}`;

export const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const getNumericArray = (length: number) =>
  [...Array(length).keys()].map((i) => i + 1);
