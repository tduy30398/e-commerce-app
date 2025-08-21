import ProfileSkeleton from '@/components/molecules/ProfileSkeleton'
import ProfileOauthDetail from '@/components/organisms/ProfileOauthDetail'
import React, { Suspense } from 'react'

const ProfileOauth = () => {
  return (
    <div className="mt-5 lg:mt-9">
      <h1 className='text-3xl font-bold'>Profile Information</h1>
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileOauthDetail />
      </Suspense>
    </div>
  )
}

export default ProfileOauth
