import React from "react";
import WardItem from "./WardItem";
import EmployeeItem from "./EmployeeItem";
import EquipmentItem from "./EquipmentItem";

export default function AdminManagementItem({
  type,
  item,
  wards,
  setWards,
  edit,
  nurses,
  setNurses,
  devices,
  setDevices,
}) {
  if (type === "ward") {
    return (
      <WardItem
        item={item}
        edit={edit}
        wards={wards}
        setWards={setWards}
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
    return (
      <EquipmentItem
        item={item}
        edit={edit}
        setDevices={setDevices}
        devices={devices}
      />
    );
  }
}
