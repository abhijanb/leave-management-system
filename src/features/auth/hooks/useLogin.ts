import { useForm } from "react-hook-form";
import { useLoginMutation } from "../authApi";
import { LoginForm, schema } from "../authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export function useLogin() {
    const [login, { isLoading }] = useLoginMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            await login(data).unwrap();
            toast.success("Signed in successfully");
        } catch {
            toast.error("Invalid email or password");
        }
    };
    return {
        register,
        handleSubmit,
        errors,
        isLoading,
        onSubmit,
    }
}