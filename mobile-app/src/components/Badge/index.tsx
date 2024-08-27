import React from "react";
import styled from "styled-components/native";

const BadgeContainer = styled.View`
  background-color: #9b59b6; 
  border-radius: 15px; 
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

const BadgeText = styled.Text`
  color: white;
  font-size: ${({ theme }) => theme.typography.size.xxs};
  font-weight: bold;
`;

const Badge = ({ number }: { number: number }) => {
  if (!number) return null;
  return (
    <BadgeContainer>
      <BadgeText>{number > 99 ? "99" : number}</BadgeText>
    </BadgeContainer>
  );
};

export default Badge;
