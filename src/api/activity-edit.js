import $http from '@/utils/request';

export function findAllActivityApi() {
  return $http.get(`/api/activities`);
}

export function saveActivityApi(data) {
  return $http.post(`/api/activities`, data);
}

export function updateActivityApi(id, data) {
  return $http.put(`/api/activities/${id}`, data);
}

export function deleteActivityApi(id) {
  return $http.delete(`/api/activities/${id}`);
}