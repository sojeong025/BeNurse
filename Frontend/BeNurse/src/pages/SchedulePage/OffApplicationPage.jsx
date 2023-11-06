import Container from "@components/atoms/Container/Container";
import OffCalendar from "@components/templates/Schedule/OffCalendar";
import OffContext from "../../components/templates/Schedule/OffContext";

export default function OffApplicationPage() {
  return (
    <Container
      backgroundColor={"white"}
      flex={["center", "flex-start"]}
    >
      <div style={{ marginTop: "88px" }}>
        <OffCalendar />
      </div>
    </Container>
  );
}
