import React from "react";
import ImageBlur from "../../components/ImageBlur";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import { Meta } from "@storybook/react";
import bookcase from "../../assets/IMG/bookcase.jpg";
import imageHashs from "../../assets/IMG/imageHashs";

const meta: Meta = {
  component: ImageBlur,
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>ImageHash</Description>
          <Subtitle>See the examples and put them into practice:</Subtitle>
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  argTypes: {
    src: {
      control: "text",
      description:
        "The URL of the original image to be displayed once it's loaded.",
    },
    hash: {
      control: "text",
      description:
        "A Blurhash representation of the image. It provides a visual preview while the original image is loading.",
    },
    otherwise: {
      control: "text",
      description:
        "The URL of an alternative image to be displayed in case of loading or error issues.",
    },
  },
  args: {
    src: bookcase,
    hash: imageHashs.bookcase,
  },
};
export default meta;

export const Default = () => <ImageBlur />;
