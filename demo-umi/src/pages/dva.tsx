import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';

const Dva = (props: any) => {
  const { dispatch } = props;
  console.log(props.tags);
  const list = props.tags.tagList.list || [];
  const getData = () => {
    dispatch({
      type: 'tags/fetchTags',
      payload: null,
    });
  };
  return (
    <div>
      <h1>Dva 使用</h1>
      <Button onClick={getData}>取数据</Button>

      {list.map((v, i) => {
        return <p key={i}>{v.name}</p>;
      })}
    </div>
  );
};

export default connect(({ tags }: { tags: any }) => ({ tags }))(Dva);
