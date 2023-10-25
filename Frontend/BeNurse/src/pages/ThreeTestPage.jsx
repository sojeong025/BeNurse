import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, FlyControls } from "@react-three/drei";

function GroundGLTF(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF("/GLTFModels/Ground.glb");
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
  const { nodes, materials } = useGLTF("/GLTFModels/Hospital.glb");
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
  const beaconRef = useRef();
  const { nodes, materials } = useGLTF("/GLTFModels/Beacon.glb");

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
      material={nodes.Mesh_Mesh_head_geo001_lambert2SG001.material}
    />
  );
}

export default function ThreeTestPage() {
  return (
    <div style={{ position: "relative" }}>
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
        <button
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            border: "none",
            marginRight: "10px",
            color: "#fff",
            backgroundColor: "#9669F9",
          }}
        >
          버튼
        </button>
        <input
          style={{
            color: "#555",
            padding: "10px 20px",
            width: "278px",
            height: "30px",
            borderRadius: "10px",
            border: "none",
            outline: "none",
          }}
          placeholder="장비 이름으로 검색"
          type="text"
        />
      </div>
      <span
        style={{
          position: "absolute",
          zIndex: 100,
          top: 100,
          left: 26,
          fontSize: 24,
          fontWeight: 800,
          color: "#555",
        }}
      >
        2F
      </span>
      <Canvas
        style={{ width: "412px", height: "700px", backgroundColor: "#E7E6F5" }}
        camera={{ position: [1, -130, 70] }}
        // camera={{ position: [1, -80, 90] }}
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
          <BeaconGLTF
            scale={0.4}
            position={[-3, 2, 50]}
          />
          <GroundGLTF
            scale={2.4}
            position={[0, 0, -40]}
            rotation={[0, 0, 0.5]}
          />
          {/* <gridHelper scale={10} /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}
