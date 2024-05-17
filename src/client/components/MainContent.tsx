import { Form, Row, Col, Container } from "react-bootstrap";
import close from "../img/close.png"

export default function MainContent(props: {
  centerContent: string;
  handleCenterContent: (myContent: string) => void;
  transport: string;
}) {
  console.log(props.centerContent);
  return (
    <Form>
      {props.centerContent != "none" && (
        <Container id="centerBox">
          <Row className="invisiblePadding">..</Row>
          <Row className="hederboxmain justify-content-spacebetween">
            <Col xs={{ span: 5, offset: 3 }} className="titleMainContent">
              {props.centerContent}{" "}
            </Col>
            <Col xs={{ span: 2, offset: 2 }}>
              <label onClick={() => props.handleCenterContent("none")}>
                <img
                  className="x"
                  src={close}
                  alt="close"
                />
              </label>
            </Col>
          </Row>
          <Row className="justify-content-center" id="footerCenterBox">
            <Col
              className={
                props.transport == "walking" ? "activeInfo" : "passiveInfo"
              }
            >
              2h55m
            </Col>
            <Col
              className={
                props.transport == "train" ? "activeInfo" : "passiveInfo"
              }
            >
              2h55m
            </Col>
            <Col
              className={
                props.transport == "car" ? "activeInfo" : "passiveInfo"
              }
            >
              2h55m
            </Col>
            <Col
              className={
                props.transport == "bike" ? "activeInfo" : "passiveInfo"
              }
            >
              2h55m
            </Col>
          </Row>
          <Row className="justify-content-center" id="bodyCenterBox">
            <Col
              className={
                props.transport == "walking"
                  ? "activePillar pillar"
                  : "passivePillar pillar"
              }
            ></Col>
            <Col
              className={
                props.transport == "train"
                  ? "activePillar pillar"
                  : "passivePillar pillar"
              }
            ></Col>
            <Col
              className={
                props.transport == "car"
                  ? "activePillar pillar"
                  : "passivePillar pillar"
              }
            ></Col>
            <Col
              className={
                props.transport == "bike"
                  ? "activePillar pillar"
                  : "passivePillar pillar"
              }
            ></Col>
          </Row>
        </Container>
      )}
    </Form>
  );
}
