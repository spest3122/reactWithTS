import axios from 'axios'

/**
 * 預期功能
 * 1. url, headers, data, method能當作參數帶入(done)
 * 2. 錯誤能直接返回提示的component
 */

const outerUrl = 'https://l8-upgrade-apis.herokuapp.com'

axios.interceptors.response.use(
    function (response) {
        if (response.data.token !== undefined) {
            localStorage.setItem(
                'Authorization',
                'Bearer ' + response.data.token
            )
        }
        return response
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error)
    }
)

axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        config.headers.Authorization =
            localStorage.getItem('Authorization') || ''
        return config
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
)

const helper = ({ url = '', headers = {}, data = {}, method = 'get' }) => {
    let _config = {
        url: outerUrl + url,
        method: method,
        headers: { ...headers },
    }

    if (method === 'get') {
        _config['params'] = data
    } else {
        _config['data'] = data
    }

    return axios(_config)
        .then((res) => {
            return res
        })
        .catch((error) => {
            return error.response
        })
}

export default helper
