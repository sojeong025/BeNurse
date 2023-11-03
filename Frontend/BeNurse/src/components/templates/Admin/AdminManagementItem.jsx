import React from "react";
import WardItem from "./WardItem";
import EmployeeItem from "./EmployeeItem";
import EquipmentItem from "./EquipmentItem";

export default function AdminManagementItem({ type }) {
  if (type === "ward") {
    return <WardItem name="소아기 내과" />;
  } else if (type === "employee") {
    return <EmployeeItem />;
  } else {
    return <EquipmentItem />;
  }
}
