import { withRouter } from 'react-router-dom'

const GoBack = withRouter(({ history }) => {
    return (
        <button
            className="bg-blue-500 text-white pr-5 pl-5 pt-1 pb-1 rounded"
            type="button"
            onClick={() => {
                history.goBack()
            }}
        >
            返回
        </button>
    )
})

export default GoBack
