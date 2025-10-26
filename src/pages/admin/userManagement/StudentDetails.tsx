import { useParams } from 'react-router';

const StudentDetails = () => {
  const { studentId } = useParams();
  return (
    <div>
      <h1>This is the StudentDetails Component of Student ID: {studentId}</h1>
    </div>
  );
};

export default StudentDetails;
