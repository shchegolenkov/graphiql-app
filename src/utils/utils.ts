export const defaultQuery = `query {
  characters (page: 5) {
    info {
      count
    }
    results {
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
