import React, { useState } from 'react';
import './App.css';
import FormikLoginForm from './components/LoginForm';
import UserCard from './components/UserCard';

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

const App: React.FC = (): React.ReactElement => {
  const [users, setUsers] = useState<User[]>([]);
  console.log('Users: ', users);
  return (
    <div className="App">
      <FormikLoginForm setUsers={setUsers} />
      {users.map(
        (user): React.ReactElement => (
          <UserCard user={user} key={user.email} />
        )
      )}
    </div>
  );
};

export default App;
