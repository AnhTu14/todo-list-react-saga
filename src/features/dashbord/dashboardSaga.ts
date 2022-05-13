import { ListReponsive, Student, City } from "modules";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { dashboardActions, RankingByCity } from "./dashboardSlice";
import studentApi from "api/studentApi";
import cityApi from "api/cityApi";

function* fetchStatistic() {
  const reponsiveList: Array<ListReponsive<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: "male" }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: "female" }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);
  const statisticList = reponsiveList.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;
  yield put(
    dashboardActions.setStatistics({
      maleCount,
      femaleCount,
      highMarkCount,
      lowMarkCount,
    })
  );
}

function* fetchHighestStudentList() {
  const { data }: ListReponsive<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "desc",
  });
  yield put(dashboardActions.setHighestStudentList(data));
}

function* fetchRankingCityList() {
  // Fetch city list
  const { data: cityList }: ListReponsive<City> = yield call(cityApi.getAll);
  // Fetch ranking per city
  const callList = cityList.map((x) =>
    call(studentApi.getAll, {
      _page: 1,
      _limit: 5,
      _sort: "mark",
      _order: "desc",
      city: x.code,
    })
  );
  const responseList: Array<ListReponsive<Student>> = yield all(callList);
  const rankingByCityList: Array<RankingByCity> = responseList.map(
    (x, idx) => ({
      cityId: cityList[idx].code,
      cityName: cityList[idx].name,
      rankingList: x.data,
    })
  );

  // Update state
  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchLowestStudentList() {
  const { data }: ListReponsive<Student> = yield call(studentApi.getAll, {
    _page: 1,
    _limit: 5,
    _sort: "mark",
    _order: "asc",
  });
  yield put(dashboardActions.setLowestStudentList(data));
}
function* fetchDashboardData() {
  try {
    yield all([
      call(fetchStatistic),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingCityList),
    ]);
  } catch (error) {
    console.log("loix", error);
  }
}
export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}
