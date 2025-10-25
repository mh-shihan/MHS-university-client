import { Form } from 'antd';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useRef } from 'react';
// import global CSS (not a CSS module)
import '../../styles/inputFile.css';

type TImageInputProps = {
  name: string;
};

const InputFile = ({ name }: TImageInputProps) => {
  const { control } = useFormContext();
  const watched = useWatch({ control, name });
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!watched && inputRef.current) {
      try {
        inputRef.current.value = '';
      } catch {
        // ignore possible DOM errors
      }
    }
  }, [watched]);

  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => {
          const { onChange, onBlur, name: fieldName } = field;
          return (
            <Form.Item label="Image">
              <div className="fileInputContainer">
                <input
                  className="fileInput"
                  type="file"
                  name={fieldName}
                  onBlur={onBlur}
                  ref={inputRef}
                  onChange={e => onChange(e.target.files?.[0])}
                />
              </div>
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default InputFile;
