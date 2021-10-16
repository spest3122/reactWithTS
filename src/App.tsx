import { Suspense } from 'react'
import './App.css'
import { Redirect, Switch } from 'react-router-dom'
import { renderRoute } from '@src/routes/tool'
import routes from '@src/routes'

const ToLogin = () => <Redirect to="/login" />

function App() {
    return (
        <div className="h-screen overflow-hidden">
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>{renderRoute(routes)}</Switch>
            </Suspense>
        </div>
    )
}

export default App
