import actionTypes from './actionTypes'


export const successLogin = () => {
  console.log(actionTypes.SUCCESS_LOGIN)
  return {
    type: actionTypes.SUCCESS_LOGIN
  }
}

export const failLogin = () => {
  return {
    type: actionTypes.FAIL_LOGIN
  }
}
