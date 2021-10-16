import { Route } from 'react-router-dom'

const renderRoute = (routes, path = '') => {
    return routes.map((route, index) => (
        <Route
            key={path + route.path}
            path={path + route.path}
            render={(props) => <route.component {...props} route={route} />}
            exact={route.exact ? route.exact : false}
        />
    ))
}

export { renderRoute }
