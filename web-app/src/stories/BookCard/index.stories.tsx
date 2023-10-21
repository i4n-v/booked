import { BookCard } from "../../components/Cards";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import { Meta, StoryObj } from "@storybook/react";
import { BookCardProps } from "../../components/Cards/BookCard/types";

const meta: Meta<BookCardProps> = {
  component: BookCard, // O componente que você deseja documentar
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            A card component for displaying book information.
          </Description>
          <Subtitle>See the examples and put them into practice:</Subtitle>
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["lg", "md"],
      },
      description: "The size of the book card.",
    },
    title: { control: "text", description: "The title of the book." },
    author: { control: "text", description: "The author of the book." },
    price: { control: "number", description: "The price of the book." },
    showPrice: {
      control: "boolean",
      description: "Determines whether to display the book's price.",
    },
    rating: { control: "number", description: "The rating of the book." },
    ratingQuantity: {
      control: "number",
      description: "The number of ratings for the book.",
    },
    image: { control: "text", description: "The image URL of the book cover." },
    actionsOptions: {
      control: "object",
      description: "Additional options for card actions.",
    },
    onClick: {
      action: "clicked",
      description: "Handler function for the onClick event.",
    },
  },
  args: {
    size: "md",
    title: "Sample Book 1",
    author: "Author 1",
    price: 19.99,
    showPrice: true,
    rating: 4.5,
    ratingQuantity: 100,
    image: "book1.jpg",
  },
};
export default meta;

type Story = StoryObj<BookCardProps>;

export const Default: Story = {
  render: ({
    title,
    author,
    price,
    showPrice,
    rating,
    ratingQuantity,
    image,
    actionsOptions,
    size,
    onClick,
  }) => (
    <BookCard
      size={size}
      title={title}
      author={author}
      price={price}
      showPrice={showPrice}
      rating={rating}
      ratingQuantity={ratingQuantity}
      image={image}
      actionsOptions={actionsOptions}
      onClick={onClick}
    />
  ),
};
