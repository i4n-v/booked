import Footer from "../../components/Layout/Footer";
import { Meta } from "@storybook/react";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";

const meta: Meta = {
  component: Footer, // O componente que você deseja documentar
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description></Description>
          <Subtitle>See the examples and put them into practice:</Subtitle>
          <Primary />
          <Controls />
        </>
      ),
    },
  },
};
export default meta;

export const Default = () => <Footer />;
