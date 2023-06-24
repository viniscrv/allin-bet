import { useContext, useState } from "react";
import { Container } from "./styles";
import { AuthContext } from "../../contexts/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

const signupFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    passwordConfirmation: z.string()
        .refine(val => val.length > 0, "Required field")
}).refine(data => data.password === data.passwordConfirmation, {
    message: "Passwords must match",
    path: ["passwordConfirmation"]
});


type SignupFormData = z.infer<typeof signupFormSchema>;

export function Signup() {
    const { toggleAuthenticatedState } = useContext(AuthContext);

    const [registrationFailed, setRegistrationFailed] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupFormSchema)
    });

    function submitSignup(data: SignupFormData) {
        handleSignup(data.name, data.email, data.password);
    }

    async function handleSignup(name: string, email: string, password: string) {
        console.log(name, email, password);

        try {
            const { data } = await api.post("/signup", {
                name,
                email,
                password
            });

            localStorage.setItem("token", JSON.stringify(data.token));
            api.defaults.headers.Authorization = `Bearer ${data.token}`;
            toggleAuthenticatedState(true);
            navigate("/launcher");
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                setRegistrationFailed(true);
                return console.log(err.response.data.message);
            }
        }
    }

    return (
        <Container>
            <h1>Criar Conta</h1>
            <span>Bem-vindo(a)! Crie sua conta.</span>

            <form onSubmit={handleSubmit(submitSignup)}>
                {registrationFailed && (
                    <span className="credentials-error">
                        Falha na criação da conta
                    </span>
                )}
                <input
                    type="text"
                    placeholder="Nome"
                    {...register("name")}
                />
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    {...register("password")}
                />
                <input
                    type="password"
                    placeholder="Confirmação da Senha"
                    {...register("passwordConfirmation")}
                />

                <button type="submit" disabled={isSubmitting}>
                    Criar Conta
                </button>
            </form>
            <p>
                Já tem uma conta? <a href="/login">Entrar</a>
            </p>
        </Container>
    );
}
