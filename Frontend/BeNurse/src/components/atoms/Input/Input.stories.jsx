import React from "react";
import Input from "./Input";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Components/Input",
  component: Input,
  decorators: [withKnobs],
};

export const Default = () => <Input variant="default">Default</Input>;
export const Search = () => <Input variant="search">Search</Input>;
