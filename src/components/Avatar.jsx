import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useEffect, useRef } from "react";
import test from "../test.json";
import * as THREE from "three";

export function Avatar(props) {
  const { animation } = props;
  const { headFollow, cursorFollow, wireframe } = useControls({
    headFollow: false,
    cursorFollow: false,
    wireframe: false,
  });
  const group = useRef();
  const { nodes, materials } = useGLTF("models/646d9dcdc8a5f5bddbfac913.glb");

  const { animations: typingAnimation } = useFBX("animations/Typing.fbx");
  const { animations: standingAnimation } = useFBX("animations/Standing Idle.fbx");
  const { animations: fallingAnimation } = useFBX("animations/Falling Idle.fbx");

  typingAnimation[0].name = "Typing";
  standingAnimation[0].name = "Standing";
  fallingAnimation[0].name = "Falling";

  // const { actions } = useAnimations(
  //   [typingAnimation[0], standingAnimation[0], fallingAnimation[0]],
  //   group
  // );

  useEffect(() => {
    if (group.current) {
      // Log all objects (for debugging)
      const logObjectNames = (object) => {
        console.log(object.name, "name******");
        object.children.forEach(child => logObjectNames(child));
      };
      logObjectNames(group.current);
    }
  }, [group.current]);

  useFrame(() => {
    if (test && group.current) {
      const bones = {
        nose: group.current.getObjectByName('Head'), // Adjust this if the name is different
        lefteye: group.current.getObjectByName('EyeLeft'),
        righteye: group.current.getObjectByName('EyeRight'),
        leftear: group.current.getObjectByName('LeftEar'), // Adjust name if needed
        rightear: group.current.getObjectByName('RightEar'), // Adjust name if needed
        leftshoulder: group.current.getObjectByName('LeftShoulder'),
        rightshoulder: group.current.getObjectByName('RightShoulder'),
        leftelbow: group.current.getObjectByName('LeftHand'),
        rightelbow: group.current.getObjectByName('RightHand'),
        // leftwrist: group.current.getObjectByName('LeftHand'),
        // rightwrist: group.current.getObjectByName('RightHand'),
        leftpinky: group.current.getObjectByName('LeftHandPinky1'), // Adjust name if needed
        rightpinky: group.current.getObjectByName('RightHandPinky1'), // Adjust name if needed
        leftindex: group.current.getObjectByName('LeftIndex'), // Adjust name if needed
        rightindex: group.current.getObjectByName('RightIndex'), // Adjust name if needed
        leftthumb: group.current.getObjectByName('LeftThumb'), // Adjust name if needed
        rightthumb: group.current.getObjectByName('RightThumb'), // Adjust name if needed
        // lefthip: group.current.getObjectByName('Spine'),
        // righthip: group.current.getObjectByName('Hips'),
        leftknee: group.current.getObjectByName('LeftUpLeg'),
        rightknee: group.current.getObjectByName('RightUpLeg'),
        leftankle: group.current.getObjectByName('LeftLeg'),
        rightankle: group.current.getObjectByName('RightUpLeg'),
        leftheel: group.current.getObjectByName('LeftToeBase'), // Adjust name if needed
        rightheel: group.current.getObjectByName('RightToeBase'), // Adjust name if needed
        leftfootindex: group.current.getObjectByName('LeftFoot'), // Adjust name if needed
        rightfootindex: group.current.getObjectByName('RightFoot') // Adjust name if needed
      };
  

      // Hide all bones initially
      Object.values(bones).forEach(bone => {
        if (bone) bone.visible = false;
      });

      // Map key points to bones and make them visible
      test.forEach(point => {
        const boneName = point.classLabel.toLowerCase().replace(/ /g, '');
        const bone = bones[boneName];
        if (bone) {
          bone.position.set(point.x / 1000, point.y / 1000, point.z );
          bone.visible = true; // Show bone if it exists in the data
        }
      });
    }
  });

  useEffect(() => {
    if (group.current) {
      // Recursive function to traverse and log all objects
      const logObjectNames = (object) => {
        console.log(object.name); // Log the name of the current object
        object.children.forEach(child => logObjectNames(child)); // Traverse children
      };
  
      logObjectNames(group.current);
    }
  }, [group.current]);

  // useEffect(() => {
  //   actions[animation].reset().fadeIn(0.5).play();
  //   return () => {
  //     actions[animation].reset().fadeOut(0.5);
  //   };
  // }, [animation]);

  useEffect(() => {
    Object.values(materials).forEach((material) => {
      material.wireframe = wireframe;
    });
  }, [wireframe]);

  return (
    <group {...props} ref={group} dispose={null}>
      <group>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload("models/646d9dcdc8a5f5bddbfac913.glb");
