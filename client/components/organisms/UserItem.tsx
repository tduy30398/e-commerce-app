import { cn } from '@/lib/utils';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { UserProfile } from '@/actions/authenticate/type';

interface UserItemProps {
  user: UserProfile;
  selectedUser: string;
  setSelectedUser: (id: string) => void;
}

const UserItem = ({ user, selectedUser, setSelectedUser }: UserItemProps) => {
  return (
    <div
      onClick={() => setSelectedUser(user._id)}
      className={cn(
        'flex items-center gap-2 w-full cursor-pointer p-3 hover:bg-gray-200',
        selectedUser === user._id && 'bg-gray-200'
      )}
    >
      <Avatar className="size-9 shrink-0">
        {user.avatar ? (
          <AvatarImage src={user.avatar} alt={user?.name} />
        ) : null}
        <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-0 flex-1">
        <p className="truncate text-base">{user.name}</p>
        <p className="truncate text-sm text-gray-500">Last messgae</p>
      </div>
    </div>
  );
};

export default UserItem;
