async function handleResponse(response: Response) {
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.message);
  }
  return json;
}

export class ApiBase {
  jwt?: string;
  authenticatedFetch: (input: RequestInfo, init?: RequestInit) => Promise<any>;
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<any>;

  constructor(tkn?: string) {
    this.setToken(tkn);
    this.fetch = (input: RequestInfo, init?: RequestInit): Promise<Response> =>
      fetch(input, {
        ...init,
        headers: {
          ...(init?.headers ?? {}),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then(handleResponse);

    this.authenticatedFetch = (input: RequestInfo, init?: RequestInit): Promise<Response> => {
      const token = this.jwt;
      if (!token) throw new Error("JWT is required to make this request");
      return fetch(input, {
        ...(init ?? {}),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...init?.headers,
          Authorization: `Bearer ${token}`,
        },
      }).then(handleResponse);
    };
  }

  setToken = (tkn?: string) => {
    this.jwt = tkn;
  };
}

export default ApiBase;
