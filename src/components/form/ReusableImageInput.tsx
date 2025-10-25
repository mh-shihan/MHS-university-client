import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';
type TImageInputProps = {
  name: string;
};

const ReusableImageInput = ({ name }: TImageInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <Form.Item label="Image">
          <Input
            type="file"
            value={value?.fileName}
            {...field}
            onChange={e => onChange(e.target.files?.[0])}
            size="large"
            style={{ cursor: 'pointer' }}
          />
        </Form.Item>
      )}
    />
  );
};

export default ReusableImageInput;
