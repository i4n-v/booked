import React from "react";
import { ITipography } from "./types";
import { Container, Subtitle, TipographyContainer, Title } from "./styles";
import accessObjectByString from "@/utils/accessObjectByString";
import { format, parseISO } from "date-fns";

export default function TipographyList<T>({
  data,
  labels,
  containerStyles,
  numberColumns = 2,
}: ITipography<T>) {
  return (
    <Container style={containerStyles}>
      {labels.map((label, index) => {
        switch (label.type) {
          case "string":
            return (
              <TipographyContainer
                key={label.name}
                numberColumns={numberColumns}
                numberItems={labels.length}
                currentNumberItem={index}
              >
                <Title>{label.label}</Title>
                <Subtitle>
                  {label.format
                    ? label.format(
                        accessObjectByString(data as Record<string, any>, label.path),
                        data,
                      )
                    : accessObjectByString(data as Record<string, any>, label.path)}
                </Subtitle>
              </TipographyContainer>
            );
          case "number":
            return (
              <TipographyContainer
                key={label.name}
                numberColumns={numberColumns}
                numberItems={labels.length}
                currentNumberItem={index}
              >
                <Title>{label.label}</Title>
                <Subtitle>
                  {label.format
                    ? label.format(
                        accessObjectByString(data as Record<string, any>, label.path),
                        data,
                      )
                    : accessObjectByString(data as Record<string, any>, label.path)}
                </Subtitle>
              </TipographyContainer>
            );
          case "boolean":
            return (
              <TipographyContainer
                key={label.name}
                numberColumns={numberColumns}
                numberItems={labels.length}
                currentNumberItem={index}
              >
                <Title>{label.label}</Title>
                <Subtitle>
                  {label.format
                    ? label.format(
                        accessObjectByString(data as Record<string, any>, label.path),
                        data,
                      )
                    : accessObjectByString(data as Record<string, any>, label.path)
                      ? "Sim"
                      : "Não"}
                </Subtitle>
              </TipographyContainer>
            );
          case "date":
            return (
              <TipographyContainer
                key={label.name}
                numberColumns={numberColumns}
                numberItems={labels.length}
                currentNumberItem={index}
              >
                <Title>{label.label}</Title>
                <Subtitle>
                  {label.format
                    ? label.format(
                        accessObjectByString(data as Record<string, any>, label.path),
                        data,
                      )
                    : null}

                  {!label.format &&
                    (accessObjectByString(data as Record<string, any>, label.path) instanceof Date
                      ? format(
                          accessObjectByString(data as Record<string, any>, label.path),
                          "dd/MM/yyyy",
                        )
                      : format(
                          parseISO(accessObjectByString(data as Record<string, any>, label.path)),
                          "dd/MM/yyyy",
                        ))}
                </Subtitle>
              </TipographyContainer>
            );
          case "date-hour":
            return (
              <TipographyContainer
                key={label.name}
                numberColumns={numberColumns}
                numberItems={labels.length}
                currentNumberItem={index}
              >
                <Title>{label.label}</Title>
                <Subtitle>
                  {label.format
                    ? label.format(
                        accessObjectByString(data as Record<string, any>, label.path),
                        data,
                      )
                    : null}

                  {!label.format &&
                    (accessObjectByString(data as Record<string, any>, label.path) instanceof Date
                      ? format(
                          accessObjectByString(data as Record<string, any>, label.path),
                          "dd/MM/yyyy HH:mm",
                        )
                      : format(
                          parseISO(accessObjectByString(data as Record<string, any>, label.path)),
                          "dd/MM/yyyy HH:mm",
                        ))}
                </Subtitle>
              </TipographyContainer>
            );
          default:
            return null;
        }
      })}
    </Container>
  );
}
