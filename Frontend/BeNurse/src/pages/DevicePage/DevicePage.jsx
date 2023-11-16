import React, {
  useRef,
  useState,
  useLayoutEffect,
  Suspense,
  useEffect,
} from "react";
import { customAxios } from "../../libs/axios";

import DeviceItem from "../../components/templates/DeviceItem/DeviceItem";
import RecentUsageList from "../../components/templates/DeviceItem/RecentUsageList";
import RecentUsageHeader from "../../components/templates/DeviceItem/RecentUsageHeader";
import DeviceRendering from "../../components/templates/DeviceItem/DeviceRendering";

// three.js
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { gsap } from "gsap/gsap-core";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { BottomSheet } from "react-spring-bottom-sheet";

// emotion
import Container from "../../components/atoms/Container/Container";
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input";
import Box from "../../components/atoms/Box/Box";
import { StyledImg1, StyledImg2 } from "./DevicePage.styles";

// icons
import deviceListIcon from "@assets/Icons/deviceList.svg";
import mapIcon from "@assets/Icons/map.svg";
import nfcImg from "@assets/Images/NFC.png";

// zustand
import { useDeviceStore } from "../../store/store";
import { useTabBarStore } from "../../store/store";

// Images
import cloud from "@assets/Images/cloud.png";

