import styled from "styled-components/native";
import SkeletonBones from "../../SkeletonBones";

const SkeletonContainer = styled.View`
    background-color: white;
    height: 87.7px;
    padding: 20px;
    column-gap: 5px;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondary?.[0]};
    ${({ theme }) => theme.shadows[0] as any}
`;

const ProfileBone = styled(SkeletonBones)`
    width: 32px;
    height: 32px;
    border-radius: 30px;
    background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

const CenterContainer = styled.View`
    flex: 1;
    gap: 5px;
    padding: 0px 10px;
    overflow: hidden;
`;

const BadgeBone = styled(SkeletonBones)`
    height: 26px;
    width: 26px;
    background-color: ${({ theme }) => theme.colors.secondary?.[200]};
    border-radius: 30px;
`;
const TextBone = styled(SkeletonBones)`
    height: 16px;
    background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

export { SkeletonContainer, ProfileBone, TextBone, CenterContainer,BadgeBone };
