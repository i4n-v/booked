import React, { useRef, useState } from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "@/app/(app)/sigin/styles";
import { BottomSheetList } from "@/components/BottomSheets";
import { useTheme } from "styled-components";

export default function SolicitationCard({ book, id, status, user }: SolicitationCardProps) {
  /*   const [openOptions, setOpenOptions] = useState(false); */

  const theme = useTheme();
  const colors: Record<ISolicitationStatus, string> = {
    pending: "#007bff",
    accepted: "#28a745",
    canceled: "#FBE200",
    refused: "#dc3545",
  };

  /*   const colors: Record<ISolicitationStatus, string> = {
    pending: theme.colors.secondary?.[700],
  }; */

  const badgeColor = colors[status];

  const options = [
    {
      id: "1",
      name: "Aceitar",
      icon: "check",
      onPress: () => console.log("Aceitar pressionado"),
    },
    {
      id: "2",
      name: "Recusar",
      icon: "close",
      onPress: () => console.log("Recusar pressionado"),
    },
  ];

  const bottomSheetRef = useRef<any>(null);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const handleSelectItem = (item: any) => {
    console.log("Item selecionado:", item);
    bottomSheetRef.current?.dismiss();
  };

  return (
    <View>
      <CardContainer>
        {/*  <Button onPress={handleOpenBottomSheet}>Abrir opções</Button>
         */}
        <BottomSheetList
          ref={bottomSheetRef}
          snapPoints={["20%"]}
          flatListProps={{
            data: options,
            renderItem: ({ item }) => {
              console.log("Rendering item:", item); // Verifique se o item está sendo passado corretamente
              return (
                <TouchableOpacity style={{ padding: 20 }} onPress={() => handleSelectItem(item)}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              );
            },
            keyExtractor: (item) => item.id,
            ListEmptyComponent: <Text>Nenhum item encontrado</Text>,
          }}
          onOpen={() => console.log("BottomSheet aberto")}
          onClose={() => console.log("BottomSheet fechado")}
        />

        <InfoContainer
          onPress={() => {
            if (status === "pending") {
              handleOpenBottomSheet();
            }
          }}
        >
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
        {/* {status === "pending" && (
          <TouchableOpacity onPress={() => setOpenOptions(!openOptions)}>
            <Text>Abrir opções</Text>
          </TouchableOpacity>
        )} */}
        <PositionSolicitationBadge badgeColor={badgeColor} />
      </CardContainer>
    </View>
  );
}
