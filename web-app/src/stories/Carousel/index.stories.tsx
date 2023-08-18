import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "../../components";
import CarouselProps from "../../components/Carousel/types";
import { Typography } from "@mui/material";
import CarouselItemProps from "./types";
import { CarouselItemContainer } from "./styles";

const meta: Meta<CarouselProps<any>> = {
  component: Carousel,
  argTypes: {
    data: {
      description: "Array of data, which will be passed to your carousel item.",
    },
    renderItem: {
      description: "Callback used to render your carousel item.",
    },
    keyExtractor: {
      description: "Callback used to extract the key for the carousel item.",
    },
    timer: {
      description:
        "Enable/disable automatic scrolling and set the scrolling time.",
      control: {
        type: "select",
      },
      options: {
        true: true,
        false: false,
        "500": 500,
        "1000": 1000,
        "5000": 5000,
        "10000": 10000,
      },
    },
  },
  args: {
    data: [
      { title: "Item 1" },
      { title: "Item 2" },
      { title: "Item 3" },
      { title: "Item 4" },
      { title: "Item 5" },
      { title: "Item 6" },
      { title: "Item 7" },
      { title: "Item 8" },
      { title: "Item 9" },
      { title: "Item 10" },
    ],
    timer: false,
  },
};

export default meta;
type Story = StoryObj<CarouselProps<any>>;

const CarouselItem = ({ title }: CarouselItemProps) => {
  return (
    <CarouselItemContainer>
      <Typography component="span">{title}</Typography>
    </CarouselItemContainer>
  );
};

export const Default: Story = {
  render: ({ data, timer }) => (
    <Carousel
      data={data}
      renderItem={(item) => <CarouselItem title={item.title} />}
      keyExtractor={(item) => item.title}
      timer={timer}
    />
  ),
};
