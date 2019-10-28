import $http from '@/utils/request';

// 查询所有活动的名称
export function findAllActivityApi() {
  return $http.get(`/api/activities`);
}

// 添加活动
export function saveActivityApi(data) {
  return $http.post(`/api/activities`, data);
}

// 更新活动
export function updateActivityApi(id, data) {
  return $http.put(`/api/activities/${id}`, data);
}

// 删除活动
export function deleteActivityApi(id) {
  return $http.delete(`/api/activities/${id}`);
}