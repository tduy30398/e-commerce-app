import { auth } from '@/auth';
import React from 'react';
import Uploader from './Uploader';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

const ProfileOauthDetail = async () => {
  const session = await auth();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="col-span-1 md:col-span-2">
        <Uploader
          disabled
          value={session?.user?.image}
          roundedFull
          className="w-fit mx-auto"
        />
      </div>
      <div className="col-span-1">
        <Label>Name</Label>
        <Input
          className="h-12 text-lg! border-[#889397] mt-2"
          value={session?.user?.name || ''}
          disabled
        />
      </div>
      <div className="col-span-1">
        <Label>Email</Label>
        <Input
          className="h-12 text-lg! border-[#889397] mt-2"
          value={session?.user?.email || ''}
          disabled
        />
      </div>
    </div>
  );
};

export default ProfileOauthDetail;
