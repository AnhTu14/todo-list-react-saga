import * as React from "react";
import { Student } from "modules";
export interface StudentRankingListProps {
  title: string;
  studentList: Student[];
}

export default function StudentRankingList({
  studentList,
  title,
}: StudentRankingListProps) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Name</th>
                  <th>Mark</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, idx) => (
                  <tr key={student.id}>
                    <td>{idx + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.mark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
