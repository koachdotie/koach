/** @type {import('./$types').LayoutLoad} */
export declare function load({ url }: { url: any }): Promise<{
	getAuthUser: () => Promise<unknown>;
	url: any;
}>;
