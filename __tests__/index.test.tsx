import React from "react";
import RevoCalendar from "../src/index";
import renderer from "react-test-renderer";

const testEvents = [
  {
    name: "Test Event",
    date: +new Date("November 18, 1997"),
    allDay: false,
  },
];
const testDate = new Date("November 18, 1997");

describe("RevoCalendar", () => {
  it("is truthy", () => {
    expect(RevoCalendar).toBeTruthy();
  });
});

test("Calendar component renders correctly using the passed props", () => {
  const component = renderer.create(
    <RevoCalendar
      date={testDate}
      events={testEvents}
      style={{
        borderRadius: "5px",
        border: "5px solid #4F6995",
      }}
      highlightToday={true}
      lang="en"
      primaryColor="#4F6995"
      secondaryColor="#D7E6EE"
      todayColor="#3B3966"
      textColor="#333333"
      indicatorColor="orange"
      animationSpeed={300}
      sidebarWidth={180}
      detailWidth={280}
      showDetailToggler={true}
      showSidebarToggler={true}
      onePanelAtATime={false}
      allowDeleteEvent={false}
      allowAddEvent={true}
      openDetailsOnDateSelection={true}
      timeFormat24={true}
      showAllDayLabel={false}
      detailDateFormat="DD/MM/YYYY"
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Calendar renders in other languages", () => {
  const component = renderer.create(<RevoCalendar date={testDate} events={testEvents} lang="pt" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
