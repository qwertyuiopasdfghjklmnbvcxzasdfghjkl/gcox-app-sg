/**
 * 用户API接口
 */
import api from '@/api'
import uuid from 'uuid/v1'

let domain = ''
let user = {
  uuid: uuid()
}

const getUUID = function () {
  user.uuid = uuid()
  return `${api.domain}/api/v2/user/captcha?uuid=${user.uuid}&_t=${Date.now()}`
}
user.getUUID = getUUID

// 修改支付密码
const resetTransactionPwd = function (formData, success, error) {
  api.post(`${domain}api/v2/user/resetTransactionPwd`, formData, (res) => {
    if (res.rst === 1) {
      success && success(res.msg)
    } else {
      error && error(res.msg)
    }
  }, error)
}
user.resetTransactionPwd = resetTransactionPwd

// 登录
const login = function (formData, success, error) {
  api.post(`${domain}api/v1/gcox/user/login`, formData, (res) => {
    if (res.rst === 1) {
      success && success(res.api_token, res)
    } else {
      error && error(res.data.error || res.msg, res.rst)
    }
  }, error)
}
user.login = login

// 退出登录
const logout = function (success, error) {
  api.get(`${domain}api/v1/gcox/user/logout`, (res) => {
    if (res.rst === 1) {
      success && success(res)
    } else {
      error && error(res.msg)
    }
  }, error)
}
user.logout = logout

// 重发邮件
const resend = function (formData, success, error) {
  api.post(`${domain}/api/v1/gcox/user/resend`, formData, (res) => {
    if (res.rst === 1) {
      success && success(res.data, res)
    } else {
      error && error(res.msg)
    }
  }, error)
}
user.resend = resend

// 获取用户信息
const userInfo = function (success, error) {
  api.get(`${domain}api/v1/gcox/user/info`, (res) => {
    if (res.rst === 1) {
      success && success(res.data)
    } else {
      error && error(res.msg)
    }
  }, error)
}
user.userInfo = userInfo

// 注册
const register = function (formData, success, error) {
  api.post(`${domain}api/v1/gcox/user/register`, formData, (res) => {
    if (res.rst === 1) {
      success && success(res.msg)
    } else {
      error && error(typeof res.msg === 'string' ? res.msg : res.msg[0])
    }
  }, error)
}
user.register = register

// 忘记密码 - 发送邮件
const forgetPwdSendEmail = function (data, success, error) {
  api.post(`${domain}/api/v1/gcox/user/resetPwd`, data, (res) => {
    if (res.rst === 1) {
      success && success()
    } else {
      let msg = ''
      if (res.error) {
        msg = typeof res.error === 'string' ? res.error : [0]
      } else {
        msg = typeof res.msg === 'string' ? res.msg : res.msg[0]
      }
      error && error(msg)
    }
  }, error)
}
user.forgetPwdSendEmail = forgetPwdSendEmail

// 发送邮件 - 激活邮箱
const reSendEmail = function (data, success, error) {
  api.post(`${domain}api/v2/user/sendEmail`, data, (res) => {
    if (res.rst === 1) {
      success && success(res.msg)
    } else {
      let msg = ''
      if (res.error) {
        msg = typeof res.error === 'string' ? res.error : [0]
      } else {
        msg = typeof res.msg === 'string' ? res.msg : res.msg[0]
      }
      error && error(msg)
    }
  }, error)
}
user.reSendEmail = reSendEmail

// 获取极速验证信息
const getGtInfo = function (success, error) {
  api.get(`${domain}api/v2/user/gtCaptcha`, (res) => {
    if (res.rst === 1) {
      success && success(res.data)
    } else {
      error && error()
    }
  }, error)
}
user.getGtInfo = getGtInfo

// 发送验证码（4位）
const sendSMSCode = function (data, success, error) {
  let lang = window.localStorage.getItem('lang') || 'en'
  switch(lang){
    case 'zh-CN':
      lang = 'CN'
      break
    case 'cht':
      lang = 'CNZH'
      break
    case 'kr':
      lang = 'KO'
      break
    case 'jp':
      lang = 'JA'
      break
    case 'ar':
      lang = 'AR'
      break
    case 'de':
      lang = 'DE'
      break
    case 'es':
      lang = 'ES'
      break
    case 'fr':
      lang = 'FR'
      break
    case 'it':
      lang = 'IT'
      break
    case 'th':
      lang = 'TH'
      break
    case 'ru':
      lang = 'RU'
      break
    default:
      lang = 'EN'
  }
  data.lang = lang
  api.post(`${domain}api/v3/user/sendSms`, data, success, error)
}
user.sendSMSCode = sendSMSCode

// 修改登录密码
const changePwd = function (data, success, error) {
  api.post(`${domain}api/v1/gcox/user/modifyPwd`, data, (res) => {
    if (res.rst === 1) {
      success && success(res.msg)
    } else {
      let msg = ''
      if (res.error) {
        msg = typeof res.error === 'string' ? res.error : [0]
      } else {
        msg = typeof res.msg === 'string' ? res.msg : res.msg[0]
      }
      error && error(msg)
    }
  }, error)
}
user.changePwd = changePwd

// 生成RSA公钥接口
const getRsaPublicKey = function (success, error) {
  api.get(`${domain}api/v2/user/genRsaPublicKey`, (res) => {
    if (res.rst === 1) {
      success && success(res.data)
    } else {
      error && error(res.msg)
    }
  }, error)
}
user.getRsaPublicKey = getRsaPublicKey

//快速注册
const fastRegister = function (data, success, error) {
  api.post(`${domain}/api/v2/user/gameFastRegister`, data, (res) => {
    if (res.rst === 1) {
      success && success(res.userInfo)
    } else {
      error && error(res.msg)
    }
  }, error)
}
user.fastRegister = fastRegister

// 资金密码
const payPW = function (data, success, error) {
  api.post(`${domain}api/v1/gcox/user/setTransactionPassword`,data, (res) => {
    if (res.rst === 1) {
      success && success(res)
    } else {
      error && error(res.msg)
    }
  }, error)
}
user.payPW = payPW

// kyc 检验
const kyc = function ( success, error) {
  api.get(`${domain}api/v1/gcox/user/initiate-kyc`, (res) => {
    if (res.rst === 1) {
      success && success(res)
    } else {
      error && error(res.msg)
    }
  }, error)
}
user.kyc = kyc

// kyc 更新
const updatekyc = function ( success, error) {
  api.post(`${domain}api/v1/gcox/user/update-kyc-submit-status`, (res) => {
    if (res.rst === 1) {
      success && success(res)
    } else {
      error && error(res.msg)
    }
  }, error)
}
user.updatekyc = updatekyc


export default user
