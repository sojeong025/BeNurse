import React from "react";
import Input from "./Input";
import { withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Input",
  component: Input,
  decorators: [withKnobs],
};

export const Default = () => (
  <Input
    variant="default"
    onFocus={action("onFocus")}
  >
    Default
  </Input>
);

export const Search = () => (
  <Input
    variant="search"
    onFocus={action("onFocus")}
  >
    Search
  </Input>
);
