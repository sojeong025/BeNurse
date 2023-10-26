import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const Default = () => (
  <Button onClick={action("clicked")}>Default</Button>
);
export const Primary = () => (
  <Button
    variant="primary"
    onClick={action("clicked")}
  >
    Primary
  </Button>
);
export const Secondary = () => (
  <Button
    variant="secondary"
    onClick={action("clicked")}
  >
    Secondary
  </Button>
);
