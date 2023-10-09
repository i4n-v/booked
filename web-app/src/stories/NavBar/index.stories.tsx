import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Meta, Story } from "@storybook/react";
import NavBar from "../../components/Layout/NavBar";
import { NavBarProps } from "../../components/Layout/NavBar/types";

export default {
  title: "NavBar", // O título da sua história
  component: NavBar,
  argTypes: {
    logged: { control: "boolean" },
  },
} as Meta;

const Template: Story<NavBarProps> = (args) => (
  <Router>
    <Link to="/">
      {" "}
      {/* Use o Link para simular a navegação */}
      <NavBar {...args} />
    </Link>
  </Router>
);

export const Logged = Template.bind({});
Logged.args = {
  logged: true,
};

export const Unlogged = Template.bind({});
Unlogged.args = {
  logged: false,
};
