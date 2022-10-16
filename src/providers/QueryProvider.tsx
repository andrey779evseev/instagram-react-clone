import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 5,
		},
	},
})

const QueryProvider = (props: PropsWithChildren) => {
	const { children } = props
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

export default QueryProvider
