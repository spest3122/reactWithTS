import { Route } from 'react-router-dom'
import { ROUTE } from './routes'

const renderRoute = (routes: Array<ROUTE>, path = '') => {
    return routes.map((route: ROUTE) => (
        <Route
            key={path + route.path}
            path={path + route.path}
            render={(props) => <route.component {...props} route={route} />}
            exact={route.exact ? route.exact : false}
        />
    ))
}

export { renderRoute }
