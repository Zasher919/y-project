// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token, { expires: 7 })
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token, { expires: 7 })
}

export function removeToken() {
  return localStorage.remove(TokenKey)
}
