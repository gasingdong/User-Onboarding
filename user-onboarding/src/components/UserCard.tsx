import React from 'react';
import { User } from '../App';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps): React.ReactElement => {
  return (
    <div className="usercard">
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
    </div>
  );
};

export default UserCard;
