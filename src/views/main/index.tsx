import { Switch } from 'react-router-dom'
import { doAuth } from '@api'
import Menu from '@src/views/main/menu'
import { renderRoute } from '@src/routes/tool'
import { ROUTE } from '@src/routes/routes.js'

const Main = (props: ROUTE) => {
    // useEffect(() => {
    //     async function callAuthWhenRefresh() {
    //         let res = await doAuth()
    //         if (!res.data.success) {
    //             localStorage.clear()
    //             return <Redirect to="/login" />
    //         }
    //     }
    //     callAuthWhenRefresh()
    // }, [])
    return (
        <main className="flex flex-col h-full">
            <header className="flex justify-between items-center w-full h-11 shadow border-b-2 border-black border-opacity-40 px-4">
                <div className="logo">
                    <p className="text-2xl">LOGO</p>
                </div>
                <div className="flex linkList"></div>
            </header>
            <main className="flex h-full">
                <aside className="flex h-full border-r-2 border-black border-black border-opacity-40 p-6">
                    <Menu list={props.route.routes} />
                </aside>
                <section className="flex-auto">
                    <Switch>{renderRoute(props.route.routes)}</Switch>
                </section>
            </main>
        </main>
    )
}

export default Main
