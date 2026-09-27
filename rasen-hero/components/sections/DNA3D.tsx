"use client";

import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DNA3DProps {
  scrollProgress?: number;
}

interface DNAStrandProps {
  scrollProgress: number;
}

function SceneReady({
  onReady,
}: {
  onReady: () => void;
}) {
  useFrame(() => {
    onReady();
  });

  return null;
}

function DNALoader() {
  return (
    <div className="dna-loader">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <mask id="clipping">
            <polygon
              points="0,0 100,0 100,100 0,100"
              fill="black"
            />
            <polygon
              points="25,25 75,25 50,75"
              fill="white"
            />
            <polygon
              points="50,25 75,75 25,75"
              fill="white"
            />
            <polygon
              points="35,35 65,35 50,65"
              fill="white"
            />
            <polygon
              points="35,35 65,35 50,65"
              fill="white"
            />
            <polygon
              points="35,35 65,35 50,65"
              fill="white"
            />
            <polygon
              points="35,35 65,35 50,65"
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      <div className="dna-loader-box" />
    </div>
  );
}

function DNAStrand({ scrollProgress }: DNAStrandProps) {
  const groupRef = useRef<THREE.Group>(null);

  const targetTwist = useRef(0);
  const currentTwist = useRef(0);

  /*
   * Highlight position.
   */
  const targetHighlightY = useRef(0);
  const currentHighlightY = useRef(0);

  const count = 24;
  const radius = 0.8;
  const heightStep = 0.42;

  /*
   * Step positions corresponding to the
   * active Step labels in HowRasenWorks.tsx.
   */
  const stepPositions = [
    0.25,
    0.31,
    0.47,
    0.64,
    0.74,
  ];

  /*
   * DNA colors.
   *
   * The highlightColor is intentionally the EXACT
   * same color used by the active step glow:
   *
   * bg-[#d9f9e9]
   */
  const blackColor = useMemo(
    () => new THREE.Color("#000000"),
    []
  );

  const highlightColor = useMemo(
    () => new THREE.Color("#5afaaa"),
    []
  );

  /*
   * Used to smoothly introduce/remove the
   * emissive highlight.
   */
  const noEmissive = useMemo(
    () => new THREE.Color("#000000"),
    []
  );

  /*
   * Convert scroll progress into internal DNA twist.
   */
  targetTwist.current =
    scrollProgress * Math.PI * 4;

  /*
   * Pre-calculate the DNA structure.
   */
  const dna = useMemo(() => {
    return Array.from({ length: count }).map(
      (_, i) => {
        const y =
          (i - count / 2) * heightStep;

        const angle = i * 0.45;

        const x1 =
          Math.cos(angle) * radius;

        const z1 =
          Math.sin(angle) * radius;

        const x2 =
          Math.cos(angle + Math.PI) *
          radius;

        const z2 =
          Math.sin(angle + Math.PI) *
          radius;

        const nextAngle =
          (i + 1) * 0.45;

        const nextX1 =
          Math.cos(nextAngle) * radius;

        const nextZ1 =
          Math.sin(nextAngle) * radius;

        const nextX2 =
          Math.cos(
            nextAngle + Math.PI
          ) * radius;

        const nextZ2 =
          Math.sin(
            nextAngle + Math.PI
          ) * radius;

        /*
         * Backbone 1 direction.
         */
        const p1 = new THREE.Vector3(
          x1,
          0,
          z1
        );

        const p1Next =
          new THREE.Vector3(
            nextX1,
            heightStep,
            nextZ1
          );

        const dir1 =
          p1Next.clone().sub(p1);

        const len1 = dir1.length();

        const quaternion1 =
          new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            dir1.normalize()
          );

        /*
         * Backbone 2 direction.
         */
        const p2 = new THREE.Vector3(
          x2,
          0,
          z2
        );

        const p2Next =
          new THREE.Vector3(
            nextX2,
            heightStep,
            nextZ2
          );

        const dir2 =
          p2Next.clone().sub(p2);

        const len2 = dir2.length();

        const quaternion2 =
          new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            dir2.normalize()
          );

        return {
          y,
          angle,

          x1,
          z1,

          x2,
          z2,

          nextX1,
          nextZ1,

          nextX2,
          nextZ2,

          len1,
          len2,

          quaternion1,
          quaternion2,
        };
      }
    );
  }, []);

  /*
   * Set initial highlight position.
   */
  if (currentHighlightY.current === 0) {
    const topY =
      dna[count - 1].y;

    const bottomY =
      dna[0].y;

    const initialTarget =
      THREE.MathUtils.lerp(
        topY,
        bottomY,
        stepPositions[0]
      );

    currentHighlightY.current =
      initialTarget;

    targetHighlightY.current =
      initialTarget;
  }

  /*
   * Smooth animation + localized color highlight.
   */
  useFrame(() => {
    if (!groupRef.current) return;

    /*
     * --------------------------------------------------
     * SMOOTH INTERNAL DNA ROTATION
     * --------------------------------------------------
     */
    currentTwist.current =
      THREE.MathUtils.lerp(
        currentTwist.current,
        targetTwist.current,
        0.08
      );

    /*
     * --------------------------------------------------
     * STEP-BASED HIGHLIGHT
     * --------------------------------------------------
     */
    const topY =
      dna[count - 1].y;

    const bottomY =
      dna[0].y;

    /*
     * Determine active step.
     */
    const stepIndex = Math.min(
      Math.floor(
        scrollProgress *
        stepPositions.length
      ),
      stepPositions.length - 1
    );

    /*
     * Get target vertical position.
     */
    const targetY =
      THREE.MathUtils.lerp(
        topY,
        bottomY,
        stepPositions[stepIndex]
      );

    targetHighlightY.current =
      targetY;

    /*
     * Smoothly move the highlight.
     */
    currentHighlightY.current =
      THREE.MathUtils.lerp(
        currentHighlightY.current,
        targetHighlightY.current,
        0.12
      );

    const highlightY =
      currentHighlightY.current;

    /*
     * --------------------------------------------------
     * UPDATE DNA LEVELS
     * --------------------------------------------------
     */
    groupRef.current.children.forEach(
      (child, index) => {
        const level =
          child as THREE.Group;

        const data = dna[index];

        if (!data) return;

        /*
         * Keep existing internal DNA rotation.
         */
        level.rotation.y =
          currentTwist.current;

        level.position.y =
          data.y;

        /*
         * ------------------------------------------------
         * DISTANCE FROM ACTIVE HIGHLIGHT
         * ------------------------------------------------
         */
        const distance =
          Math.abs(
            data.y - highlightY
          );

        /*
         * ------------------------------------------------
         * SOFT HIGHLIGHT GRADIENT
         * ------------------------------------------------
         */
        const intensity =
          1 -
          THREE.MathUtils.smoothstep(
            distance,
            0.18,
            0.85
          );

        /*
         * Keep the existing smooth falloff.
         */
        const blueAmount =
          Math.pow(
            intensity,
            0.75
          );

        const gradientAmount =
          blueAmount;

        /*
         * ------------------------------------------------
         * APPLY COLOR + EMISSIVE HIGHLIGHT
         * ------------------------------------------------
         *
         * Normal DNA:
         * #000000
         *
         * Highlight DNA:
         * #d9f9e9
         *
         * The emissive component prevents the pale
         * green from becoming gray under the existing
         * Three.js lighting.
         */
        level.traverse(
          (object) => {
            if (
              !(object instanceof THREE.Mesh)
            ) {
              return;
            }

            const material =
              object.material as THREE.MeshStandardMaterial;

            if (!material?.color) {
              return;
            }

            /*
             * Existing smooth black → highlightColor
             * transition.
             */
            material.color.lerpColors(
              blackColor,
              highlightColor,
              gradientAmount
            );

            /*
             * Add the same highlight color as
             * emissive light so it visually stays
             * close to the CSS #d9f9e9 glow.
             */
            if (material.emissive) {
              material.emissive.lerpColors(
                noEmissive,
                highlightColor,
                gradientAmount
              );

              material.emissiveIntensity =
                gradientAmount * 0.65;
            }
          }
        );
      }
    );
  });

  return (
    <group
      ref={groupRef}
      rotation={[
        0,
        0,
        THREE.MathUtils.degToRad(22),
      ]}
    >
      {dna.map((data, i) => {
        return (
          <group
            key={i}
            position={[
              0,
              data.y,
              0,
            ]}
          >
            {/* ---------------------------------------- */}
            {/* Strand 1 Node */}
            {/* ---------------------------------------- */}
            <mesh
              position={[
                data.x1,
                0,
                data.z1,
              ]}
            >
              <sphereGeometry
                args={[
                  0.1,
                  16,
                  16,
                ]}
              />

              <meshStandardMaterial
                color="#000"
                roughness={0.15}
                metalness={0.3}
              />
            </mesh>

            {/* ---------------------------------------- */}
            {/* Strand 2 Node */}
            {/* ---------------------------------------- */}
            <mesh
              position={[
                data.x2,
                0,
                data.z2,
              ]}
            >
              <sphereGeometry
                args={[
                  0.1,
                  16,
                  16,
                ]}
              />

              <meshStandardMaterial
                color="#000"
                roughness={0.15}
                metalness={0.3}
              />
            </mesh>

            {/* ---------------------------------------- */}
            {/* Base Pair */}
            {/* ---------------------------------------- */}
            <group
              rotation={[
                0,
                -data.angle,
                0,
              ]}
            >
              <mesh
                position={[
                  -radius / 2,
                  0,
                  0,
                ]}
                rotation={[
                  0,
                  0,
                  Math.PI / 2,
                ]}
              >
                <cylinderGeometry
                  args={[
                    0.02,
                    0.02,
                    radius,
                    12,
                  ]}
                />

                <meshStandardMaterial
                  color="#000"
                  roughness={0.2}
                  metalness={0.5}
                  transparent
                  opacity={0.85}
                />
              </mesh>

              <mesh
                position={[
                  radius / 2,
                  0,
                  0,
                ]}
                rotation={[
                  0,
                  0,
                  Math.PI / 2,
                ]}
              >
                <cylinderGeometry
                  args={[
                    0.02,
                    0.02,
                    radius,
                    12,
                  ]}
                />

                <meshStandardMaterial
                  color="#000"
                  roughness={0.2}
                  metalness={0.5}
                  transparent
                  opacity={0.85}
                />
              </mesh>
            </group>

            {/* ---------------------------------------- */}
            {/* Backbone */}
            {/* ---------------------------------------- */}
            {i < count - 1 && (
              <>
                {/* Backbone 1 */}
                <mesh
                  position={[
                    (data.x1 +
                      data.nextX1) /
                    2,
                    heightStep / 2,
                    (data.z1 +
                      data.nextZ1) /
                    2,
                  ]}
                  quaternion={
                    data.quaternion1
                  }
                >
                  <cylinderGeometry
                    args={[
                      0.02,
                      0.02,
                      data.len1,
                      12,
                    ]}
                  />

                  <meshStandardMaterial
                    color="#000"
                    roughness={0.2}
                    metalness={0.3}
                  />
                </mesh>

                {/* Backbone 2 */}
                <mesh
                  position={[
                    (data.x2 +
                      data.nextX2) /
                    2,
                    heightStep / 2,
                    (data.z2 +
                      data.nextZ2) /
                    2,
                  ]}
                  quaternion={
                    data.quaternion2
                  }
                >
                  <cylinderGeometry
                    args={[
                      0.02,
                      0.02,
                      data.len2,
                      12,
                    ]}
                  />

                  <meshStandardMaterial
                    color="#000"
                    roughness={0.2}
                    metalness={0.3}
                  />
                </mesh>
              </>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function DNA3D({
  scrollProgress = 0,
}: DNA3DProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
        [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_88%,transparent_100%)]
        [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_12%,black_88%,transparent_100%)]
      "
    >
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white">
          <DNALoader />
        </div>
      )}

      <Canvas
        camera={{
          position: [0, 0, 9],
          fov: 45,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <ambientLight intensity={1.2} />

        <directionalLight
          position={[5, 10, 5]}
          intensity={2}
        />

        <pointLight
          position={[-5, -5, -5]}
          intensity={1}
          color="#07e88d"
        />

        <SceneReady
          onReady={() => setIsLoaded(true)}
        />

        <DNAStrand
          scrollProgress={scrollProgress}
        />
      </Canvas>
    </div>
  );
}