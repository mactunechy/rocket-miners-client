import React from 'react';
import { useFormikContext } from 'formik';
import ErrorText from './ErrorText';

const FormField = ({ name, onBlur, label,helpText, ...otherProps }) => {
  const {
    setFieldValue,
    errors,
    touched,
    setFieldTouched,
  } = useFormikContext()
  return (
    <div className="form-group">
      {label && <label className="form-group-label text-dark">{label}</label>}
      <input
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
      { helpText &&
      <p className="text-info">{helpText}</p>
       }
      <ErrorText visible={touched[name]} error={errors[name]} />
    </div>
  );
};

export default FormField;
