import React from "react";
import Input from "./Input";
import { withKnobs } from "@storybook/addon-knobs";

export default {
  title: "Components/Input",
  component: Input,
  decorators: [withKnobs],
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "텍스트를 입력하세요",
  buttonColor: "#fff",
};
