import React from 'react';
import { Formik } from 'formik';

const Form= ({ initialValues, handleSubmit, validationSchema, children }) => {
  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => handleSubmit(values)}
      >
        {() => children}
      </Formik>
    </div>
  );
};

export default Form;
