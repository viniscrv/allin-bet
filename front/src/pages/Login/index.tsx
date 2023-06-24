import { useContext, useState } from "react";
import { Container } from "./styles";
import { AuthContext } from "../../contexts/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";
import { NavLink, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const loginFormSchema = z.object({
    username: z.string(),
    password: z.string()
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function Login() {
    const { toggleAuthenticatedState } = useContext(AuthContext);

    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const navigate = useNavigate();

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

    async function handleLogin(username: string, password: string) {
        console.log(username, password);

        try {
            const { data } = await api.post("/login", {
                username,
                password
            });

            localStorage.setItem("token", JSON.stringify(data.token));
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            toggleAuthenticatedState(true);
            navigate("/launcher");
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                setInvalidCredentials(true);
                return console.log(err.response.data.message);
            }
        }
    }

    return (
        <Container>
            <h1>Entrar</h1>
            <span>Bom te ver de volta ;)</span>

            <form onSubmit={handleSubmit(submitLogin)}>
                {invalidCredentials && (
                    <span className="credentials-error">
                        Usuário e/ou senha incorretos
                    </span>
                )}
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
            <p>
                Ainda não tem uma conta?
                <NavLink to={"/register"}>Criar conta</NavLink>
            </p>
            <a href="#">Esqueceu sua senha?</a>
        </Container>
    );
}
