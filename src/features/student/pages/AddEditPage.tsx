import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Student } from "modules";
import { useEffect, useState } from "react";
import studentApi from "api/studentApi";
import { Box, Typography } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import StudentForm from "../componnent/StudentForm";
import { toast } from "react-toastify";
export default function AddEditPage() {
  const { id } = useParams();
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!studentId) return;

    // IFFE
    (async () => {
      try {
        const data: Student = await studentApi.getById(studentId);
        setStudent(data);
      } catch (error) {
        console.log("Failed to fetch student details", error);
      }
    })();
  }, [studentId]);

  const handleStudentFormSubmit = async (formValues: Student) => {
    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }

    // Toast success
    toast.success("Thêm thành côngg!");
    navigate("/admin/student");
    // Redirect back to student list
  };
  const initialValues: Student = {
    name: "",
    age: "",
    mark: "",
    gender: "male",
    city: "",
    ...student,
  } as Student;

  return (
    <Box>
      <Link to="/admin/student">
        <Typography
          variant="caption"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ChevronLeft />
          Trở về trang chủ
        </Typography>
      </Link>

      <Typography variant="h4" style={{ textAlign: "left" }}>
        {isEdit ? "Sửa thông tin sinh viên" : "Thêm thông tin sinh viên"}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={initialValues}
            onSubmit={handleStudentFormSubmit}
          />
        </Box>
      )}
    </Box>
  );
}
