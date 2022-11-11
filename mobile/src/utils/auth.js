// import jwtDecode from 'jwt-decode'
// import { ElMessage } from 'element-plus'
// import dayjs from 'dayjs'





export function setToken(token) {
    sessionStorage.setItem('tokenH', token)
    // setRefreshToken(refreshToken)
    // // 解析过期时间，设置过期
    // const rtExp = jwtDecode(refreshToken).exp * 10000
    // setRTExp(rtExp)
}

export function getToken() {
    return sessionStorage.getItem('tokenH')
}

export function removeTOken() {
    return sessionStorage.removeItem('tokenH')
}

export function setRefreshToken(refreshToken) {
    sessionStorage.setItem('refresh-token', refreshToken)
}

export function getRefreshToken() {
    return sessionStorage.getItem('refresh-token')
}

export function setRTExp(exp) {
    sessionStorage.setItem('rt-exp', `${exp}`)
}
export function getRTExp() {
    const rtExpStr = sessionStorage.getItem('rt-exp')
    return rtExpStr ? Number(rtExpStr) : 0
}

export function clearAll() {
    sessionStorage.clear()
}