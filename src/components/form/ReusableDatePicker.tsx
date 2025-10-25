import { DatePicker, Form } from 'antd';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs';

type TDatePickerProps = {
  name: string;
  label?: string;
};
const ReusableDatePicker = ({ name, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          const { value, onChange, ...rest } = field;
          // Antd DatePicker uses Dayjs internally. Convert form value -> Dayjs for the picker.
          // The form will receive a formatted string like "Oct 30 2025" on change.
          const pickerValue = value ? dayjs(value) : undefined;

          return (
            <Form.Item label={label}>
              <DatePicker
                {...rest}
                value={pickerValue}
                onChange={d => {
                  // When user selects a date, send back a formatted string: "Oct 30 2025"
                  const formatted = d ? d.format('MMM D YYYY') : null;
                  onChange(formatted);
                }}
                size="large"
                style={{ width: '100%' }}
              />
              {error && <small style={{ color: 'red' }}>{error.message}</small>}
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default ReusableDatePicker;
