import ReactDOM from 'react-dom'
import { TOAST_STATE } from './toast'

let delay = 2
const Toast = (props: TOAST_STATE<string>) => {
    let { status, msg } = props

    const matchColor = (color: string) => {
        switch (color) {
            case 'success':
                return 'bg-green-500'
            case 'error':
                return 'bg-red-600'
            default:
                return 'bg-blue-100'
        }
    }
    return (
        <div
            className={`fixed z-50 top-3 max-w-md flex items-center p-3 rounded-full border-2 bg-white`}
        >
            <div
                className={`${matchColor(status)} w-14 h-14 rounded-full`}
            ></div>
            <p className="ml-2">{msg}</p>
        </div>
    )
}

const createToast = () => {
    const createAndDestory = (props: TOAST_STATE<string>) => {
        let toast = document.getElementById('toast')
        ReactDOM.render(<Toast msg={props.msg} status={props.status} />, toast)
        setTimeout(() => {
            ReactDOM.render(<></>, toast)
        }, delay * 1000)
    }

    return {
        error: (msg: string) => createAndDestory({ msg: msg, status: 'error' }),
        success: (msg: string) =>
            createAndDestory({ msg: msg, status: 'success' }),
    }
}

export default createToast()
