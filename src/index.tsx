import React, { useState, useEffect, useRef } from "react";

import helperFunctions from "./helpers/functions";
import translations from "./helpers/translations";

import { Props } from "./typings";

import { ThemeProvider } from "styled-components";
import {
  Calendar,
  CloseDetail,
  CloseSidebar,
  Day,
  DayButton,
  Details,
  Event,
  Inner,
  MonthButton,
  Sidebar,
} from "./styles";

// -1 = ANIMATE CLOSING | 0 = NOTHING | 1 = ANIMATE OPENING.
let animatingSidebar = 0;
let animatingDetail = 0;

const RevoCalendar = ({
  style = {},
  className = "",
  events = [],
  highlightToday = true,
  lang = "en",
  primaryColor = "#4F6995",
  secondaryColor = "#c4dce9",
  todayColor = "#3B3966",
  textColor = "#333333",
  indicatorColor = "orange",
  animationSpeed = 300,
  sidebarWidth = 180,
  detailWidth = 280,
  showDetailToggler = true,
  detailDefault = true,
  showSidebarToggler = true,
  sidebarDefault = true,
  onePanelAtATime = false,
  allowDeleteEvent = true,
  allowAddEvent = true,
  openDetailsOnDateSelection = true,
  timeFormat24 = true,
  showAllDayLabel = false,
  detailDateFormat = "DD/MM/YYYY",
  languages = translations,
  date = new Date(),
  dateSelected = () => {},
  eventSelected = () => {},
  addEvent = () => {},
  deleteEvent = () => {},
}: Props) => {
  // TRANSFORM ANY PASSED COLOR FORMAT INTO RGB.
  const primaryColorRGB = helperFunctions.getRGBColor(primaryColor);
  const secondaryColorRGB = helperFunctions.getRGBColor(secondaryColor);
  const todayColorRGB = helperFunctions.getRGBColor(todayColor);
  const indicatorColorRGB = helperFunctions.getRGBColor(indicatorColor);
  const textColorRGB = helperFunctions.getRGBColor(textColor);

  const calendarRef: any = useRef(null);

  // GET CALENDAR SIZE HOOK.
  function useCalendarWidth() {
    const [size, setSize] = useState(0);
    useEffect(() => {
      function updateSize() {
        if (calendarRef.current != null) {
          setSize(calendarRef.current.offsetWidth);
        }
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, [calendarRef.current]);
    return size;
  }

  const calendarWidth = useCalendarWidth();

  // IF CALENDAR WIDTH CAN'T FIT BOTH PANELS, FORCE ONE PANEL AT A TIME.
  if (calendarWidth <= 320 + sidebarWidth + detailWidth) {
    onePanelAtATime = true;
    // IF BOTH SIDEBAR AND DETAIL PANELS ARE SET TO BE OPEN BY DEFAULT, SIDEBAR WILL HAVE PRIORITY.
    if (sidebarDefault && detailDefault) detailDefault = false;
  }

  // IN ORDER TO MAKE IT RESPONSIBLE, PANELS WILL FLOAT ON TOP OF CALENDAR ON LOW RES.
  const floatingPanels =
    calendarWidth <= 320 + sidebarWidth || calendarWidth <= 320 + detailWidth;

  // IF, WITH THE CURRENT SETTING, THE SIDEBAR OR DETAIL PANELS WON'T FIT THE SCREEN, MAKE THEM SMALLER.
  sidebarWidth =
    calendarWidth < sidebarWidth + 50 ? calendarWidth - 50 : sidebarWidth;
  detailWidth =
    calendarWidth < detailWidth + 50 ? calendarWidth - 50 : detailWidth;

  // USE TODAY AS DEFAULT SELECTED DATE IF PASSED DATE IS INVALID.
  if (!helperFunctions.isValidDate(date)) {
    console.log("The passed date prop is invalid");
    date = new Date();
  }

  // SET INITIAL STATE.
  const [currentDay, setDay] = useState(date.getDate());
  const [currentMonth, setMonth] = useState(date.getMonth());
  const [currentYear, setYear] = useState(date.getFullYear());

  const [sidebarOpen, setSidebarState] = useState(sidebarDefault);
  const [detailsOpen, setDetailsState] = useState(detailDefault);

  // GIVE PARENT COMPONENT THE CURRENT SELECTED CALENDAR DAY.
  useEffect(() => {
    dateSelected({
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    });
  }, [currentDay, currentMonth, currentYear]);

  // CLOSE DETAILS IF CAN'T FIT IT ANYMORE AFTER RESIZING.
  useEffect(() => {
    if (
      sidebarOpen &&
      detailsOpen &&
      calendarWidth <= 320 + sidebarWidth + detailWidth
    ) {
      animatingDetail = -1;
      setDetailsState(false);
    }
  }, [calendarWidth]);

  /***********************
   * CALENDAR COMPONENTS *
   ***********************/
  function CalendarSidebar() {
    function prevYear() {
      setYear(currentYear - 1);
    }

    function nextYear() {
      setYear(currentYear + 1);
    }

    // MAKE SURE NO ANIMATION WILL RUN ON NEXT RE-RENDER.
    function animationEnd() {
      animatingSidebar = 0;
    }

    function toggleSidebar() {
      animatingSidebar = sidebarOpen ? -1 : 1;
      setSidebarState(!sidebarOpen);
      // FORCE DETAILS TO CLOSE IF onePanelAtATime IS true.
      if (animatingSidebar === 1 && onePanelAtATime && detailsOpen) {
        animatingDetail = -1;
        setDetailsState(false);
      }
    }

    function ChevronButton({
      angle,
      color,
      action,
    }: {
      angle: number;
      color: string;
      action(): void;
    }) {
      return (
        <button onClick={action}>
          <svg
            aria-hidden="true"
            focusable="false"
            width="1em"
            height="1em"
            style={{ transform: `rotate(${angle}deg)` }}
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 8 8"
          >
            <path d="M1.5 1L0 2.5l4 4l4-4L6.5 1L4 3.5L1.5 1z" fill={color} />
            <rect x="0" y="0" width="8" height="8" fill="rgba(0, 0, 0, 0)" />
          </svg>
        </button>
      );
    }

    return (
      <>
        <Sidebar
          animatingIn={animatingSidebar === 1}
          animatingOut={animatingSidebar === -1}
          sidebarOpen={sidebarOpen}
          onAnimationEnd={animationEnd}
        >
          <div>
            <ChevronButton
              angle={90}
              color={secondaryColorRGB}
              action={prevYear}
            />
            <span>{currentYear}</span>
            <ChevronButton
              angle={270}
              color={secondaryColorRGB}
              action={nextYear}
            />
          </div>
          <div>
            <ul>
              {languages[lang].months.map((month: string, i: number) => {
                return (
                  <li key={i}>
                    <MonthButton
                      current={i === currentMonth}
                      onClick={() => setMonth(i)}
                    >
                      {month}
                    </MonthButton>
                  </li>
                );
              })}
            </ul>
          </div>
        </Sidebar>
        {showSidebarToggler && (
          <CloseSidebar
            onClick={toggleSidebar}
            animatingIn={animatingSidebar === 1}
            animatingOut={animatingSidebar === -1}
            sidebarOpen={sidebarOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill={secondaryColorRGB}
                d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"
              />
            </svg>
          </CloseSidebar>
        )}
      </>
    );
  }

  function CalendarInner() {
    // GET LIST OF DAYS ON EACH MONTH ACCOUNTING FOR LEAP YEARS.
    const daysInMonths = helperFunctions.isLeapYear(currentMonth, currentYear);

    const days = [];
    for (let index = 1; index <= daysInMonths[currentMonth]; index++) {
      var isToday = helperFunctions.isToday(index, currentMonth, currentYear);
      var highlight = isToday && highlightToday;
      var hasEvent = false;

      for (let indexEvent = 0; indexEvent < events.length; indexEvent++) {
        const currentDate = new Date(currentYear, currentMonth, index);

        // TAKE OUT TIME FROM PASSED TIMESTAMP IN ORDER TO COMPARE ONLY DATE
        var tempDate = new Date(events[indexEvent].date);
        tempDate.setHours(0, 0, 0, 0);

        if (tempDate.getTime() === currentDate.getTime()) {
          hasEvent = true;
          break;
        }
      }

      const day = (
        <DayButton
          today={highlight}
          current={index === currentDay}
          hasEvent={hasEvent}
          onClick={() => {
            setDay(index);
            if (openDetailsOnDateSelection && !detailsOpen) {
              animatingDetail = 1;
              setDetailsState(true);
              // FORCE SIDEBAR TO CLOSE IF onePanelAtATime IS true.
              if (onePanelAtATime && sidebarOpen) {
                animatingSidebar = -1;
                setSidebarState(false);
              }
            }
          }}
        >
          <span>{index}</span>
        </DayButton>
      );
      days.push(day);
    }

    return (
      <Inner
        onClick={() => {
          if (floatingPanels) {
            if (sidebarOpen) {
              animatingSidebar = -1;
              setSidebarState(false);
            } else if (detailsOpen) {
              animatingDetail = -1;
              setDetailsState(false);
            }
          }
        }}
      >
        <h1>{languages[lang].months[currentMonth]}</h1>
        <div>
          <div>
            {languages[lang].daysShort.map((weekDay: string) => {
              return <div key={weekDay}>{weekDay.toUpperCase()}</div>;
            })}
          </div>
          <div>
            {days.map((day, i) => {
              return (
                <Day
                  firstDay={i === 0}
                  key={i}
                  firstOfMonth={
                    helperFunctions.getFirstWeekDayOfMonth(
                      currentMonth,
                      currentYear
                    ) + 1
                  }
                >
                  {day}
                </Day>
              );
            })}
          </div>
        </div>
      </Inner>
    );
  }

  function CalendarDetails() {
    var selectedDate = new Date(currentYear, currentMonth, currentDay);

    // WILL SHOW DELETE EVENT BUTTON ON CURRENT showDelete INDEX. -1 WON'T SHOW ANYTHING
    const [showDelete, setDeleteState] = useState(-1);

    // MAKE SURE NO ANIMATION WILL RUN ON NEXT RE-RENDER.
    function animationEnd() {
      animatingDetail = 0;
    }

    function toggleDetails() {
      animatingDetail = detailsOpen ? -1 : 1;
      setDetailsState(!detailsOpen);
      // FORCE SIDEBAR TO CLOSE IF onePanelAtATime IS true.
      if (animatingDetail === 1 && onePanelAtATime && sidebarOpen) {
        animatingSidebar = -1;
        setSidebarState(false);
      }
    }

    function toggleDeleteButton(i: number) {
      // GIVE PARENT COMPONENT THE CURRENT SELECTED EVENT.
      eventSelected(i);

      if (allowDeleteEvent) {
        showDelete === i ? setDeleteState(-1) : setDeleteState(i);
      }
    }

    const eventDivs = [];

    for (let index = 0; index < events.length; index++) {
      var eventDate = new Date(events[index].date);

      // TAKE OUT TIME FROM PASSED TIMESTAMP IN ORDER TO COMPARE ONLY DATE
      var tempDate = new Date(events[index].date);
      tempDate.setHours(0, 0, 0, 0);

      if (
        helperFunctions.isValidDate(eventDate) &&
        tempDate.getTime() === selectedDate.getTime()
      ) {
        const event = (
          <Event key={index} onClick={() => toggleDeleteButton(index)}>
            <p>{events[index].name}</p>
            <div>
              {events[index].allDay ? (
                <>
                  {showAllDayLabel && (
                    <div>
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path
                          fill={primaryColorRGB}
                          d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"
                        />
                      </svg>
                      <span>{languages[lang].allDay}</span>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill={primaryColorRGB}
                      d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z"
                    />
                  </svg>
                  <span>
                    {helperFunctions.getFormattedTime(eventDate, timeFormat24)}
                  </span>
                </div>
              )}
              {events[index].extra && (
                <div>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      fill={primaryColorRGB}
                      d={events[index].extra?.icon}
                    />
                  </svg>
                  <span>{events[index].extra?.text}</span>
                </div>
              )}
            </div>
            {showDelete === index && (
              <button onClick={() => deleteEvent(index)}>
                {languages[lang].delete}
              </button>
            )}
          </Event>
        );
        eventDivs.push(event);
      }
    }

    // FOR NO-EVENT DAYS ADD NO EVENTS TEXT
    if (eventDivs.length === 0) {
      eventDivs.push(<p key={-1}>{languages[lang].noEventForThisDay}</p>);
    }

    return (
      <>
        <Details
          animatingIn={animatingDetail === 1}
          animatingOut={animatingDetail === -1}
          detailsOpen={detailsOpen}
          floatingPanels={floatingPanels}
          onAnimationEnd={animationEnd}
        >
          <div>
            {helperFunctions.getFormattedDate(
              selectedDate,
              detailDateFormat,
              lang,
              languages
            )}
            {allowAddEvent && (
              <button
                onClick={() =>
                  addEvent(new Date(currentYear, currentMonth, currentDay))
                }
              >
                {languages[lang].addEvent}
              </button>
            )}
          </div>
          <div>
            {eventDivs.map((event) => {
              return event;
            })}
          </div>
        </Details>
        {showDetailToggler && (
          <CloseDetail
            onClick={toggleDetails}
            animatingIn={animatingDetail === 1}
            animatingOut={animatingDetail === -1}
            detailsOpen={detailsOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill={secondaryColorRGB}
                d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"
              />
            </svg>
          </CloseDetail>
        )}
      </>
    );
  }

  /**************************
   * RENDER ACTUAL CALENDAR *
   **************************/
  return (
    <ThemeProvider
      theme={{
        primaryColor: primaryColorRGB,
        primaryColor50: helperFunctions.getRGBAColorWithAlpha(
          primaryColorRGB,
          0.5
        ),
        secondaryColor: secondaryColorRGB,
        todayColor: todayColorRGB,
        textColor: textColorRGB,
        indicatorColor: indicatorColorRGB,
        animationSpeed: `${animationSpeed}ms`,
        sidebarWidth: `${sidebarWidth}px`,
        detailWidth: `${detailWidth}px`,
      }}
    >
      <Calendar className={className} ref={calendarRef} style={style}>
        <CalendarSidebar />
        <CalendarInner />
        <CalendarDetails />
      </Calendar>
    </ThemeProvider>
  );
};
export default RevoCalendar;
