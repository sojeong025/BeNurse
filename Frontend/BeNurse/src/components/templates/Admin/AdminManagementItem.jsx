import React from "react";
import WardItem from "./WardItem";
import EmployeeItem from "./EmployeeItem";
import EquipmentItem from "./EquipmentItem";

export default function AdminManagementItem({ type, item }) {
  if (type === "ward") {
    return <WardItem item={item} />;
  } else if (type === "employee") {
    return <EmployeeItem item={item} />;
  } else {
    return <EquipmentItem item={item} />;
  }
}
