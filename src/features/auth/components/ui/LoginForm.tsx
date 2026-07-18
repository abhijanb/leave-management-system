'use client'

import { memo } from "react";
import { useLogin } from "../../hooks/useLogin";

export const LoginForm = memo(function LoginForm() {
    const { register, handleSubmit, errors, isLoading, onSubmit } = useLogin();
    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider block mb-1" htmlFor="email">Work Email</label>
                <input className="w-full px-4 py-2 bg-background border border-outline-variant rounded-md text-on-surface placeholder-outline focus:outline-none focus:border-primary" id="email" type="email" placeholder="name@company.com" {...register("email")} />
                {errors.email && <p className="text-xs text-error mt-1">{errors.email.message}</p>}
            </div>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-on-surface-variant uppercase tracking-wider" htmlFor="password">Password</label>
                    <a className="text-xs text-primary hover:underline" href="#">Forgot?</a>
                </div>
                <input className="w-full px-4 py-2 bg-background border border-outline-variant rounded-md text-on-surface placeholder-outline focus:outline-none focus:border-primary" id="password" type="password" placeholder="Password" {...register("password")} />
                {errors.password && <p className="text-xs text-error mt-1">{errors.password.message}</p>}
            </div>
            <div className="flex items-center gap-2">
                <input id="remember" type="checkbox" className="accent-primary" {...register("remember")} />
                <label className="text-sm text-on-surface-variant" htmlFor="remember">Keep me signed in for 30 days</label>
            </div>
            <button className="w-full py-2 bg-primary text-on-primary rounded-md font-semibold hover:brightness-110 transition-all disabled:opacity-50" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
            </button>
        </form>
    )
})
