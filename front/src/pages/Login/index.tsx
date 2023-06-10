import { useContext } from "react";
import { Container } from "./styles";
import { AuthContext } from "../../contexts/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginFormSchema = z.object({
    username: z.string(),
    password: z.string()
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function Login() {
    const { handleLogin, authenticated } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema)
    });

    function submitLogin(data: LoginFormData) {
        handleLogin(data.username, data.password);
    }

    return (
        <Container>
            <h1>Entrar</h1>
            <span>Bom te ver de volta ;)</span>

            <form onSubmit={handleSubmit(submitLogin)}>
                <input
                    type="text"
                    placeholder="Username"
                    {...register("username")}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    {...register("password")}
                />

                <button type="submit" disabled={isSubmitting}>
                    Entrar
                </button>
            </form>
            {authenticated}
            <p>
                Ainda não tem uma conta? <a href="#">Criar conta</a>
            </p>
            <a href="#">Esqueceu sua senha?</a>
        </Container>
    );
}
