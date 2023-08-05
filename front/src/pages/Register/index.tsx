import { Container } from "./styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";
import { NavLink, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useState } from "react";

const registerFormSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Seu username deve conter ao menos 3 caracteres" }),
    email: z.string().email({ message: "E-mail inválido" }),
    summary: z
        .string()
        .min(3, "Sua biografia deve conter ao menos 3 caracteres"),
    password: z
        .string()
        .min(6, { message: "Sua senha deve conter ao menos 6 caracteres" }),
    passwordConfirmation: z.string()
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export function Register() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema)
    });

    function submitRegister({
        username,
        summary,
        email,
        password,
        passwordConfirmation
    }: RegisterFormData) {
        if (password !== passwordConfirmation) {
            setPasswordsDoNotMatch(true);
            return;
        }

        setPasswordsDoNotMatch(false);

        setLoading(true);
        handleRegister(username, summary, email, password);
    }

    async function handleRegister(
        username: string,
        summary: string,
        email: string,
        password: string
    ) {
        try {
            await api.post("/register", {
                username,
                summary,
                email,
                password
            });

            alert("Conta criada com sucesso!");
            navigate("/login");
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                return console.log(err.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <h1>Criar Conta</h1>
            <span>Bem-vindo(a)! Crie sua conta.</span>

            <form onSubmit={handleSubmit(submitRegister)}>
                <div>
                    {errors.username && (
                        <span className="invalid">
                            {errors.username.message}
                        </span>
                    )}
                    <input
                        type="text"
                        placeholder="Nome"
                        {...register("username")}
                    />
                </div>
                <div>
                    {errors.summary && (
                        <span className="invalid">
                            {errors.summary.message}
                        </span>
                    )}
                    <input
                        type="text"
                        placeholder="Biografia"
                        {...register("summary")}
                    />
                </div>
                <div>
                    {errors.email && (
                        <span className="invalid">{errors.email.message}</span>
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                    />
                </div>
                <div>
                    {errors.password && (
                        <span className="invalid">
                            {errors.password.message}
                        </span>
                    )}
                    <input
                        type="password"
                        placeholder="Senha"
                        {...register("password")}
                    />
                </div>
                <div>
                    {passwordsDoNotMatch && (
                        <span className="invalid">Senhas não coincidem</span>
                    )}
                    <input
                        type="password"
                        placeholder="Confirmação da Senha"
                        {...register("passwordConfirmation")}
                    />
                </div>

                <button type="submit" disabled={isSubmitting || loading}>
                    Criar Conta
                </button>
            </form>
            <p>
                Já tem uma conta? <NavLink to={"/login"}>Entrar</NavLink>
            </p>
        </Container>
    );
}
