import React from "react";

import { Spin, Alert } from 'antd';

export default function SpinCom() {
  return (
    <div>
      <Spin tip="Loading...">
        <Alert
          message="Alert message title"
          description="Further details about the context of this alert."
          type="info"
        />
      </Spin>
    </div>
  );
}
