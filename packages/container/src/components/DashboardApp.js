import { mount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';

//nois
export default () => {
  const ref = useRef(null);
  useEffect(() => {
    mount(ref.current);
  }, []);
  return <div ref={ref} />;
};
