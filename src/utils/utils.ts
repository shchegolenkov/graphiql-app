export const defaultQuery = `query GetCountry {
  country(code: "BR") {
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}`;

export const getNumericArray = (length: number) =>
  [...Array(length).keys()].map((i) => i + 1);
