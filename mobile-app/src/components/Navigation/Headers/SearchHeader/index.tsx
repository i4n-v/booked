import React, { useState } from "react";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs/src/types";
import { HeaderContainer, Wrapper } from "./styles";
import { Dimensions, Image } from "react-native";
import { IconButton } from "@/components/Buttons";
import { ArrowBack, Search, User } from "@/components/Icons";
import { TextField } from "@/components/FormFields";
import { useForm } from "react-hook-form";
import { IFilterBy } from "./types";
import { useTheme } from "styled-components/native";
import Animated, { EntryExitTransition, FadeIn, FadeOut } from "react-native-reanimated";

const logo = require("../../../../../assets/images/logo-dark.png");

const windowWidth = Dimensions.get("window").width - 128 - 16;

const AnimatedWrapper = Animated.createAnimatedComponent(Wrapper);

export default function SearchHeader({ layout, options, route, navigation }: BottomTabHeaderProps) {
  const [search, setSearch] = useState(false);
  const [filterBy, setFilterBy] = useState<IFilterBy>("book");
  const theme = useTheme();
  const layoutAnimation = EntryExitTransition.entering(FadeIn).exiting(FadeOut);

  const { control } = useForm();

  function toggleFilterType() {
    setFilterBy((filterBy) => (filterBy === "book" ? "author" : "book"));
  }

  function toggleSearch() {
    setSearch((search) => !search);
  }

  return (
    <HeaderContainer>
      {search ? (
        <AnimatedWrapper layout={layoutAnimation}>
          <IconButton<any>
            icon={<ArrowBack />}
            size={0}
            focusColor={theme.colors.secondary?.[50]}
            onPress={toggleSearch}
          />
          <TextField<any>
            control={control}
            name="filter"
            placeholder="Buscar..."
            rightIcon={{
              icon: <Search width={24} height={24} />,
              onPress: () => {},
            }}
            required
            inputProps={{
              style: {
                width: windowWidth,
              },
            }}
          />
          <IconButton<any>
            icon={<User color={filterBy === "author" ? theme.colors.secondary?.[0] : ""} />}
            isFocused={filterBy === "author"}
            focusColor={theme.colors.primary?.[200]}
            onPress={toggleFilterType}
          />
        </AnimatedWrapper>
      ) : (
        <AnimatedWrapper layout={layoutAnimation}>
          <Image source={logo} />
          <IconButton<any> icon={<Search />} onPress={toggleSearch} />
        </AnimatedWrapper>
      )}
    </HeaderContainer>
  );
}
