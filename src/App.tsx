import Router from './Router'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import JotaiNexus from '@utils/JotaiNexus'
import RouterProvider from './providers/RouterProvider'
import QueryProvider from './providers/QueryProvider'
import React from 'react'


const App = () => {
  return (
    <div>
      <QueryProvider>
        <ReactQueryDevtools initialIsOpen={false}/>
        <JotaiNexus/>
        <RouterProvider>
          <Router/>
        </RouterProvider>
      </QueryProvider>
      <div id="modals-root"></div>
    </div>
  )
}

export default App
