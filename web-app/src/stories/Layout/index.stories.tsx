import React from "react";
import Layout from "../../components/Layout";
import {
  Description,
  Subtitle,
  Title,
  Primary,
  Controls,
} from "@storybook/blocks";
import { Meta } from "@storybook/react";
import { LayoutProps } from "../../components/Layout/types";

const meta: Meta<LayoutProps> = {
  component: Layout, // O componente que você deseja documentar
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

export const Default = () => <Layout />;
