import React, { useState, useEffect } from "react";
import patient_default from "@assets/Images/patient_default.png";

export default function PatientImages({
  gender,
  age,
  imgNum,
  style,
  className,
}) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleImageLoad = () => {
    setIsCompleted(true);
  };
  const [src, setSrc] = useState("");
  const women = [
    [
      "https://i.ibb.co/LtjynJf/1.png",
      "https://i.ibb.co/Wf5HZsH/2.png",
      "https://i.ibb.co/WGRC52Y/3.png",
      "https://i.ibb.co/PjCPXx5/4.png",
      "https://i.ibb.co/99HwSxy/5.png",
    ],

    [
      "https://i.ibb.co/QnxVsNW/11.png",
      "https://i.ibb.co/y5FHP7J/12.png",
      "https://i.ibb.co/N752RjJ/13.png",
      "https://i.ibb.co/GvXhJ1G/14.png",
      "https://i.ibb.co/gwyDV5L/15.png",
    ],

    [
      "https://i.ibb.co/94z3cxP/21.png",
      "https://i.ibb.co/6rTfbMK/22.png",
      "https://i.ibb.co/6RWNXd2/23.png",
      "https://i.ibb.co/K6JyXTy/24.png",
      "https://i.ibb.co/98Lxgfn/25.png",
    ],
  ];

  const men = [
    [
      "https://i.ibb.co/PQDRDCT/6.png",
      "https://i.ibb.co/qBcm9kL/7.png",
      "https://i.ibb.co/NxHgrGf/8.png",
      "https://i.ibb.co/RC4V7CP/9.png",
      "https://i.ibb.co/8mZ84x6/10.png",
    ],
    [
      "https://i.ibb.co/TYCX0zx/16.png",
      "https://i.ibb.co/7yLzNms/17.png",
      "https://i.ibb.co/jbGqXdg/18.png",
      "https://i.ibb.co/GthWRPw/19.png",
      "https://i.ibb.co/9356Y0G/20.png",
    ],
    [
      "https://i.ibb.co/yBxYnHd/26.png",
      "https://i.ibb.co/gT5gMhL/27.png",
      "https://i.ibb.co/60m27m4/28.png",
      "https://i.ibb.co/VmMggWG/29.png",
      "https://i.ibb.co/Yb8m41v/30.png",
    ],
  ];

  useEffect(() => {
    if (gender === "남") {
      if (age < 14) {
        setSrc(men[0][imgNum]);
      } else if (age < 46) {
        setSrc(men[1][imgNum]);
      } else {
        setSrc(men[2][imgNum]);
      }
    } else {
      if (age < 14) {
        setSrc(women[0][imgNum]);
      } else if (age < 46) {
        setSrc(women[1][imgNum]);
      } else {
        setSrc(women[2][imgNum]);
      }
    }
  }, [gender, age, imgNum]);

  return (
    <>
      {!isCompleted && (
        <img
          width="60px"
          height="60px"
          className={className}
          style={style}
          src={patient_default}
        />
      )}

      <img
        width="60px"
        height="60px"
        className={className}
        src={src}
        style={{ ...style, display: isCompleted ? "block" : "none" }}
        alt=""
        onLoad={handleImageLoad}
      />
    </>
  );
}
