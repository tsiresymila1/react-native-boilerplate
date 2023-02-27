export const API_URL = {
  // BASE_URL: 'https://chatapi.sutchapp.com',
  BASE_URL: 'http://192.168.88.17:3000',
  // BASE_URL: 'http://192.168.1.183:3000',
  auth: {
    login: '/api/auth/login',
    register:'/api/users',
  },
  user: {
    list: '/api/users',
    me: '/api/users/me',
  },
  chat: {
    list: '/api/chats',
  },
};
