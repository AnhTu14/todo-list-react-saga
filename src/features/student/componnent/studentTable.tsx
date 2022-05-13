import * as React from "react";
import { Student, City } from "modules";
import { Button } from "react-bootstrap";
import { capitalizeString, getMarkColor } from "utils";
import { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student) => {
    setSelectedStudent(student);
    setOpen(true);
  };

  const handleRemoveConfirm = (student: Student) => {
    onRemove?.(student);
    setOpen(false);
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Mark</th>
                  <th>City</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, idx) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{capitalizeString(student.gender)}</td>
                    <td className={getMarkColor(student.mark)}>
                      {student.mark}
                    </td>
                    <td>{cityMap[student.city]?.name}</td>
                    <td>
                      <Button
                        className="mr-2"
                        onClick={() => onEdit?.(student)}
                      >
                        Sửa
                      </Button>
                      <Button
                        className="ml-3"
                        onClick={() => handleRemoveClick(student)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xóa</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa bản ghì "{selectedStudent?.name}". này không??
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default" variant="outlined">
            Thoát
          </Button>

          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
