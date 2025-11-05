import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Bounds } from "@react-three/drei";
import * as THREE from "three";

interface ModelViewerProps {
  src: string;
  className?: string;

  // Mouse/Touch Interactions
  allowZoom?: boolean;
  allowPan?: boolean;
  allowRotate?: boolean;
  lockVerticalRotation?: boolean;

  // Animation Controls
  playAnimation?: boolean;
  playOnScroll?: boolean;
  reverseOnScrollUp?: boolean;

  // Lazy-load placeholder
  placeholder?: string;
}

const Model: React.FC<{
  src: string;
  playAnimation?: boolean;
  scrollTime?: number;
  onLoaded?: () => void;
}> = ({ src, playAnimation, scrollTime = 0, onLoaded }) => {
  const gltf = useGLTF(src);
  const mixer = useRef<THREE.AnimationMixer>();

  useEffect(() => {
    if (gltf.scene && onLoaded) onLoaded();
  }, [gltf, onLoaded]);

  useEffect(() => {
    if (gltf.animations.length > 0 && playAnimation) {
      mixer.current = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => mixer.current!.clipAction(clip).play());
    }
  }, [gltf, playAnimation]);

  // Center model initially
  const bbox = new THREE.Box3().setFromObject(gltf.scene);
  const center = new THREE.Vector3();
  bbox.getCenter(center);
  gltf.scene.position.sub(center);

  // Frame update for animations
  useFrame((_, delta) => {
    if (mixer.current) {
      if (scrollTime > 0) mixer.current.setTime(scrollTime);
      else if (playAnimation) mixer.current.update(delta);
    }
  });

  // Wrap in a group to keep the model always centered
  return <group><primitive object={gltf.scene} dispose={null} /></group>;
};

const ModelViewer: React.FC<ModelViewerProps> = ({
  src,
  className = "",
  allowZoom = true,
  allowPan = true,
  allowRotate = true,
  lockVerticalRotation = false,
  playAnimation = false,
  playOnScroll = false,
  reverseOnScrollUp = false,
  placeholder,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [scrollTime, setScrollTime] = useState(0);
  const lastScrollY = useRef<number>(0);

  // Scroll-driven animation
  useEffect(() => {
    if (!playOnScroll) return;

    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;
      setScrollTime((prev) => prev + delta * 0.005 * (reverseOnScrollUp && delta < 0 ? -1 : 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [playOnScroll, reverseOnScrollUp]);

  // Orbit controls
  const Controls: React.FC = () => {
    const controls = useRef<any>(null);

    useEffect(() => {
      if (!controls.current) return;
      if (lockVerticalRotation) {
        controls.current.minPolarAngle = Math.PI / 2 - 0.001;
        controls.current.maxPolarAngle = Math.PI / 2 + 0.001;
      } else {
        controls.current.minPolarAngle = 0;
        controls.current.maxPolarAngle = Math.PI;
      }
      controls.current.update();
    }, [lockVerticalRotation]);

    return (
      <OrbitControls
        ref={controls}
        enableZoom={allowZoom}
        enablePan={allowPan}
        enableRotate={allowRotate}
      />
    );
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {!loaded && placeholder && (
        <img
          src={placeholder}
          alt="Loading 3D model"
          className="absolute top-0 left-0 w-full h-full object-contain animate-pulse"
        />
      )}

      <Canvas
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} />

        {/* Automatically center and fit model */}
        <Bounds fit observe margin={1.2}>
          <Model src={src} playAnimation={playAnimation} scrollTime={scrollTime} onLoaded={() => setLoaded(true)} />
        </Bounds>

        <Controls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;