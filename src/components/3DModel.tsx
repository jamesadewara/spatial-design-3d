import { useRef, useLayoutEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

function 3DModel(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("assets\3d\rubic.glb");
  const { actions } = useAnimations(animations, group);

  useLayoutEffect(() => {
    Object.values(actions).forEach(action => action.play());
  }, [actions]);

  return <group ref={group} {...props}>
    <primitive object={nodes.Scene} />
  </group>;
}
