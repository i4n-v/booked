import React, { useContext, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import {
  CardContainer,
  InfoContainer,
  Text,
  StatusText,
  PositionSolicitationBadge,
  OptionButton,
} from "./styles";
import { ISolicitationStatus, SolicitationStatus } from "@/types/Solicitation";
import { SolicitationAlert, SolicitationCardProps } from "./types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BottomSheetList, BottomSheetMenu } from "@/components/BottomSheets";
import { MaterialIcons } from "@expo/vector-icons";
import { AuthContext } from "@/contexts/AuthContext";
import Close from "@/components/Icons/Close";
import { useBottomSheet } from "@/hooks";
import { Check } from "@/components/Icons";
import { Alert } from "@/components/Dialogs";
import { IMenuItem } from "@/components/BottomSheets/BottomSheetMenu/types";

export default function SolicitationCard({
  book,
  id,
  status,
  user,
  updateStatus,
}: SolicitationCardProps) {
  const [options, setOptions] = useState<IMenuItem<any>[]>([]);
  const [refActions, handleOpenActions, handleCloseActions] = useBottomSheet();
  const { user: userData } = useContext(AuthContext)!;
  const [alert, setAlert] = useState<SolicitationAlert>({
    open: false,
  });

  const colors: Record<ISolicitationStatus, string> = {
    pending: "#9B51E0",
    accepted: "#009306",
    canceled: "#FBE200",
    refused: "#FF4747",
  };

  const badgeColor = colors[status];

  useEffect(() => {
    const newOptions = [];
    if (user?.id && userData?.id === user?.id && status === "pending") {
      newOptions.push({
        text: "Cancelar Solicitação",
        icon: Close,
        onPress: () =>
          setAlert({
            open: true,
            onConfirm: () => updateStatus(id, "canceled"),
            message: "Cancelar Solicitação ?",
          }),
      });
    }
    if (book?.user?.id && book.user.id === userData?.id && status === "pending") {
      newOptions.push(
        {
          text: "Aceitar Solicitação",
          icon: Check,
          onPress: () =>
            setAlert({
              open: true,
              onConfirm: () => updateStatus(id, "accepted"),
              message: "Aceitar Solicitação ?",
            }),
        },
        {
          text: "Recusar Solicitação",
          icon: Close,
          onPress: () =>
            setAlert({
              open: true,
              onConfirm: () => updateStatus(id, "refused"),
              message: "Recusar Solicitação ?",
            }),
        },
      );
    }
    setOptions(newOptions);

    return () => {
      setOptions([]);
    };
  }, [status, user, book, id, updateStatus]);

  const handleOpenBottomSheet = () => {
    handleOpenActions();
  };

  return (
    <View>
      <CardContainer>
        <Alert
          open={alert.open}
          onClose={() => {
            setAlert({ open: false });
            handleCloseActions();
          }}
          onConfirm={alert.onConfirm}
          title="Solicitação"
          status={"warning"}
          message={alert.message!}
          hasActions={true}
        />

        <BottomSheetMenu<any> items={options} ref={refActions} />

        <InfoContainer
          onPress={() => {
            if (status === "pending") {
              handleOpenBottomSheet();
            }
          }}
        >
          <Text>
            Status: <StatusText>{SolicitationStatus[status]}</StatusText>
          </Text>
          <Text>
            Livro Solicitado: <StatusText>{book?.name}</StatusText>
          </Text>
          <Text>
            Solicitante: <StatusText>{user?.name}</StatusText>
          </Text>
          <Text>
            Responsável pela solicitação: <StatusText>{book?.user?.name}</StatusText>
          </Text>
        </InfoContainer>
        <PositionSolicitationBadge badgeColor={badgeColor} />
      </CardContainer>
    </View>
  );
}
