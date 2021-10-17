import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { doLogin } from '@api'
import Toast from '@src/components/toast'
import Captcha from '@src/views/login/captcha'
import eyeOpen from '/image/open.png'
import eyeClose from '/image/close.png'

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        userErrTip: false,
        password: '',
        psdErrTip: false,
    })
    const [pwdOpen, setPwdOpen] = useState<boolean>(false)
    const [captchaStatus, setCaptchaStatus] = useState<number>(0) //0未驗證 1驗證中/驗證不過 2驗證通過
    const captchaVerifyMethod = (val: number) => {
        if (val === 2) {
            Toast.success('驗證通過')
        } else if (val === 1) {
            Toast.error('驗證失敗，請重新驗證')
        }
        setCaptchaStatus(val)
    }

    // 驗證登入表單
    const verifyLoginForm = () => {
        let userErrTip = false
        let psdErrTip = false
        if (loginForm.username === '') {
            userErrTip = true
        }

        if (loginForm.password === '') {
            psdErrTip = true
        }
        if (!userErrTip && !psdErrTip) {
            return false
        }
        setLoginForm((prev) => ({
            ...prev,
            userErrTip: userErrTip,
            psdErrTip: psdErrTip,
        }))
        return true
    }

    // 提交登入表單
    const doSubmit = async () => {
        if (captchaStatus === 0) {
            setCaptchaStatus(1)
            return
        }

        if (verifyLoginForm()) {
            return
        }
        let res = await doLogin({
            username: loginForm.username,
            password: loginForm.password,
        })
        if (!res.data.success) {
            Toast.error(res.data.message)
            return
        } else {
            return <Redirect to="/" />
        }
    }

    // 跳轉註冊頁
    const goToRegister = () => {
        return <Redirect to="/register" />
    }

    return (
        <div className="h-full flex justify-center items-center	">
            <div className="w-full max-w-sm">
                <form className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
                    <div className="flex justify-center text-lg mb-6">
                        <h2>登入</h2>
                    </div>
                    <div className="mb-7 flex items-center relative">
                        <label
                            className="block w-10 text-gray-700 text-sm font-bold mr-2"
                            htmlFor="username"
                        >
                            帳號
                        </label>
                        <input
                            className={`shadow appearance-none border ${
                                loginForm.userErrTip ? 'border-red-500' : ''
                            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            id="username"
                            type="text"
                            value={loginForm.username}
                            onChange={(e) =>
                                setLoginForm((prev) => ({
                                    ...prev,
                                    username: e.target.value,
                                }))
                            }
                        />
                        {loginForm.userErrTip ? (
                            <p className="absolute -bottom-6 left-12 text-red-500 text-xs ">
                                請輸入帳號
                            </p>
                        ) : null}
                    </div>
                    <div className="mb-6 flex items-center relative">
                        <label
                            className="block w-10 text-gray-700 text-sm font-bold mr-2"
                            htmlFor="password"
                        >
                            密碼
                        </label>
                        <div className="relative w-full">
                            <input
                                className={`shadow appearance-none border ${
                                    loginForm.psdErrTip ? 'border-red-500' : ''
                                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                id="password"
                                type={pwdOpen ? 'text' : 'password'}
                                value={loginForm.password}
                                onChange={(e) =>
                                    setLoginForm((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                            />
                            <div
                                className="icon w-6 h-6 absolute right-1.5 top-1.5"
                                onClick={() => setPwdOpen((prev) => !prev)}
                            >
                                <img src={pwdOpen ? eyeOpen : eyeClose} />
                            </div>
                        </div>
                        {loginForm.psdErrTip ? (
                            <p className="absolute -bottom-6 left-12 text-red-500 text-xs">
                                請輸入密碼
                            </p>
                        ) : null}
                    </div>
                    <div className="flex justify-center mb-4">
                        <button
                            className="text-blue-300 text-sm py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={goToRegister}
                        >
                            註冊
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={doSubmit}
                        >
                            登入
                        </button>
                    </div>
                </form>
            </div>
            {captchaStatus === 1 ? (
                <Captcha endVerify={captchaVerifyMethod} />
            ) : (
                ''
            )}
        </div>
    )
}

export default Login
