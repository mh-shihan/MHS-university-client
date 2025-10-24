import { zodResolver } from '@hookform/resolvers/zod';
import ReusableSelect from '../../../components/form/ReusableSelect';
import { Button, Col, Flex } from 'antd';
import { monthOptions } from '../../../constants/global.constant';
import ReusableForm from '../../../components/form/ReuseableForm';
import { toast } from 'sonner';
import { semesterOptions } from '../../../constants/semester.constant';
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';
import { useAddAcademicSemesterMutation } from '../../../redux/features/admin/academicManagement.api';
import type { TAcademicSemester, TResponse } from '../../../types';

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map(number => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const toastId = toast.loading('Creating...');

    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponse<TAcademicSemester>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success('Semester created', { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Something went wrong', { id: toastId });
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <ReusableForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <ReusableSelect label="Name" name="name" options={semesterOptions} />
          <ReusableSelect label="Year" name="year" options={yearOptions} />
          <ReusableSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <ReusableSelect
            label="End Month"
            name="endMonth"
            options={monthOptions}
          />

          <Button htmlType="submit">Submit</Button>
        </ReusableForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
