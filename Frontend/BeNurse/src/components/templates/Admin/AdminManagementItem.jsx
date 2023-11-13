import React from "react";
import WardItem from "./WardItem";
import EmployeeItem from "./EmployeeItem";
import EquipmentItem from "./EquipmentItem";

export default function AdminManagementItem({
  type,
  item,
  wards,
  edit,
  nurses,
  setNurses,
}) {
  if (type === "ward") {
    return (
      <WardItem
        item={item}
        edit={edit}
      />
    );
  } else if (type === "employee") {
    return (
      <EmployeeItem
        item={item}
        edit={edit}
        wards={wards}
        setNurses={setNurses}
        nurses={nurses}
      />
    );
  } else {
    return <EquipmentItem item={item} />;
  }
}
