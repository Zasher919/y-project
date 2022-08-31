import mockjs from 'mockjs';

export default {
  'GET /api/users': { users: [1, 2] },

  'GET /api/test': [1, 2, 3, 4, 5],

  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),
};
