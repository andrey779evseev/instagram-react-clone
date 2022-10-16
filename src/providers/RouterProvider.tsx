import { createBrowserHistory } from 'history'
import { PropsWithChildren, memo } from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'

const history = createBrowserHistory({ window })

export const rootNavigate = (to: string) => {
	history.push(to)
}

const RouterProvider = (props: PropsWithChildren) => {
	const { children } = props
	return <HistoryRouter history={history}>{children}</HistoryRouter>
}

export default memo(RouterProvider)
