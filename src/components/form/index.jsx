import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";
import { useState } from "react";

const Form = () => {
  const [dado, setDado] = useState();
  const [render, setRender] = useState(true);

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome obrigatório")
      .max(18, "Não pode conter mais que 18 caracteres")
      .min(3, "Não pode ter menos de 3 letras"),
    surname: yup.string().required("Sobrenome obrigatório"),
    username: yup.string().required("Nome de usuário inválido"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    confirm_email: yup
      .string()
      .required("Confirme seu email")
      .oneOf([yup.ref("email"), null], "Os emails não são iguais  ")
      .email("Email inválido"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "No mínimo 6 caracteres"),
    confirm_password: yup
      .string()
      .required("Confirme sua senha")
      .min(6, "No mínimo 6 caracteres")
      .oneOf([yup.ref("password"), null], "Senhas diferentes"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setDado(data);
  };

  return (
    <>
      <>
        <h2>Formulário bem loko</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Insira seu nome"
            {...register("name", {
              max: 2,
            })}
          />
          {errors.name?.message}
          <input placeholder="Sobrenome" {...register("surname")} />
          {errors.surname?.message}
          <input placeholder="Nome de Usuário" {...register("username")} />
          {errors.username?.message}
          <input placeholder="Insira seu melhor email" {...register("email")} />
          {errors.email?.message}
          <input
            placeholder="Confirme o email"
            {...register("confirm_email")}
          />
          {errors.confirm_email?.message}
          <input
            type="password"
            placeholder="Insira uma senha"
            {...register("password")}
          />
          {errors.password?.message}
          <input
            type="password"
            placeholder="Confirme a senha"
            {...register("confirm_password")}
          />
          {errors.confirm_password?.message}
          <button type="submit" onClick={() => setRender(false)}>
            Enviar
          </button>
        </form>
        {dado && (
          <p>
            Dados do usuário:
            <br />
            Nome: {dado.name}
            <br />
            Sobrenome: {dado.surname}
            <br />
            User: {dado.username}
            <br />
            Email: {dado.email}
            <br />
            Senha: {dado.password}
          </p>
        )}
      </>
    </>
  );
};

export default Form;
