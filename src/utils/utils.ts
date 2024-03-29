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

export const introspectionQuery = `{
  __schema {
    queryType {
      fields {
        name
        description
      }
    }
  }
}
`;

export const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const exampleVariables = {
  userId: 123,
  userStatus: 'active',
};

export const getNumericArray = (length: number) =>
  [...Array(length).keys()].map((i) => i + 1);

export const prettify = (graphQLParams: string) => {
  const START_CURLY_BRACKETS = /{/g;
  const END_CURLY_BRACKETS = /}/g;

  let lines = graphQLParams
    .replace(START_CURLY_BRACKETS, '{\n')
    .replace(/(},)|}/g, '\n}\n')
    .split(/[\n]/g);
  let indent = 0;
  lines = lines.map((item) => {
    item = item.trim();

    if (item.match(END_CURLY_BRACKETS) && indent > 0) {
      indent = indent - item.match(END_CURLY_BRACKETS)!.length;
    }

    item = '  '.repeat(indent) + item;

    if (item.match(START_CURLY_BRACKETS)) {
      indent = indent + item.match(START_CURLY_BRACKETS)!.length;
    }

    return item;
  });
  const formatted = lines.filter((item) => item.trim().length !== 0);

  return { result: formatted.join('\n'), length: formatted.length };
};
