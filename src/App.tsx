import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import JotaiNexus from '@utils/JotaiNexus'
import Router from './Router'
import QueryProvider from './providers/QueryProvider'
import RouterProvider from './providers/RouterProvider'

const App = () => {
	return (
		<>
			<QueryProvider>
				<ReactQueryDevtools initialIsOpen={false} />
				<JotaiNexus />
				<RouterProvider>
					<Router />
				</RouterProvider>
			</QueryProvider>
			<div id='modals-root'></div>
		</>
	)
}

export default App
