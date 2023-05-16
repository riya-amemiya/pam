export const fetcherGet = <R>(url: string): Promise<R> =>
	fetch(url).then((res) => res.json());
