import React from "react";
import {
  TitleBone,
  InfoWrapper,
  SkeletonContainer,
  DescriptionBone,
  ProfileBone,
  DescriptionWrapper,
} from "./style";
import { ViewProps } from "react-native";

export function SkeletonFlexibleCard(props: ViewProps) {
  return (
    <SkeletonContainer {...props}>
      <InfoWrapper>
        <TitleBone />
        <DescriptionWrapper>
          {[1, 2, 3].map((value) => (
            <DescriptionBone key={`${value}-skeleton-bones`} />
          ))}
        </DescriptionWrapper>
      </InfoWrapper>
      <ProfileBone size={80} />
    </SkeletonContainer>
  );
}
