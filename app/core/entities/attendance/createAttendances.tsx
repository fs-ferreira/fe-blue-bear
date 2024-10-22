
export interface CreateAttendances {
    classroomId:string;
    attendanceDate:Date;
    studentAttendances: KeyValueStudentAttendance;
}

export interface KeyValueStudentAttendance {
    [studentRa: string]: boolean;
  }
  