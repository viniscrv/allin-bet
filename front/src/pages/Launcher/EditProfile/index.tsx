import { useContext, useState } from "react";
import { Container } from "./styles";
import { UserContext } from "../../../contexts/UserContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Pen } from "@phosphor-icons/react";
import { api } from "../../../lib/axios";

const profileSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function EditProfile() {
  const { userData } = useContext(UserContext);
  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: userData?.username,
      email: userData?.email,
    },
  });

  async function submitForm(data: ProfileFormData) {
    const { username, email, password, passwordConfirmation } = data;

    if (password !== passwordConfirmation) {
        console.error("As senhas não correspondem.");
        return;
    }

    try {
    
        const response = await api.post('/register', { username, email, password });

        if (response.status === 200) {
            console.log('Usuário registrado com sucesso!');
        } else {
            console.error('Erro ao registrar usuário:', response.data.error);
        }
    } catch (error: any) {
        if (error.response && error.response.data) {
            console.error('Erro ao registrar usuário:', error.response.data.error);
        } else {
            console.error('Erro ao registrar usuário:', error.message);
        }
    }
}

    const [selectedFile, setSelectedFile] = useState<string | null>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(URL.createObjectURL(event.target.files[0]));
    }
  }

  return (
    <Container>
      <h1>Editar perfil</h1>

      <main>
        <img src={selectedFile || "https://github.com/viniscrv.png"} />
        <label htmlFor="fileUpload" className="customFileUpload">
             Selecionar nova foto
        </label>
        <input type="file" id="fileUpload" style={{display: 'none'}} onChange={handleFileChange} />

        
        <form onSubmit={handleSubmit(submitForm)}>
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
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
            placeholder="Confirme a senha"
            {...register("passwordConfirmation")}
          />

          <button type="submit" disabled={isSubmitting}>
            <Pen size={24} />
          </button>
        </form>
      </main>
    </Container>
  );
}
