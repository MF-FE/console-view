import $http from '@/utils/request';

// 登陆
export function loginApi(data) {
  return $http.post('/api/login', data);
}

// 查询用户信息
export function findAdminInfoApi() {
  return $http.get('/api/admin/info');
}

// 查询用户列表
export function findAdminListApi() {
  return $http.get('/api/admin');
}

// 保存账号
export function saveAdminApi(data) {
  return $http.post('/api/admin', data);
}

// 删除账号
export function deleteAdminApi(id) {
  return $http.delete(`/api/admin/${id}`);
}

// 更新账号
export function updateAdminApi(id, data) {
  return $http.put(`/api/admin/${id}`, data);
}