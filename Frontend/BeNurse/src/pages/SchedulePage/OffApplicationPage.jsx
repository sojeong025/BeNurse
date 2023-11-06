import Container from "@components/atoms/Container/Container";
import OffCalendar from "@components/templates/Schedule/OffCalendar";
import OffContext from "../../components/templates/Schedule/OffContext";
import { useOffApplicationStore } from "../../store/store";

export default function OffApplicationPage() {
  const { showOffContext, selectDates, setSelectDates } =
    useOffApplicationStore();

  return (
    <Container
      backgroundColor={"white"}
      flex={["center", "flex-start"]}
    >
      <div style={{ marginTop: "88px" }}>
        {showOffContext ? (
          <OffContext selectDates={selectDates} />
        ) : (
          <OffCalendar setSelectDates={setSelectDates} />
        )}
      </div>
    </Container>
  );
}
