import React, { useState } from 'react';
import './App.css';
import FormikLoginForm from './components/LoginForm';

export interface User {
  name: string;
  email: string;
  password: string;
}

const App: React.FC = (): React.ReactElement => {
  const [users, setUsers] = useState<User[]>([]);
  console.log('Users: ', users);
  return (
    <div className="App">
      <FormikLoginForm setUsers={setUsers} />
    </div>
  );
};

export default App;
