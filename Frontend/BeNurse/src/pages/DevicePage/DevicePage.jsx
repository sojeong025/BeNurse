import React, {
  useRef,
  useState,
  useLayoutEffect,
  Suspense,
  useEffect,
} from "react";
import { Common } from "../../utils/global.styles";
import DeviceItem from "../../components/templates/DeviceItem/DeviceItem";

// three.js
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap/gsap-core";
import { BottomSheet } from "react-spring-bottom-sheet";

// emotion
import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import Box from "../../components/atoms/Box/Box";

// icons
import deviceListIcon from "@assets/Icons/deviceList.svg";
import mapIcon from "@assets/Icons/map.svg";
import { MdHistory } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

// zustand
import { useDeviceStore } from "../../store/store";

// Images
import temp from "@assets/Images/temp.png";

export default function DevicePage() {
  const [target, setTarget] = useState(false);
  const [position, setPosition] = useState();
  const { isListActivated, ActivateList, DeactivateList } = useDeviceStore(
    (state) => state,
  );

  //three.js models
  function GroundGLTF(props) {
    const groupRef = useRef();
    const { nodes, materials } = useGLTF("src/assets/GLTFModels/Ground.glb");
    return (
      <mesh
        {...props}
        castShadow
        receiveShadow
        geometry={nodes.Mesh_Mesh_head_geo001_lambert2SG001.geometry}
        material={nodes.Mesh_Mesh_head_geo001_lambert2SG001.material}
      />
    );
  }
  function HospitalGLTF(props) {
    const groupRef = useRef();
    const { nodes, materials } = useGLTF("src/assets/GLTFModels/Hospital.glb");
    return (
      <mesh
        {...props}
        castShadow
        receiveShadow
        geometry={nodes.Mesh_Mesh_head_geo001_lambert2SG001.geometry}
        material={nodes.Mesh_Mesh_head_geo001_lambert2SG001.material}
      />
    );
  }
  function HospitalOutsideGLTF(props) {
    const groupRef = useRef();
    const { nodes, materials } = useGLTF(
      "src/assets/GLTFModels/HospitalOutside.glb",
    );
    return (
      <mesh
        {...props}
        castShadow
        receiveShadow
        geometry={nodes.Mesh_Mesh_head_geo001_lambert2SG001.geometry}
        material={nodes.Mesh_Mesh_head_geo001_lambert2SG001.material}
      />
    );
  }
  function BeaconGLTF(props) {
    const { nodes, materials } = useGLTF("src/assets/GLTFModels/Beacon.glb");
    const beaconRef = useRef();
    const beaconMaterial = new THREE.MeshStandardMaterial({
      color: "#C13232",
      transparent: true,
      roughness: 1,
      opacity: target ? 1 : 0,
      flatShading: true,
    });

    useFrame((state, delta) => {
      beaconRef.current.rotation.z += 0.04;
    });

    useLayoutEffect(() => {
      if (target) {
        gsap.to;
      }
    }, []);

    return (
      <mesh
        {...props}
        ref={beaconRef}
        castShadow
        receiveShadow
        geometry={nodes.Mesh_Mesh_head_geo001_lambert2SG001.geometry}
        material={beaconMaterial}
      />
    );
  }

  // camera
  function selectDeviceItem() {
    console.log(1);
    setTarget(!target);
    DeactivateList();
  }

  const CameraMove = () => {
    const { camera } = useThree();

    useLayoutEffect(() => {
      if (target) {
        gsap.to(camera.position, {
          x: 0,
          y: -60,
          z: 80,
          duration: 0.8,
          ease: "ease-in-out",
        });
      } else {
        gsap.to(camera.position, {
          x: 1,
          y: -180,
          z: 100,
          duration: 0.8,
          ease: "ease-in-out",
        });
      }
      // camera={{ position: [0, -100, 120] }}
    }, [position, target]);
  };

  if (isListActivated) {
    return (
      <Container backgroundColor={"purple"}>
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            display: "flex",
            width: "412px",
            height: "100px",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "74px",
          }}
        >
          <Button
            style={{ margin: "0px 10px 0px 0px" }}
            variant="primary"
            width="50px"
            radius="10px"
            onClick={() => {
              setTarget(false);
              DeactivateList();
            }}
          >
            <img
              style={{ width: "24px" }}
              src={mapIcon}
              alt=""
            />
          </Button>
          <Input
            onFocus={ActivateList}
            variant="search"
            placeholder="장비 이름으로 검색"
            width="298px"
            type="text"
          />
        </div>
        <div
          style={{
            marginTop: "74px",
            width: "412px",
            height: "576px",
            padding: "100px 0px 60px 0px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "scroll",
            transition: "ease-in-out",
          }}
        >
          <div>
            <div onClick={selectDeviceItem}>
              <DeviceItem />
            </div>
            <DeviceItem onClick={selectDeviceItem} />
            <DeviceItem onClick={selectDeviceItem} />
            <DeviceItem onClick={selectDeviceItem} />
            <DeviceItem onClick={selectDeviceItem} />
            <DeviceItem onClick={selectDeviceItem} />
            <DeviceItem onClick={selectDeviceItem} />
            <DeviceItem onClick={selectDeviceItem} />
            <DeviceItem onClick={selectDeviceItem} />
            <DeviceItem onClick={selectDeviceItem} />
            <DeviceItem onClick={selectDeviceItem} />
            <DeviceItem onClick={selectDeviceItem} />
          </div>
        </div>
      </Container>
    );
  } else {
    return (
      <Container backgroundColor={"purple"}>
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "412px",
            height: "100px",
            marginTop: "74px",
          }}
        >
          <Button
            style={{ margin: "0px 10px 0px 0px" }}
            variant="primary"
            width="50px"
            radius="10px"
            onClick={ActivateList}
          >
            <img
              style={{ width: "24px" }}
              src={deviceListIcon}
              alt=""
            />
          </Button>
          <Input
            onFocus={ActivateList}
            variant="search"
            placeholder="장비 이름으로 검색"
            width="298px"
            type="text"
          />
        </div>
        <Canvas
          style={{
            marginTop: "74px",
            width: "412px",
            height: "736px",
            backgroundColor: "#E7E6F5",
          }}
          camera={{ position: [1, -180, 100] }}
          // camera={{ position: [0, -100, 120] }}
          flat={true}
        >
          <Suspense>
            <ambientLight intensity={2} />
            <directionalLight
              color="white"
              intensity={1}
              position={[-10, -30, 30]}
            />
            <directionalLight
              color="white"
              intensity={2}
              position={[100, -100, 30]}
            />
            <directionalLight
              color="white"
              intensity={1}
              position={[1000, -30, 30]}
            />
            <HospitalGLTF
              scale={0.52}
              position={[3, 0, 34]}
              rotation={[0, 0, 0.5]}
            />
            <BeaconGLTF
              scale={0.4}
              position={[-3, 2, 50]}
            />
            <>
              <HospitalGLTF
                scale={0.53}
                position={[3, 0, 7]}
                rotation={[0, 0, 0.5]}
              />
              <HospitalGLTF
                scale={0.54}
                position={[3, 0, -24]}
                rotation={[0, 0, 0.5]}
              />
            </>
            {!target && (
              <HospitalOutsideGLTF
                scale={1}
                position={[10, -20, -12]}
                rotation={[0, 0, 0.5]}
              />
            )}
            <GroundGLTF
              scale={2.4}
              position={[0, 0, -40]}
              rotation={[0, 0, 0.5]}
              flatShading={true}
            />
            <CameraMove />
          </Suspense>
        </Canvas>
        <BottomSheet
          open={target}
          blocking={false}
          onDismiss={() => {
            setTarget(false);
          }}
          defaultSnap={({ maxHeight }) => maxHeight / 4}
          snapPoints={({ maxHeight }) => [maxHeight / 4, maxHeight * 0.64]}
        >
          <Box
            type={"transparent"}
            padding={"20px"}
            size={["372px", "82px"]}
            font={"16px"}
            flex={["flex-start", "center"]}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "334px",
                height: "82px",
              }}
            >
              <img
                style={{
                  height: "82px",
                  border: `1px solid ${Common.color.purple01}`,
                  borderRadius: "10px",
                }}
                src={temp}
                alt=""
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "14px",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: Common.fontSize.fontXS,
                    fontWeight: Common.fontWeight.bold,
                    width: "50px",
                    height: "22px",
                    borderRadius: "30px",
                    backgroundColor: "rgba(255, 229, 229, 1)",
                    color: "#D96363",
                  }}
                >
                  사용중
                </div>
                <p
                  style={{
                    fontSize: Common.fontSize.fontM,
                    fontWeight: Common.fontWeight.extrabold,
                  }}
                >
                  INFUSION PUMP
                </p>
                <p style={{ fontSize: Common.fontSize.fontXS }}>
                  <span
                    style={{
                      fontWeight: Common.fontWeight.bold,
                    }}
                  >
                    자산 코드{" "}
                  </span>
                  ED1390FA2
                </p>
                <p style={{ fontSize: Common.fontSize.fontXS }}>
                  <span
                    style={{
                      fontWeight: Common.fontWeight.bold,
                    }}
                  >
                    현재위치{" "}
                  </span>
                  내과 A동 A101호
                </p>
              </div>
            </div>
          </Box>
          <hr style={{ margin: "0px" }} />
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MdHistory size={20} />
              장비 사용 이력
            </div>
          </div>
        </BottomSheet>
      </Container>
    );
  }
}
