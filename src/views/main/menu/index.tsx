import { ROUTE } from '@src/routes/routes'
import { Link } from 'react-router-dom'
const Menu = ({ list }) => {
    const renderSideBar = (routes, path) => {
        return (
            <ul className="flex flex-col ml-2">
                {routes.map((item: ROUTE) => {
                    let nestRoutesExist = item?.routes
                    if (item.hidden) {
                        return null
                    }
                    return (
                        <li className="p-1" key={item.path}>
                            {item?.icon ? item.icon : null}
                            {nestRoutesExist ? item.name + '▼' : ''}
                            {nestRoutesExist ? (
                                renderSideBar(item.routes, item.path)
                            ) : (
                                <Link to={path + item.path}>{item.name}</Link>
                            )}
                        </li>
                    )
                })}
            </ul>
        )
    }
    return renderSideBar(list, '')
}

export default Menu
