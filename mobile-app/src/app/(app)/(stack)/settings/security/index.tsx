import React, { useContext, useLayoutEffect } from "react";
import { TextField } from "@/components/FormFields";
import { MainButton } from "@/components/Buttons";
import { FormContainer } from "./styles";
import { useNavigation } from "expo-router";
import { z } from "zod";
import messages from "@/config/messages";
import { matchRegex } from "@/config/regex";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/services";
import { useMutation } from "react-query";
import { AuthContext } from "@/contexts/AuthContext";
import { useNotifier } from "@/hooks";

const validations = z
  .object({
    previous_password: z
      .string({
        required_error: messages.PASSWORD_REQUIRED,
      })
      .regex(matchRegex.password, messages.PASSWORD_SHAPE),
    password: z
      .string({
        required_error: messages.PASSWORD_REQUIRED,
      })
      .regex(matchRegex.password, messages.PASSWORD_SHAPE),
    confirm_password: z
      .string({
        required_error: messages.PASSWORD_CONFIRMATION_REQUIRED,
      })
      .regex(matchRegex.password, messages.PASSWORD_SHAPE),
  })
  .required()
  .superRefine(({ password, confirm_password }, context) => {
    if (password !== confirm_password) {
      context.addIssue({
        code: "custom",
        message: messages.PASSWORD_CONFIRMATION_MATCH,
        path: ["confirmPassword"],
      });
    }
  });

type IResetPasswordForm = z.infer<typeof validations>;

export default function Security() {
  const navigation = useNavigation();
  const { openNotification } = useNotifier();
  const { user } = useContext(AuthContext)!;

  const { control, handleSubmit, reset } = useForm<IResetPasswordForm>({
    resolver: zodResolver(validations),
  });

  const { passwordChange } = useUser();
  const resetPasswordMutation = useMutation(passwordChange);

  const onSubmit = handleSubmit((values) => {
    resetPasswordMutation.mutate(
      {
        id: user!.id,
        data: values,
      },
      {
        onSuccess: () => {
          reset();
          openNotification({ status: "success", message: "Senha atualizada com sucesso." });
        },
        onError: (error: any) => {
          openNotification({ status: "error", message: error.message });
        },
      },
    );
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Segurança",
    });
  }, []);

  return (
    <FormContainer>
      <TextField name="previous_password" control={control} label="Senha" password />
      <TextField name="password" control={control} label="Nova Senha" password />
      <TextField name="confirm_password" control={control} label="Confirme sua senha" password />
      <MainButton
        style={{
          marginTop: 8,
        }}
        onPress={onSubmit}
        loading={resetPasswordMutation.isLoading}
      >
        Salvar
      </MainButton>
    </FormContainer>
  );
}
