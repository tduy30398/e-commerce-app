import ProfileSkeleton from '@/components/molecules/ProfileSkeleton';
import ProfileOauthDetail from '@/components/organisms/ProfileOauthDetail';
import React, { Suspense } from 'react';

const ProfileOauth = async () => {

  return (
    <div className="mt-5 lg:mt-9">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileOauthDetail />
      </Suspense>
    </div>
  );
};

export default ProfileOauth;
