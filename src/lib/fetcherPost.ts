export const fetcherPost = <T>(
	url: string,
	{
		arg,
	}: {
		arg: T;
	},
) =>
	fetch(url, { method: "POST", body: JSON.stringify(arg) }).then((res) =>
		res.json(),
	);
