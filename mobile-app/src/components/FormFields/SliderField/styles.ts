import styled from "styled-components/native";

const SliderContainer = styled.View`
  row-gap: 10px;
  padding: 0 8px;
`;

const SlideTrack = styled.View`
  position: relative;
  height: 8px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.secondary?.[200]};
`;

const FillTrack = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  height: 8px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.primary?.[200]};
`;

const SliderLabel = styled.TextInput`
  position: absolute;
  top: -46px;
  min-width: 38px;
  border-radius: 8px;
  padding: 1px 8px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.secondary?.[0]};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.secondary?.[300]};
  box-shadow: ${({ theme }) => theme.shadows[2].web};
  font-family: ${({ theme }) => theme.typography.fonts.primary.semibold};
  font-size: ${({ theme }) => theme.typography.size.caption + "px"};
  color: ${({ theme }) => theme.colors.text?.[700]};
`;

const Slide = styled.View`
  position: absolute;
  top: -6px;
  width: 20px;
  height: 20px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.primary?.[200]};
`;

export { SliderContainer, SlideTrack, FillTrack, SliderLabel, Slide };
