import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import ModalComponent from "./Modal";

export default {
  title: "Modals",
  component: ModalComponent,
  decorators: [withKnobs],
};

const Template = (args) => <ModalComponent {...args} />;

export const DefaultModal = Template.bind({});
DefaultModal.args = {
  visible: boolean("visible", true),
  closable: boolean("closable", true),
  maskClosable: boolean("maskClosable", true),
  onClose: action("onClose"),
};
