import { Dimensions, TouchableOpacity } from "react-native";
import Pdf from "react-native-pdf";
import {
  BookMarkContainer,
  ButtonText,
  Counter,
  InfoTools,
  ReaderContainer,
  ToolsContainer,
} from "./styles";
import { useTheme } from "styled-components/native";
import { SliderField } from "../FormFields";
import { useForm } from "react-hook-form";
import BookMark from "../Icons/BookMark";
import { useState } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { IPDFViewerProps } from "./types";
import LottieView from "lottie-react-native";
import bookLoading from "../../animations/book-loading.json";
import BookMarkOutlined from "../Icons/BookMarkOutlined";

const { width, height } = Dimensions.get("window");

const AnimatedToolsContainer = Animated.createAnimatedComponent(ToolsContainer);
const AnimatedBookMarkContainer = Animated.createAnimatedComponent(BookMarkContainer);

export default function PDFViewer({
  url,
  initialPage = 1,
  maxPages,
  showMarkPage = true,
  markedPage,
  onMarkPage,
  onLoad,
}: IPDFViewerProps) {
  const theme = useTheme();
  const [showTools, setShowTools] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const { control, setValue, watch } = useForm({
    defaultValues: {
      page: initialPage,
    },
  });

  const page = watch("page");
  const backIsDisabled = page === 1;
  const nextIsDisabled = page === totalPages || !!(maxPages && page === maxPages);

  function nextPage() {
    setValue("page", page + 1);
  }

  function bacKPage() {
    setValue("page", page - 1);
  }

  return (
    <ReaderContainer>
      {showTools && showMarkPage && (
        <AnimatedBookMarkContainer
          entering={FadeIn}
          exiting={FadeOut}
          onPress={() => {
            if (onMarkPage) {
              onMarkPage(page);
            }
          }}
        >
          {page === markedPage ? <BookMark /> : <BookMarkOutlined />}
        </AnimatedBookMarkContainer>
      )}
      <Pdf
        source={{
          uri: url,
          cache: true,
        }}
        page={page}
        trustAllCerts={false}
        enablePaging
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onPageSingleTap={() => setShowTools((showTools) => !showTools)}
        onLoadComplete={(totalPages) => {
          setTotalPages(totalPages);

          if (onLoad) {
            onLoad();
          }
        }}
        onPageChanged={(page) => {
          setValue("page", page);
        }}
        renderActivityIndicator={() => (
          <LottieView
            autoPlay
            source={bookLoading}
            style={{
              width: 300,
              height: 300,
            }}
          />
        )}
        style={{
          width,
          height,
          backgroundColor: theme.colors.secondary?.[0],
          pointerEvents: nextIsDisabled ? "none" : "auto",
        }}
      />
      {showTools && (
        <AnimatedToolsContainer entering={FadeIn} exiting={FadeOut}>
          <SliderField name="page" control={control} size="xs" min={1} max={totalPages} />
          <InfoTools>
            <TouchableOpacity
              activeOpacity={theme.shape.opacity}
              disabled={backIsDisabled}
              onPress={bacKPage}
            >
              <ButtonText disabled={backIsDisabled}>Voltar</ButtonText>
            </TouchableOpacity>
            <Counter>
              {page} de {totalPages}
            </Counter>
            <TouchableOpacity
              activeOpacity={theme.shape.opacity}
              disabled={nextIsDisabled}
              onPress={nextPage}
            >
              <ButtonText disabled={nextIsDisabled}>Próximo</ButtonText>
            </TouchableOpacity>
          </InfoTools>
        </AnimatedToolsContainer>
      )}
    </ReaderContainer>
  );
}
