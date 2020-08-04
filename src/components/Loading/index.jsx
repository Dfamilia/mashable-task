import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [loading, setLoading] = useState('Loading');

  useEffect(() => {
    const setLoadingInterval = setTimeout(() => {
      setLoading(loading !== 'Loading...'
        ? `${loading}.`
        : 'Loading');
    }, 300);

    return () => clearTimeout(setLoadingInterval);
  }, [loading]);

  return <span>{loading}</span>;
};

export default Loading;
