import styles from './index.less';
import React from 'react';
import { Link, request } from 'umi';

import { Button } from 'antd';

export default function IndexPage() {
  const getData = () => {
    request('/api/users').then((res) => {
      console.log('res,', res);
    });
  };

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to="/one">导航1</Link>
      <Link to="/dva">导航2</Link>

      <Button onClick={getData}>请求数据</Button>
    </div>
  );
}
