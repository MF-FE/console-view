import $http from '@/utils/request';

export function loginApi(data) {
  return $http.post('/api/login', data);
}

export function findAdminInfoApi() {
  return $http.get('/api/admin/info');
}

export function findAdminListApi() {
  return $http.get('/api/admin');
}

export function saveAdminApi(data) {
  return $http.post('/api/admin', data);
}

export function deleteAdminApi(id) {
  return $http.delete(`/api/admin/${id}`);
}
export function updateAdminApi(id, data) {
  return $http.put(`/api/admin/${id}`, data);
}