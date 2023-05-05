export const fetcherGet = (url: string) => fetch(url).then((res) => res.json());
