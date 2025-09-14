import ProfileSkeleton from '@/components/molecules/ProfileSkeleton';
import ProfileOauthDetail from '@/components/organisms/ProfileOauthDetail';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react';

const ProfileOauth = async () => {
  const t = await getTranslations('profile');

  return (
    <div className="mt-5 lg:mt-9">
      <h1 className="text-4xl font-black">{t('information')}</h1>
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileOauthDetail />
      </Suspense>
    </div>
  );
};

export default ProfileOauth;
