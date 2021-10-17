import { renderRoute } from '@src/routes/tool'
import { Switch } from 'react-router-dom'
import { ROUTE } from '@src/routes/routes.js'

const Personal = (props: ROUTE) => {
    return <Switch>{renderRoute(props.route.routes, props.route.path)}</Switch>
}

export default Personal
