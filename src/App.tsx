import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import PagePreloader from '@components/common/page-preloader/PagePreloader'
import JotaiNexus from '@utils/JotaiNexus'
import { router } from './Router'
import QueryProvider from './providers/QueryProvider'

const App = () => {
	return (
		<>
			<QueryProvider>
				<ReactQueryDevtools initialIsOpen={false} />
				<JotaiNexus />
				<RouterProvider router={router} fallbackElement={<PagePreloader />} />
			</QueryProvider>
			<div id='modals-root'></div>
		</>
	)
}

export default App
