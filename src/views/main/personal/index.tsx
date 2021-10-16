import { renderRoute } from '@src/routes/tool'
import { Switch } from 'react-router-dom'

const Personal = (props) => {
    return <Switch>{renderRoute(props.route.routes, props.route.path)}</Switch>
}

export default Personal
