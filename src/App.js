import React from 'react';
import root from './common/router/root';
import {RouterProvider} from 'react-router-dom';

const App = () => {
  return <RouterProvider router={root} />;
};

export default App;