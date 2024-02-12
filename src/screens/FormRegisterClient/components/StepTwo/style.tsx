import styled from "styled-components"

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
`

export const LabelText = styled.label`
  font-size: 12px;
`

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})
