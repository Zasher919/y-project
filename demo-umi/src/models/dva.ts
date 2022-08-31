import { request } from 'umi';

const getTags = () => {
  return request('/api/tags');
};

export default {
  namespace: 'tags', // 调用model的时候， 通过命令空间调用，不要和其他model相同
  state: {
    tagList: [],
  }, // 状态 和redux的state类似，
  effects: {
    *fetchTags({ payload, callback }, { put, call }) {
      // 获取tags数据

      const res = yield call(getTags);

      // 跟新state状态

      // 调用reducers，并传递数据
      yield put({
        type: 'setTagList', // 类似redux 中action 的 type
        payload: res,
      });
    },
  }, // 调用服务端接口，取数据
  reducers: {
    setTagList(state, action) {
      return { ...state, tagList: action.payload };
    },
  }, // 更新state
};
