import React, { useState, useRef } from "react";
import { useUser, useFollow, useBook } from "@/services";
import { useQuery, useMutation } from "react-query";
import { router, useLocalSearchParams, useFocusEffect } from "expo-router";
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
import { ReadMore } from "@/components";

const Profile = () => {
  const { userId } = useLocalSearchParams();
  const { getUser } = useUser();
  const { getBooks } = useBook();
  const { followUser, unfollowUser } = useFollow();
  const [page] = useState(1);
  const [isFollowing, setIsFollowing] = useState(false);
  const bottomSheetRef = useRef(null);

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

  const followMutation = useMutation(followUser, {
    onSuccess: () => setIsFollowing(true),
    onError: (error) => console.error("Error following user:", error),
  });

  const unfollowMutation = useMutation(unfollowUser, {
    onSuccess: () => setIsFollowing(false),
    onError: (error) => console.error("Error unfollowing user:", error),
  });

  const handleFollowToggle = async () => {
    if (isFollowing) {
      unfollowMutation.mutate(userId as string);
    } else {
      followMutation.mutate(userId as string);
    }
  };

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (bottomSheetRef.current) {
          bottomSheetRef.current.dismiss();
        }
      };
    }, []),
  );

  if (isLoading) {
    return (
      <Container>
        <StyledText>Carregando usuário...</StyledText>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <StyledText>Erro ao carregar dados do usuário</StyledText>
      </Container>
    );
  }

  const bottomSheetItems = [
    { text: "Conta", icon: User, onPress: () => router.navigate("/profile/account") },
    { text: "Segurança", icon: Security, onPress: () => router.navigate("/profile/security") },
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
              style={isFollowing ? ButtonFollowing : ""}
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

          <ReadMore>{user.description}</ReadMore>
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
                onPress={() =>
                  router.navigate({
                    pathname: "/books/[id]",
                    params: { id: item.id },
                  })
                }
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
