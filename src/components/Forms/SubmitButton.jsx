import React from 'react';
import { useFormikContext } from 'formik';

const SubmitButton = ({ loading, title = 'Save' }) => {
  const { handleSubmit } = useFormikContext();
  return (
    <button
      className="btn btn-danger"
      onClick={() => handleSubmit()}
      type="button"
      disabled={loading}
    >
      {loading ? 'Loading...' : title}
    </button>
  );
};

export default SubmitButton;
