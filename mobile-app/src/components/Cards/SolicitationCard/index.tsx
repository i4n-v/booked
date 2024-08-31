import React, { useState } from "react";
import { View } from "react-native";
import {
  CardContainer,
  InfoContainer,
  Text,
  StatusText,
  PositionSolicitationBadge,
} from "./styles";
import { ISolicitationStatus } from "@/types/Solicitation";
import { SolicitationCardProps } from "./types";

export default function SolicitationCard({ book, id, status, user }: SolicitationCardProps) {
  const [openOptions, setOpenOptions] = useState(false);

  const colors: Record<ISolicitationStatus, string> = {
    pending: "#007bff",
    accepted: "#28a745",
    canceled: "#FBE200",
    refused: "#dc3545",
  };

  const badgeColor = colors[status];

  return (
    <View>
      <CardContainer>
        <InfoContainer>
          <Text>
            Status: <StatusText>{status}</StatusText>
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
        {/*         {status === "pending" && (
          <TouchableOpacity onPress={() => setOpenOptions(!openOptions)}>
            <Text>Abrir opções</Text>
          </TouchableOpacity>
        )} */}
        <PositionSolicitationBadge />
      </CardContainer>
    </View>
  );
}
