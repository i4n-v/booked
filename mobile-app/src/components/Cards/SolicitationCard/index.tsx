import React, { useRef } from "react";
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
import { BottomSheetList } from "@/components/BottomSheets";
import { MaterialIcons } from "@expo/vector-icons";

export default function SolicitationCard({ book, id, status, user }: SolicitationCardProps) {
  const colors: Record<ISolicitationStatus, string> = {
    pending: "#9B51E0",
    accepted: "#009306",
    canceled: "#FBE200",
    refused: "#FF4747",
  };

  const badgeColor = colors[status];

  const options: { id: string; name: string; icon: "check" | "close"; onPress: () => void }[] = [
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
        <BottomSheetList
          ref={bottomSheetRef}
          snapPoints={["20%"]}
          flatListProps={{
            data: options,
            renderItem: ({ item }) => {
              console.log("Rendering item:", item); // Verifique se o item está sendo passado corretamente
              return (
                <TouchableOpacity
                  style={{ padding: 20, flexDirection: "row", alignItems: "center" }}
                  onPress={() => handleSelectItem(item)}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={24}
                    color="#9B51E0"
                    style={{ marginRight: 10 }}
                  />
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
        <PositionSolicitationBadge badgeColor={badgeColor} />
      </CardContainer>
    </View>
  );
}
