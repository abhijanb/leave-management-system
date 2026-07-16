import { LoginForm } from "@/features/auth/components/ui/LoginForm";
import { ThemeToggle } from "@/features/ThemeToggle/ThemeToggle";

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background relative">
      <ThemeToggle />
      <div className="w-full max-w-sm px-4">
        <div className="bg-surface border border-outline-variant rounded-xl p-8">
          <div className="mb-8 text-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-on-primary text-2xl font-bold">L</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">Leave</h1>
            <p className="text-sm text-on-surface-variant mt-1">Enterprise Time-Off Management</p>
          </div>

          <LoginForm />
          
          <p className="mt-8 pt-6 border-t border-outline-variant text-center text-sm text-on-surface-variant">
            New to Leave? <a className="text-primary hover:underline" href="#">Contact HR</a>
          </p>
        </div>
      </div>
    </div>
  );
}
