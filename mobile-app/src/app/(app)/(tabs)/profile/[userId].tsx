import React, { useState, useRef } from "react";
import { useUser } from "@/services";
import { useQuery } from "react-query";
import { useBook } from "@/services";
import { useLocalSearchParams } from "expo-router";
import Config from "@/components/Icons/Config";
import Follow from "@/components/Icons/Follow";
import User from "@/components/Icons/User";
import BottomSheetMenu from "@/components/BottomSheets/BottomSheetMenu";
import {
  Container,
  Text as StyledText,
  IdentityInfo,
  Name,
  Dot,
  Username,
  FollowContainer,
  ButtonFollowing,
  ButtonNotFollowing,
  ButtonText,
  FollowButton,
  StatsContainer,
  StatBox,
  StatValue,
  StatLabel,
  Divider,
  DividerVertical,
} from "./styles";
import { FlatList, Image } from "react-native";
import { BookCard } from "@/components/Cards";
import Security from "@/components/Icons/Security";
import Logout from "@/components/Icons/Logout";

const Profile = () => {
  const { userId } = useLocalSearchParams();
  const { getUser } = useUser();
  const { getBooks } = useBook();
  const [page] = useState(1);

  const [isFollowing, setIsFollowing] = useState(false);

  const bottomSheetRef = useRef(null);

  console.log("User ID: ", userId);
  console.log("Books:", { user_id: userId, page, limit: 12 });

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(["getUser", userId], () => getUser(userId as string), {
    enabled: !!userId,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setIsFollowing(data?.followed || false);
    },
  });

  const { data: books } = useQuery(
    ["getUserBooks", { page }],
    () => getBooks({ user_id: userId as string, page, limit: 12 }),
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error("Error fetching books:", error);
      },
    },
  );

  const handleFollowToggle = async () => {
    try {
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error toggling follow status", error);
    }
  };

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  };

  if (isLoading) {
    return (
      <Container>
        <StyledText>Loading user...</StyledText>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StyledText>Error loading user data</StyledText>
      </Container>
    );
  }

  const bottomSheetItems = [
    { text: "Conta", icon: User, onPress: () => console.log("Conta pressed") },
    { text: "Segurança", icon: Security, onPress: () => console.log("Segurança pressed") },
    { text: "Sair", icon: Logout, onPress: () => console.log("Sair pressed") },
  ];

  return (
    <Container>
      {user ? (
        <>
          <IdentityInfo>
            <Config style={{ position: "absolute", right: 10 }} onPress={openBottomSheet} />
            <Name>{user.name}</Name>
            <Dot>•</Dot>
            <Username>@{user.user_name}</Username>
          </IdentityInfo>
          <Divider />

          <FollowContainer>
            {user.photo_url ? (
              <Image
                source={{ uri: user.photo_url }}
                style={{ width: 60, height: 60, borderRadius: 25 }}
              />
            ) : (
              <User width={60} height={60} />
            )}
            <FollowButton
              style={isFollowing ? ButtonFollowing : ButtonNotFollowing}
              onPress={handleFollowToggle}
            >
              <ButtonText>{isFollowing ? "Seguindo" : "Seguir"}</ButtonText>
              <Follow style={{ left: 2 }} width={24} height={24} />
            </FollowButton>

            <StatsContainer>
              <StatBox>
                <StatValue>{user.total_followers}</StatValue>
                <StatLabel>Seguidores</StatLabel>
              </StatBox>
              <DividerVertical />
              <StatBox>
                <StatValue>{user.total_books}</StatValue>
                <StatLabel>Livros</StatLabel>
              </StatBox>
              <DividerVertical />
              <StatBox>
                <StatValue>{user.total_acquitions}</StatValue>
                <StatLabel>Bibliotecas</StatLabel>
              </StatBox>
            </StatsContainer>
          </FollowContainer>

          <StyledText>{user.description}</StyledText>
          <Divider />

          <FlatList
            data={books?.items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <BookCard
                style={{ marginHorizontal: 8 }}
                title={item.name}
                author={item.user?.name}
                rating={item.rating}
                price={item.price}
                image={item.photo_url}
                ratingQuantity={item.total_users_rating}
              />
            )}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            ListEmptyComponent={<StyledText>Não há livros publicados.</StyledText>}
          />
        </>
      ) : (
        <StyledText>No user data found</StyledText>
      )}
      <BottomSheetMenu ref={bottomSheetRef} items={bottomSheetItems} />
    </Container>
  );
};

export default Profile;
