import SignupForm from '@/presentation/components/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
