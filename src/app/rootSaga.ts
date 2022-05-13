import { all } from "redux-saga/effects";
import coutersaga from "features/counter/coutersaga";
import authSaga from "features/auth/authSaga";
import dashboardSaga from "features/dashbord/dashboardSaga";
import studentSaga from "features/student/studentSaga";
import citySaga from "features/city/citySaga";
export default function* rootSaga() {
  yield all([
    coutersaga(),
    authSaga(),
    dashboardSaga(),
    studentSaga(),
    citySaga(),
  ]);
}
