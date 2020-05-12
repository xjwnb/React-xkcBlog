import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// 路由
import { adminRouter } from "../../routes";

// 请求的
import { user } from "../../requests/login";

// 组件
import { Frame } from "../../components";

//

export default function Admin() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    user().then((res) => {
      setUsername(res.msg.username);
    });
  });

  return (
    <div>
      {/*       欢迎{username}
      Admin */}
      <Frame username={ username } menus={ adminRouter }>
        <Switch>
          {
            adminRouter.map((route) => {
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
            })
          }
          <Redirect to={adminRouter[0].pathName} from="/admin" exact />
          <Redirect to='/NotFound' />
        </Switch>
      </Frame>
      ,
    </div>
  );
}
