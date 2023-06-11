export const fetcherPost = <T, R>(
  url: string,
  {
    arg,
  }: {
    arg: T;
  },
): Promise<R> =>
  fetch(url, { method: "POST", body: JSON.stringify(arg) }).then((res) =>
    res.json(),
  );
