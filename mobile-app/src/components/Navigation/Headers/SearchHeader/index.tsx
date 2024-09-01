import React, { useContext, useState } from "react";
import { HeaderContainer, Wrapper } from "./styles";
import { Dimensions, Image } from "react-native";
import { IconButton } from "@/components/Buttons";
import { ArrowBack, Search, User } from "@/components/Icons";
import { TextField } from "@/components/FormFields";
import { useForm } from "react-hook-form";
import { IFilterBy } from "./types";
import { useTheme } from "styled-components/native";
import Animated, { EntryExitTransition, FadeIn, FadeOut } from "react-native-reanimated";
import { z } from "zod";
import { GlobalContext } from "@/contexts/GlobalContext";
import { useDebounceCallback } from "@/hooks";
import { router } from "expo-router";

const logo = require("@/../assets/images/logo-dark.png");
const windowWidth = Dimensions.get("window").width - 128 - 16;
const AnimatedWraper = Animated.createAnimatedComponent(Wrapper);

const validations = z.object({
  filter: z.string(),
});

type ISearchFilter = z.infer<typeof validations>;

export default function SearchHeader() {
  const theme = useTheme();
  const [search, setSearch] = useState(false);
  const [filterBy, setFilterBy] = useState<IFilterBy>("books");
  const { setSearchFilter } = useContext(GlobalContext)!;
  const layoutAnimation = EntryExitTransition.entering(FadeIn).exiting(FadeOut);

  const { control, reset } = useForm<ISearchFilter>({
    defaultValues: {
      filter: "",
    },
  });

  function toggleFilterType() {
    const newValue = filterBy === "books" ? "users" : "books";
    reset();
    setSearchFilter(null);
    setFilterBy(newValue);

    router.replace(`/${newValue}`);
  }

  function toggleSearch() {
    if (!search) {
      router.navigate(`/books`);
    } else {
      reset();
      setSearchFilter(null);
      setFilterBy("books");
      router.back();
    }

    setSearch(!search);
  }

  const handleSearch = useDebounceCallback((value: string) => {
    setSearchFilter(value);
  });

  return (
    <HeaderContainer>
      {search ? (
        <AnimatedWraper layout={layoutAnimation}>
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
            customOnChange={handleSearch}
            inputProps={{
              style: {
                width: windowWidth,
              },
            }}
          />
          <IconButton<any>
            icon={<User color={filterBy === "users" ? theme.colors.secondary?.[0] : ""} />}
            isFocused={filterBy === "users"}
            focusColor={theme.colors.primary?.[200]}
            onPress={toggleFilterType}
          />
        </AnimatedWraper>
      ) : (
        <AnimatedWraper layout={layoutAnimation}>
          <Image source={logo} />
          <IconButton<any> icon={<Search />} onPress={toggleSearch} />
        </AnimatedWraper>
      )}
    </HeaderContainer>
  );
}
