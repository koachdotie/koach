export declare const load: ({
	fetch,
	data,
	depends
}: {
	fetch: any;
	data: any;
	depends: any;
}) => Promise<{
	supabase: import('@supabase/supabase-js').SupabaseClient<any, 'public', any>;
	session: import('@supabase/gotrue-js').Session | null;
}>;
