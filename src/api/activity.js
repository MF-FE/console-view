import $http from '@/utils/request';

export function findEnrollListApi(activityName, pageNo) {
  return $http.get(`/api/activity?activityName=${activityName}&pageNo=${pageNo}`);
}

export function downEnrollExcelApi(activityName) {
  return $http.get(`/api/activityExcel?name=${activityName}`);
}

export function findEnrollAllApi(activityName) {
  return $http.get(`/api/activityAll/${activityName}`);
}