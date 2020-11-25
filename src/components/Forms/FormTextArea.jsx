import React from 'react';
import { useFormikContext } from 'formik';
import ErrorText from './ErrorText';

const FormTextArea= ({ name, onBlur, label, ...otherProps }) => {
  const {
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
  } = useFormikContext()
  return (
    <div className="form-group">
      {label && <label className="form-group-label text-dark">{label}</label>}
      <textarea
        rows={3}
        className="form-control"
        {...otherProps}
        onChange={(e) =>
          setFieldValue(name, e.target.value)
        }
        onBlur={() => {
          if (onBlur) onBlur();
          setFieldTouched(name);
        }}
      />
      <ErrorText visible={touched[name]} error={errors[name]} />
    </div>
  );
};

export default FormTextArea;
