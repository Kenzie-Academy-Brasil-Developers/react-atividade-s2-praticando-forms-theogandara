import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.css";

const Form = () => {
  const [render, setRender] = useState(true);

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome obrigatório")
      .max(18, "Não pode conter mais que 18 caracteres"),
    surname: yup.string().required("Senha inválida"),
    username: yup.string().required("Nome de usuário inválido"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    confirm_email: yup
      .string()
      .required("Confirme seu email")
      .email("Email inválido"),
    password: yup.string().required("Senha obrigatória").min(6,"No mínimo 6 caracteres"),
    confirm_password: yup.string().required("Confirme sua senha").min(6,"No mínimo 6 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
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
            <input
              placeholder="Insira seu melhor email"
              {...register("email")}
            />
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
            <button type="submit" onClick={()=>setRender(false)}>
              Enviar
            </button>
          </form>
    </>
  );
};

export default Form;
