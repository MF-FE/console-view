import $http from '@/utils/request';

// 查询报名的列表
export function findEnrollListApi(activityName, pageNo) {
  return $http.get(`/api/activity?activityName=${activityName}&pageNo=${pageNo}`);
}

// 下载表格
export function downEnrollExcelApi(activityName) {
  return $http.get(`/api/activityExcel?name=${activityName}`);
}

// 根据活动名查询该活动的报名人数
export function findEnrollAllByNameApi(activityName) {
  return $http.get(`/api/activity/${activityName}`);
}

// 查询所有报名信息
export function findEnrollAllApi() {
  return $http.get(`/api/activityAll`);
}