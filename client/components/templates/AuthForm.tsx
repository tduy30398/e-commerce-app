import SocialLoginItem from '@/components/molecules/SocialLoginItem';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { socialData } from '@/public/dummy/general';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import LoginForm from '../organisms/LoginForm';
import RegisterForm from '../organisms/RegisterForm';
import { Link } from '@/i18n/navigation';

interface AuthFormProps {
  type: 'login' | 'register';
  locale: string;
}

const AuthForm = async ({ type, locale }: AuthFormProps) => {
  const t = await getTranslations({ locale, namespace: 'login' });

  return (
    <div className={cn('flex', type === 'login' ? '' : 'flex-row-reverse')}>
      <div className="max-md:h-screen w-full md:w-3/5 lg:w-2/5 md:rounded-3xl p-4 md:p-8 max-md:!justify-start flex-center flex-col gap-6">
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
        {socialData.map((item) => (
          <SocialLoginItem key={item.name} {...item} />
        ))}
        <div className="max-w-82.5 w-full flex items-center">
          <div className="border-b-[1px] border-gray-300 flex-1"></div>
          <p className="text-md text-[#5c6c75] mx-2">{t('orwith')}</p>
          <div className="border-b-[1px] border-gray-300 flex-1"></div>
        </div>
        {type === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
      <div className="hidden h-screen md:block md:w-2/5 lg:w-3/5 relative">
        <Image
          src="/icons/login-bg.svg"
          alt="background"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default AuthForm;
