import React from 'react';
import { useFormikContext } from 'formik';
import ErrorText from './ErrorText';
import Select from 'react-select';

const Picker = ({ name, onBlur, items, placeholder, label, ...otherProps }) => {
  const {
    setFieldValue,
    errors,
    touched,

    setFieldTouched,
  } = useFormikContext() 
  return (
    <div className="form-group">
      {label && <label className="form-group-label">{label}</label>}
      <Select
        //   value={() => items.find(i => i.value === values )}

        placeholder={placeholder}
        onChange={(item) => setFieldValue(name, item.value)}
        name="notifyUserIds"
        options={items}
        className="basic-multi-select"
        classNamePrefix="select"
        cacheOptions
        onBlur={() => {
          if (onBlur) onBlur();
          setFieldTouched(name);
        }}
        defaultOptions
      />
      <ErrorText visible={touched[name]} error={errors[name]} />
    </div>
  );
};

export default Picker;
