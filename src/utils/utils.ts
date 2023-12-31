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

export const getNumericArray = (length: number) =>
  [...Array(length).keys()].map((i) => i + 1);
