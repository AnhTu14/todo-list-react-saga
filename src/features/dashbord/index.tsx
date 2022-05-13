import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { dashboardActions } from "./dashboardSlice";
import {
  selectDashboardLoading,
  selectDashboardStatistics,
  selectHighestStudentList,
  selectLowestStudentList,
  selectRankingByCityList,
} from "./dashboardSlice";
import StatisticItem from "./component/StatisticItem";
import { stat } from "fs";
import StudentRankingList from "./component/StudentRankingList";

// export default function DashBoard() {
//   const dispatch = useDispatch;
//   useEffect(() => {
//     dispatch(dashboardActions.fetchData());
//   }, [dispatch]);
//   return <div>dashbord</div>;
// }

export default function DashBoard() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectDashboardLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const highestStudentList = useAppSelector(selectHighestStudentList);
  const lowestStudentList = useAppSelector(selectLowestStudentList);
  const rankingByCityList = useAppSelector(selectRankingByCityList);
  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);
  return (
    <div className="dashbord">
      <div className="statistic">
        <div className="row">
          <div className="col-md-3 stretch-card grid-margin">
            <StatisticItem label="Nam" value={statistics.maleCount} />
          </div>
          <div className="col-md-3 stretch-card grid-margin">
            <StatisticItem label="Nữ" value={statistics.femaleCount} />
          </div>
          <div className="col-md-3 stretch-card grid-margin">
            <StatisticItem label="Điểm >=8" value={statistics.highMarkCount} />
          </div>
          <div className="col-md-3  stretch-card grid-margin">
            <StatisticItem label="Điểm <=5" value={statistics.lowMarkCount} />
          </div>
        </div>
      </div>
      <div className="all-student mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="title text-left mb-3">Tất cả</div>
          </div>
          <div className="col-md-4  stretch-card grid-margin">
            <StudentRankingList
              title="Sinh viên có điểm cao nhất"
              studentList={highestStudentList}
            />
          </div>
          <div className="col-md-4  stretch-card grid-margin">
            <StudentRankingList
              title="Sinh viên có điểm thấp nhất"
              studentList={lowestStudentList}
            />
          </div>
        </div>
      </div>
      <div className="ranking mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="title text-left mb-3">Xếp hạng theo thành phố</div>
          </div>
          {rankingByCityList.map((ranking) => (
            <div
              className="col-md-3  stretch-card grid-margin"
              key={ranking.cityId}
            >
              <StudentRankingList
                title={ranking.cityName}
                studentList={ranking.rankingList}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
