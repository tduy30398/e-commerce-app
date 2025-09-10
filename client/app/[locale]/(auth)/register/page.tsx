import AuthForm from "@/components/templates/AuthForm";

const Register = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const locale = await params;

  return <AuthForm type="register" locale={locale?.locale || ''} />;
};

export default Register;
