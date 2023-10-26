import React, {
  useRef,
  useState,
  useLayoutEffect,
  Suspense,
  useEffect,
} from "react";

// three.js
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap/gsap-core";

// emotion
import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";

// icons
import deviceListIcon from "@assets/Icons/deviceList.svg";
import mapIcon from "@assets/Icons/map.svg";

// zustand
import { useDeviceStore } from "../../store/store";

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
  function cameraMove() {
    setTarget(!target);
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
          y: -130,
          z: 70,
          duration: 0.8,
          ease: "ease-in-out",
        });
      }
      // camera={{ position: [0, -100, 120] }}
    }, [position, target]);
  };

  // device list
  function activateDeviceList() {
    ActivateList();
  }

  if (isListActivated) {
    return (
      <Container backgroundColor={"purple"}>
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            width: "412px",
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{ margin: "0px 10px 0px 0px" }}
            variant="primary"
            width="50px"
            radius="10px"
            onClick={DeactivateList}
          >
            <img
              style={{ width: "24px" }}
              src={mapIcon}
              alt=""
            />
          </Button>
          <Input
            onFocus={activateDeviceList}
            variant="search"
            placeholder="장비 이름으로 검색"
            width="298px"
            type="text"
          />
        </div>
        <div
          style={{
            width: "412px",
            height: "736px",
            marginTop: "100px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{ width: "100px", height: "100px", border: "1px solid red" }}
          ></div>
          <div
            style={{ width: "100px", height: "100px", border: "1px solid red" }}
          ></div>
          <div
            style={{ width: "100px", height: "100px", border: "1px solid red" }}
          ></div>
          <div
            style={{ width: "100px", height: "100px", border: "1px solid red" }}
          ></div>
          <div
            style={{ width: "100px", height: "100px", border: "1px solid red" }}
          ></div>
          <div
            style={{ width: "100px", height: "100px", border: "1px solid red" }}
          ></div>
          <div
            style={{ width: "100px", height: "100px", border: "1px solid red" }}
          ></div>
          <div
            style={{ width: "100px", height: "100px", border: "1px solid red" }}
          ></div>
          <div
            style={{ width: "100px", height: "100px", border: "1px solid red" }}
          ></div>
          <div
            style={{ width: "100px", height: "100px", border: "1px solid red" }}
          ></div>
        </div>
      </Container>
    );
  } else {
    return (
      <Container backgroundColor={"purple"}>
        <div
          style={{
            width: "412px",
            height: "100px",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <Button
            style={{ margin: "0px 10px 0px 0px" }}
            variant="primary"
            width="50px"
            radius="10px"
            onClick={cameraMove}
          >
            <img
              style={{ width: "24px" }}
              src={deviceListIcon}
              alt=""
            />
          </Button>
          <Input
            onFocus={activateDeviceList}
            variant="search"
            placeholder="장비 이름으로 검색"
            width="298px"
            type="text"
          />
        </div>
        <Canvas
          style={{
            width: "412px",
            height: "736px",
            backgroundColor: "#E7E6F5",
          }}
          camera={{ position: [1, -130, 70] }}
          // camera={{ position: [0, -100, 120] }}
          flat={true}
        >
          <Suspense>
            <ambientLight intensity={2} />
            <directionalLight
              color="white"
              intensity={3}
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
            <GroundGLTF
              scale={2.4}
              position={[0, 0, -40]}
              rotation={[0, 0, 0.5]}
            />
            <CameraMove />
            {/* <gridHelper scale={10} /> */}
          </Suspense>
        </Canvas>
      </Container>
    );
  }
}
