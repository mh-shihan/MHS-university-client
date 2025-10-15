import { useGetAllAcademicSemesterQuery } from '../../../redux/features/academicSemester/academicSemesterApi';

const AcademicSemester = () => {
  const { data } = useGetAllAcademicSemesterQuery(undefined);
  console.log(data);

  return (
    <div>
      <h1>This is the AcademicSemester Component</h1>
    </div>
  );
};

export default AcademicSemester;
