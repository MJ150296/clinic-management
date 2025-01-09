import SuperAdminSignupForm from "@/components/Forms/SuperAdminSignupForm copy";
import LoginForm from "@/components/Signup, register, login form/LoginForm";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="w-full h-full flex">
        <div className="w-1/2 flex flex-col bg-[#18181b]"></div>
        <div className="w-1/2 flex">
          <LoginForm />

          {/* <SuperAdminSignupForm /> */}
        </div>
      </div>
    </div>
  );
}
