'use client';

import SocialLoginItem from '@/components/molecules/SocialLoginItem';
import { Link } from '@/i18n/navigation';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LoginForm from '../organisms/LoginForm';
import RegisterForm from '../organisms/RegisterForm';
import { firebaseLogin } from '@/actions/authenticate/firebaseLogin';
import { toast } from 'sonner';
import axiosInstance, { setAccessTokenHeader } from '@/lib/axios';
import { UserProfile } from '@/actions/authenticate/type';
import { AxiosResponse } from 'axios';
import useProfileStore from '@/store/useProfileStore';
import { useRouter } from '@/i18n/navigation';

interface AuthFormProps {
  type: 'login' | 'register';
}

const AuthForm = ({ type }: AuthFormProps) => {
  const t = useTranslations('login');
  const { setAuth } = useProfileStore();
  const router = useRouter();

  const handleLogin = async (provider: 'google' | 'facebook' | 'github') => {
    try {
      const resData = await firebaseLogin(provider);
      setAccessTokenHeader(resData.accessToken);
      const profileRes: AxiosResponse<UserProfile> = await axiosInstance.get(
        'profile'
      );

      if (profileRes.status === 200) {
        setAuth(profileRes.data, resData.accessToken);
      }

      router.replace(ROUTES.HOME);
    } catch (err) {
      console.error('err', err);
      toast.error('Login failed');
    }
  };

  return (
    <div className={cn('flex', type === 'login' ? '' : 'flex-row-reverse')}>
      <div className="w-full md:w-3/5 lg:w-2/5 md:rounded-3xl p-4 md:p-8 max-md:!justify-start flex-center flex-col gap-6">
        <p className="text-4xl font-black max-md:mt-12">
          {type === 'login' ? t('signin') : t('signup')}
        </p>
        <div>
          <span className="text-xl">
            {type === 'login' ? t('description') : t('already')}
          </span>
          <Link
            className="text-xl underline ml-2"
            href={type === 'login' ? ROUTES.REGISTER : ROUTES.LOGIN}
          >
            {type === 'login' ? t('signup') : t('signin')}
          </Link>
        </div>
        <SocialLoginItem
          name="Google"
          icon="/icons/google.svg"
          handleClick={() => handleLogin('google')}
        />
        <SocialLoginItem
          name="Facebook"
          icon="/icons/facebook.svg"
          handleClick={() => handleLogin('facebook')}
        />
        <SocialLoginItem
          name="GitHub"
          icon="/icons/github.svg"
          handleClick={() => handleLogin('github')}
        />
        <div className="max-w-82.5 w-full flex items-center">
          <div className="border-b-[1px] border-gray-300 flex-1"></div>
          <p className="text-md text-[#5c6c75] mx-2">{t('orwith')}</p>
          <div className="border-b-[1px] border-gray-300 flex-1"></div>
        </div>
        {type === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
      <div className="hidden min-h-screen md:block md:w-2/5 lg:w-3/5 relative">
        <Image
          src={`/icons/${type}-bg.svg`}
          alt="background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AuthForm;
