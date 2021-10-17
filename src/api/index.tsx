import helper from './preprocess'
import { USER, USERLIST } from './API'
//此處提供的僅是給各個頁面提供的api接口

//登入
const doLogin = (data: USER) => {
    return helper({
        url: '/api/login',
        data: data,
        method: 'post',
    })
}

//註冊
const doRegister = (data: USER) => {
    return helper({
        url: '/api/register',
        data: data,
        method: 'post',
    })
}

//驗證
const doAuth = () => {
    return helper({
        url: '/api/user',
        data: {},
        method: 'get',
    })
}

//修改使用者名稱
const updateUserName = () => {
    return helper({
        url: '/api/users',
        data: {},
        method: 'put',
    })
}

//取得使用者名稱
const getUserName = (data: USERLIST) => {
    return helper({
        url: '/api/users',
        data: data,
        method: 'get',
    })
}

//上傳使用者圖片
const uploadUserImage = () => {
    return helper({
        url: '/api/users/uploadBase64Picture',
        data: {},
        method: 'post',
    })
}

export {
    doLogin,
    doRegister,
    doAuth,
    updateUserName,
    getUserName,
    uploadUserImage,
}
