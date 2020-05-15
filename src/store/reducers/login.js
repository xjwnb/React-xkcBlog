import actionTypes from "../actions/actionTypes";

const initData = {
  isLogin: false,
};

export default (state = initData, actions) => {
  switch (actions.type) {
    case actionTypes.SUCCESS_LOGIN:
      console.log("success");
      return {
        ...initData,
        isLogin: true
      };
    case actionTypes.FAIL_LOGIN:
      console.log("fail");
      return {
        ...initData,
        isLogin: false,
      };
    default:
      console.log("default");
      console.log(actions)
      return state;
  }
};
