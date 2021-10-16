import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import eyeOpen from '/image/open.png'
import eyeClose from '/image/close.png'
import { doRegister } from '@api'

const Register = () => {
    const [registerForm, setRegisterForm] = useState({
        username: '',
        userErrTip: false,
        password: '',
        pwdErrTip: false,
        secondPwd: '',
        secPwdErrTip: false,
    })
    const [pwdOpen, setPwdOpen] = useState(false)
    const [secpwdOpen, setSecpwdOpen] = useState(false)

    const verifyForm = () => {
        let userErrTip = false
        let pwdErrTip = false
        let secPwdErrTip = false
        if (registerForm.username === '') {
            userErrTip = true
        }

        if (registerForm.password === '') {
            pwdErrTip = true
        }

        if (registerForm.secondPwd === '') {
            secPwdErrTip = true
        }

        if (registerForm.password !== registerForm.secondPwd) {
            secPwdErrTip = true
        }

        if (!userErrTip && !pwdErrTip && !secPwdErrTip) {
            return false
        }
        setRegisterForm((prev) => ({
            ...prev,
            userErrTip: userErrTip,
            pwdErrTip: pwdErrTip,
            secPwdErrTip: secPwdErrTip,
        }))
        return true
    }
    const goToLogin = () => {
        return <Redirect to="/login" />
    }

    const doSubmit = async () => {
        if (verifyForm()) {
            return
        }

        let res = await doRegister({
            username: registerForm.username,
            password: registerForm.password,
        })
        if (!res.data.success) {
            //TODO 待處理
        } else {
        }
    }
    return (
        <div className="h-full flex justify-center items-center	">
            <div className="w-full max-w-md">
                <form className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
                    <div className="flex justify-center text-lg mb-6">
                        <h2>註冊</h2>
                    </div>
                    <div className="mb-7 flex items-center relative">
                        <label
                            className="block w-24 text-gray-700  text-sm font-bold mr-2"
                            htmlFor="username"
                        >
                            <span className="text-red-500">*</span>
                            帳號
                        </label>
                        <input
                            className={`${
                                registerForm.userErrTip ? 'border-red-500' : ''
                            } shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            id="username"
                            type="text"
                            value={registerForm.username}
                            placeholder="必須是信箱"
                            onChange={(e) =>
                                setRegisterForm((prev) => ({
                                    ...prev,
                                    username: e.target.value,
                                }))
                            }
                        />
                        {registerForm.userErrTip ? (
                            <p className="absolute -bottom-5 ml-3 left-20 text-red-500 text-xs ">
                                請輸入帳號
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="mb-6 flex items-center relative">
                        <label
                            className="block w-24 text-gray-700 text-sm font-bold mr-2"
                            htmlFor="password"
                        >
                            <span className="text-red-500">*</span>
                            密碼
                        </label>
                        <div className="relative w-full">
                            <input
                                className={`${
                                    registerForm.pwdErrTip
                                        ? 'border-red-500'
                                        : ''
                                } shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                id="password"
                                type={pwdOpen ? 'text' : 'password'}
                                value={registerForm.password}
                                placeholder="4-8字元；首尾必須是英文；中間必須是數字"
                                onChange={(e) =>
                                    setRegisterForm((prev) => ({
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
                        {registerForm.pwdErrTip ? (
                            <p className="absolute ml-3 -bottom-5 left-20 text-red-500 text-xs ">
                                請輸入密碼
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="mb-6 flex items-center relative">
                        <label
                            className="block w-24 text-gray-700 text-sm font-bold mr-2"
                            htmlFor="confirmPassword"
                        >
                            <span className="text-red-500">*</span>
                            確認密碼
                        </label>
                        <div className="relative w-full">
                            <input
                                className={`${
                                    registerForm.secPwdErrTip
                                        ? 'border-red-500'
                                        : ''
                                } shadow text-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                                id="confirmPassword"
                                type={secpwdOpen ? 'text' : 'password'}
                                value={registerForm.secondPwd}
                                onChange={(e) =>
                                    setRegisterForm((prev) => ({
                                        ...prev,
                                        secondPwd: e.target.value,
                                    }))
                                }
                                placeholder="4-8字元；首尾必須是英文；中間必須是數字"
                            />
                            <div
                                className="icon w-6 h-6 absolute right-1.5 top-1.5"
                                onClick={() => setSecpwdOpen((prev) => !prev)}
                            >
                                <img src={secpwdOpen ? eyeOpen : eyeClose} />
                            </div>
                        </div>
                        {/* <p className="absolute -bottom-5 left-20 ml-3 text-red-500 text-xs ">與密碼不同</p> */}
                        {registerForm.secPwdErrTip ? (
                            <p className="absolute -bottom-5 left-20 ml-3 text-red-500 text-xs ">
                                請輸入確認密碼
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className="flex justify-center mb-4">
                        <button
                            className="text-blue-300 text-sm py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={goToLogin}
                        >
                            返回登入
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-6 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={doSubmit}
                        >
                            註冊
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
