import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TReusableSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const ReusableSelect = ({ label, name, options }: TReusableSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: '100%' }}
            placeholder={`Select ${label}`}
            {...field}
            options={options}
            size="large"
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default ReusableSelect;
