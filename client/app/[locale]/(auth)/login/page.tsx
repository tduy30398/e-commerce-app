import AuthForm from '@/components/templates/AuthForm';

const Login = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const locale = await params;

  return <AuthForm type="login" locale={locale?.locale || ''} />;
};

export default Login;
