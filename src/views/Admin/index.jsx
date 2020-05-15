import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// 路由
import { adminRouter } from "../../routes";

import { connect } from "react-redux";

import { successLogin } from "../../store/actions/login";

// 请求的
import { user } from "../../requests/login";

// 组件
import { Frame } from "../../components";

//

function Admin(props) {
  const [username, setUsername] = useState("");
  // const [nProps] = useState(props)
  const { dispatch } = props;

  console.log(props);

  useEffect(() => {
    user().then(async (res) => {
      setUsername(res.msg.username);
      dispatch(successLogin());
    });
  }, [username, dispatch]);

  return (
    <div>
      {/*       欢迎{username}
      Admin */}
      <Frame username={username} menus={adminRouter}>
        <Switch>
          {adminRouter.map((route) => {
            return (
              <Route
                key={route.pathName}
                path={route.pathName}
                exact={route.exact}
                render={(routerProps) => {
                  return <route.component {...routerProps} />;
                }}
              />
            );
          })}
          <Redirect to={adminRouter[0].pathName} from="/admin" exact />
          <Redirect to="/NotFound" />
        </Switch>
      </Frame>
      ,
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps)(Admin);
