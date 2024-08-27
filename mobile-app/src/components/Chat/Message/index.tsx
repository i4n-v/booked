import { Account } from "@/components/Icons";
import styled from "./styled";
export default function Message({ mine,content }: MessageProps) {
  return (
    <styled.Container mine={mine}>
      {!mine && <Account />}
      <styled.Content mine={mine}>
        {content}
      </styled.Content>
    </styled.Container>
  );
}
