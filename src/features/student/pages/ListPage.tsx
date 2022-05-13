import * as React from "react";
import { makeStyles, Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { studentActions } from "../studentSlice";
import { Button } from "react-bootstrap";
import { ListParams, Student } from "modules";
import StudentTable from "../componnent/studentTable";
import StudentFilter from "../componnent/studentFilter";
import studentApi from "api/studentApi";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  selectStudentList,
  selectStudentPagination,
  selectStudentFilter,
} from "../studentSlice";
import { selectCityList, selectCityMap } from "features/city/citySlice";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: theme.spacing(1),
  },
}));

export default function ListPage() {
  const dispatch = useAppDispatch();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);
  const classes = useStyles();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter));
  }, [dispatch, filter]);
  const handlePageChange = (e: any, page: number) => {
    dispatch(
      studentActions.setFilter({
        ...filter,
        _page: page,
      })
    );
  };
  const handleRemoveStudent = async (student: Student) => {
    try {
      // Remove student API
      await studentApi.remove(student?.id || "");

      toast.success("Xóa thành công");

      // Trigger to re-fetch student list with current filter
      const newFilter = { ...filter };
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      // Toast error
      console.log("Failed to fetch student", error);
    }
  };

  const handleEditStudent = async (student: Student) => {
    navigate(`/admin/student/edit/${student.id}`);
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(studentActions.setFilter(newFilter));
  };

  return (
    <div>
      <div className="list-page">
        <div className="head mb-3">
          <div className="title">Student</div>
          <div className="btn">
            <Link to="/admin/student/add" className="list-group-item">
              <Button>Thêm</Button>
            </Link>
          </div>
        </div>

        <Box mb={3}>
          <StudentFilter
            filter={filter}
            cityList={cityList}
            onChange={handleFilterChange}
            onSearchChange={handleSearchChange}
          />
        </Box>
        <div className="list-table">
          <StudentTable
            cityMap={cityMap}
            studentList={studentList}
            onEdit={handleEditStudent}
            onRemove={handleRemoveStudent}
          />
          <Box my={2} display="flex" justifyContent="center">
            <Pagination
              color="primary"
              count={Math.ceil(pagination._totalRows / pagination._limit)}
              page={pagination?._page}
              onChange={handlePageChange}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}
