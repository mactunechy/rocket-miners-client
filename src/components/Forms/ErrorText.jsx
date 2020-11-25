import React from 'react';

const ErrorText = ({
  error,
  visible,
}) => {
  if (!visible) return null;
  return (
    <div>
      <p style={{ fontSize: 12 }} className="text-danger mt-1">
        {error}
      </p>
    </div>
  );
};

export default ErrorText;
