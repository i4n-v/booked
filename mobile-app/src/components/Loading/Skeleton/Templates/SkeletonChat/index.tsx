import React from "react";
import { BadgeBone, CenterContainer, ProfileBone, SkeletonContainer, TextBone } from "./style";
import { View } from "react-native";

export default function SkeletonChat() {
  const randomSize = () => Math.floor(Math.random() * (100 - 50 + 1)) + 50;
  return (
    <SkeletonContainer>
      <ProfileBone />
      <CenterContainer>
        <View style={{flexDirection: "row"}}>
          <TextBone size={randomSize()} />
          <TextBone size={randomSize()} />
        </View>
        <View style={{flexDirection: "row",paddingRight: 5}}>
          <TextBone size={randomSize()} />
          <TextBone size={randomSize()} />
          <TextBone size={randomSize()} />
          <TextBone size={randomSize()} />
        </View>
      </CenterContainer>
      <View style={{rowGap:5, justifyContent:"center"}}>
        <TextBone size={26} />
        <BadgeBone />
      </View>
    </SkeletonContainer>
  );
}
