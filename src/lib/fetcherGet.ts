export const fetcherGet = <R>(url: string): Promise<R> =>
  fetch(url).then((response) => response.json());
