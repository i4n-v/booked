import React, { useContext, useLayoutEffect } from "react";
import { TextField, DateField, PhotoField } from "@/components/FormFields";
import { MainButton } from "@/components/Buttons";
import { User } from "@/components/Icons";
import { useForm } from "react-hook-form";
import { Divider, FormContainer } from "./styles";
import messages from "@/config/messages";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useNavigation } from "expo-router";
import { ScrollView } from "react-native";
import { useUser } from "@/services";
import { useMutation, useQuery } from "react-query";
import { AuthContext } from "@/contexts/AuthContext";
import { useNotifier } from "@/hooks";
import { GlobalContext } from "@/contexts/GlobalContext";
import { format, parseISO } from "date-fns";

const validations = z
  .object({
    name: z.string({ required_error: messages.NAME_REQUIRED }),
    user_name: z
      .string({ required_error: messages.USERNAME_REQUIRED })
      .min(2, messages.USERNAME_MIN_LENGTH),
    email: z
      .string({
        required_error: messages.EMAIL_REQUIRED,
      })
      .email(messages.EMAIL_INVALID),
    birth_date: z.date({
      required_error: messages.DATE_REQUIRED,
    }),
    description: z.string(),
    photo: z.any().nullable(),
  })
  .required({
    name: true,
    user_name: true,
    email: true,
    birth_date: true,
  });

type IUserForm = z.infer<typeof validations>;

export default function Account() {
  const navigation = useNavigation();
  const { openNotification } = useNotifier();
  const { user, setUser } = useContext(AuthContext)!;
  const { loading } = useContext(GlobalContext)!;

  const { control, handleSubmit, reset } = useForm<IUserForm>({
    resolver: zodResolver(validations),
  });

  const { updateUser, getUser } = useUser();
  const updateUserMutation = useMutation(updateUser);

  useQuery(
    ["user", user?.id],
    () => {
      loading({ isLoading: true });
      return getUser(user!.id);
    },
    {
      onError(error: any) {
        router.back();
        openNotification({ status: "error", message: error.message });
      },
      onSettled(response) {
        if (response) {
          const formValues: IUserForm = {
            name: response.name,
            user_name: response.user_name,
            email: response.email!,
            birth_date: parseISO(response.birth_date as string),
            description: response.description!,
            photo: null,
          };

          if (response.photo_url) {
            formValues.photo = {
              uri: response.photo_url,
            };
          }

          reset(formValues);
          loading({ isLoading: false });
        }
      },
    },
  );

  const onSubmit = handleSubmit((values) => {
    const data = {
      id: user!.id,
      ...values,
      birth_date: format(values.birth_date, "yyyy-MM-dd"),
    };

    if (!data.photo?.type) {
      delete data.photo;
    }

    updateUserMutation.mutate(data, {
      onSuccess: (response) => {
        setUser((user) => ({
          ...user!,
          name: data.name,
          user_name: data.user_name,
          email: data.email,
          description: data.description,
          birth_date: data.birth_date,
          photo_url: data.photo?.type ? data.photo.uri : user!.photo_url,
        }));
        openNotification({ message: response.message, status: "success" });
      },
      onError(error: any) {
        openNotification({ message: error.message, status: "error" });
      },
    });
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Conta",
    });
  }, []);

  return (
    <ScrollView>
      <FormContainer>
        <PhotoField name="photo" control={control} label="Editar foto de perfil" />
        <Divider />
        <TextField
          name="name"
          control={control}
          label="Nome"
          containerProps={{
            style: {
              marginTop: 8,
            },
          }}
        />
        <TextField<any>
          name="user_name"
          label="Usuário"
          rightIcon={{
            icon: <User />,
          }}
          control={control}
        />
        <TextField name="email" control={control} label="E-mail" />
        <DateField name="birth_date" control={control} label="Data de nascimento" />
        <TextField name="description" label="Bios" control={control} textArea />
        <MainButton style={{ marginTop: 8 }} onPress={onSubmit}>
          Salvar
        </MainButton>
      </FormContainer>
    </ScrollView>
  );
}