export default function DevicePage() {
  const [devices, setDevices] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceHistory, setDeviceHistory] = useState(null);
  const [historyKeys, setHistoryKeys] = useState(null);
  const [beacon, setBeacon] = useState(null);
  const [position, setPosition] = useState();
  const { isListActivated, ActivateList, DeactivateList } = useDeviceStore(
    (state) => state,
  );
  const { currentTab, setCurrentTab } = useTabBarStore((state) => state);
  const [searchTerm, setSearchTerm] = useState("");

  function updateSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  const locationData = {
    소회의실: {
      camera: {
        x: 4,
        y: 3,
        z: 4,
        duration: 1,
        ease: "ease-in-out",
      },
      beacon: [5, 30, 0],
    },
    로비: {
      camera: {
        x: 3,
        y: 0,
        z: 2,
        duration: 1,
        ease: "ease-in-out",
      },
      beacon: [-20, -14, 14],
    },
    201: {
      camera: {
        x: 4,
        y: 0,
        z: 4,
        duration: 1,
        ease: "ease-in-out",
      },
      beacon: [5, 10, 0],
    },
    202: {
      camera: {
        x: 10,
        y: 0,
        z: 4,
        duration: 1,
        ease: "ease-in-out",
      },
      beacon: [30, 10, -16],
    },
  };

  function activateNFC() {
    const accessToken = localStorage.getItem("accessToken");
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(accessToken);
    }
  }

  //three.js models
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
        roughness={1}
      />
    );
  }
  function HospitalOutsideGLTF({ scale, position, rotation }) {
    const { scene } = useThree();
    const [model, setModel] = useState();

    useEffect(() => {
      const loader = new FBXLoader();
      loader.load("src/assets/GLTFModels/ssafy_hospital.fbx", (fbx) => {
        fbx.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        fbx.scale.set(...scale);
        fbx.position.set(...position);
        fbx.rotation.set(...rotation);
        setModel(fbx);
      });
    }, [scale, position, rotation]);

    useEffect(() => {
      if (model) {
        scene.add(model);
      }

      return () => {
        if (model) {
          scene.remove(model);
        }
      };
    }, [model, scene]);

    return null;
  }

  function BeaconGLTF(props) {
    const { nodes, materials } = useGLTF("src/assets/GLTFModels/Beacon.glb");
    const beaconRef = useRef();
    const beaconMaterial = new THREE.MeshStandardMaterial({
      color: "#C13232",
      transparent: true,
      roughness: 4,
      opacity: selectedDevice ? 1 : 0,
      flatShading: true,
    });

    useFrame((state, delta) => {
      beaconRef.current.rotation.z += 0.04;
    });

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
  function selectDeviceItem(device) {
    if (selectedDevice && selectedDevice.id === device.id) {
      setSelectedDevice(null);
    } else {
      setSelectedDevice(device);
    }
    DeactivateList();
  }

  const CameraMove = () => {
    const { camera } = useThree();

    useLayoutEffect(() => {
      if (selectedDevice) {
        beacon &&
          gsap.to(camera.position, locationData[beacon.location].camera);
      }
      // camera={{ position: [0, -100, 120] }}
    }, [position, selectedDevice]);
  };

  useEffect(() => {
    if (selectedDevice) {
      customAxios
        .get("device-history/all?DeviceID=" + selectedDevice.id)
        .then((res) => {
          const lastHistory = res.data.responseData[0];

          const history = res.data.responseData;
          const newHistory = {};
          history.map((item) => {
            const itemTime = item.time.slice(0, 10);
            if (newHistory[itemTime]) {
              newHistory[itemTime].push(item);
            } else {
              newHistory[itemTime] = [item];
            }
          });
          setHistoryKeys(Object.keys(newHistory));
          setDeviceHistory(newHistory);
          customAxios.get("beacon?ID=" + lastHistory.beaconID).then((res) => {
            setBeacon(res.data.responseData);
          });
        });
    }
  }, [selectedDevice]);

  useEffect(() => {
    customAxios.get("device/all").then((res) => {
      setDevices(res.data.responseData);
    });
    setCurrentTab("device");
  }, []);

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
              setSelectedDevice(null);
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
            value={searchTerm}
            onChange={updateSearchTerm}
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
            {devices
              ?.filter((device) => device.name.includes(searchTerm))
              .map((device, index) => {
                return (
                  <DeviceItem
                    key={index}
                    listItem={true}
                    item={device}
                    onClick={() => {
                      selectDeviceItem(device);
                    }}
                  />
                );
              })}
          </div>
        </div>
      </Container>
    );
  } else {
    return (
      <Container props={"background-color: #adcff8;"}>
        {!selectedDevice && (
          <>
            <StyledImg1
              src={cloud}
              alt=""
            />
            <StyledImg2
              src={cloud}
              alt=""
            />
          </>
        )}
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
        {!selectedDevice && (
          <>
            <DeviceRendering />
            <Box
              type={"white"}
              size={["70px", "70px"]}
              props={
                "position: absolute; right: 30px; bottom: 90px; z-index: 100; border-radius: 40px; flex-direction: column;"
              }
              onClick={activateNFC}
            >
              <img
                style={{ width: "36px" }}
                src={nfcImg}
                alt=""
              />
            </Box>
          </>
        )}

        <Canvas
          style={{
            marginTop: "74px",
            width: "412px",
            height: "736px",
            backgroundColor: "#0xffffff",
          }}
          roughness={1}
          gl={{ toneMapping: THREE.CineonToneMapping }}
          camera={{
            position: selectedDevice ? [70, -80, 30] : [1, -180, 100],
            fo: 90,
          }}
        >
          <Suspense>
            <fog
              attach="fog"
              args={["white", 0, 550]}
            />
            <ambientLight
              intensity={1}
              castShadow={true}
            />
            <directionalLight
              color="white"
              castShadow={true}
              intensity={3}
              position={[-10, 150, 40]}
            />
            <directionalLight
              color="white"
              castShadow={true}
              intensity={2}
              position={[100, 150, 30]}
            />
            <directionalLight
              color="white"
              castShadow={true}
              intensity={15}
              position={[1000, -30, 30]}
            />
            <HospitalGLTF
              scale={0.44}
              position={[10, 20, 10]}
              rotation={[Math.PI / 2, Math.PI, (Math.PI / 6) * 7]}
            />
            <BeaconGLTF
              scale={0.4}
              position={beacon && locationData[beacon.location].beacon}
              rotation={[-Math.PI / 2, 0, 0]}
            />
            <>
              <HospitalGLTF
                scale={0.44}
                position={[10, 0, 10]}
                rotation={[Math.PI / 2, Math.PI, (Math.PI / 6) * 7]}
              />
              <HospitalGLTF
                scale={0.44}
                position={[10, -20, 10]}
                rotation={[Math.PI / 2, Math.PI, (Math.PI / 6) * 7]}
              />
            </>
            {!selectedDevice && (
              <HospitalOutsideGLTF
                scale={[4, 4, 4]}
                roughness={1}
                position={[0, -30, 16]}
                rotation={[0, (Math.PI / 6) * 7, 0]}
              />
            )}
            <CameraMove />
            <OrbitControls
              rotateSpeed={0.4}
              minDistance={100}
              maxDistance={230}
              minAzimuthAngle={Math.PI / 20}
              maxAzimuthAngle={Math.PI / 0}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 2.1}
            />
          </Suspense>
        </Canvas>
        <BottomSheet
          open={selectedDevice}
          blocking={false}
          onDismiss={() => {
            setSelectedDevice(null);
          }}
          defaultSnap={({ maxHeight }) => maxHeight / 4}
          snapPoints={({ maxHeight }) => [maxHeight / 4, maxHeight * 0.64]}
        >
          <DeviceItem
            item={selectedDevice && selectedDevice}
            beacon={beacon && beacon}
          />
          <hr style={{ margin: "0px 20px", border: "0.5px solid #D9D9D9" }} />
          <RecentUsageHeader />
          <RecentUsageList
            historyKeys={historyKeys}
            usage={deviceHistory}
          />
        </BottomSheet>
      </Container>
    );
  }
}
