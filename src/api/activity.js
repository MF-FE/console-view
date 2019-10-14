import $http from '@/utils/request';

export function findEnorllListApi(activityName, pageNo) {
  return $http.get(`/api/activity?activityName=${activityName}&pageNo=${pageNo}`);
}

export function downEnorllExcelApi(activityName) {
  return $http.get(`/api/activityExcel?name=${activityName}`);
}