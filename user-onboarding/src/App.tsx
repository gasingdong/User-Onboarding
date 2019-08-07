import React from 'react';
import './App.css';
import FormikLoginForm from './components/LoginForm';

const App: React.FC = (): React.ReactElement => {
  return (
    <div className="App">
      <FormikLoginForm />
    </div>
  );
};

export default App;
