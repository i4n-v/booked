import { ReactNode } from "react";

type CarouselProps<T> = {
  data: Array<T>;
  renderItem?: (item: T) => ReactNode;
  keyExtractor?: (item: T) => number | string;
  timer?: number | boolean;
};

export default CarouselProps;
