import { useState, useEffect } from "react";
import "./App.css";
import { ChromePicker } from "react-color";
import GitHubButton from "react-github-btn";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import RevoCalendar from "revo-calendar";

const personIcon =
  "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z";

const thermometerIcon =
  "M12 9.312l-1.762.491 1.562.881-.491.871-1.562-.881.491 1.762-.963.268-.76-2.724-2.015-1.126v1.939l2 2-.707.707-1.293-1.293v1.793h-1v-1.793l-1.293 1.293-.707-.707 2-2v-1.939l-2.015 1.126-.761 2.724-.963-.268.491-1.762-1.562.882-.491-.871 1.562-.881-1.761-.492.269-.962 2.725.76 1.982-1.11-1.983-1.109-2.724.759-.269-.962 1.762-.491-1.563-.882.491-.871 1.562.881-.49-1.762.963-.269.76 2.725 2.015 1.128v-1.94l-2-2 .707-.707 1.293 1.293v-1.793h1v1.793l1.293-1.293.707.707-2 2v1.94l2.016-1.127.76-2.725.963.269-.492 1.761 1.562-.881.491.871-1.562.881 1.762.492-.269.962-2.725-.76-1.982 1.11 1.982 1.109 2.725-.76.269.963zm4-5.812v7.525c0 1.57-.514 2.288-1.41 3.049-1.011.859-1.59 2.107-1.59 3.426 0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5c0-1.319-.579-2.567-1.589-3.426-.897-.762-1.411-1.48-1.411-3.049v-7.525c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5zm5 0v7.525c0 .587.258 1.145.705 1.525 1.403 1.192 2.295 2.966 2.295 4.95 0 3.59-2.909 6.5-6.5 6.5s-6.5-2.91-6.5-6.5c0-1.984.892-3.758 2.295-4.949.447-.381.705-.94.705-1.526v-7.525c0-1.934 1.567-3.5 3.5-3.5s3.5 1.566 3.5 3.5zm0 14c0 1.934-1.567 3.5-3.5 3.5s-3.5-1.566-3.5-3.5c0-1.141.599-2.084 1.393-2.781 1.01-.889 1.607-1.737 1.607-3.221v-.498h1v.498c0 1.486.595 2.33 1.607 3.221.794.697 1.393 1.64 1.393 2.781z";

function App() {
  var reso1 = new Date();
  reso1.setHours(17, 0, 0);

  var reso2 = new Date();
  reso2.setHours(18, 15, 0);

  var reso3 = new Date();
  reso3.setHours(19, 30, 0);

  var reso4 = new Date();
  reso4.setHours(20, 45, 0);

  var lunchWithKevin = new Date();
  lunchWithKevin.setDate(lunchWithKevin.getDate() + 1);
  lunchWithKevin.setHours(13, 0, 0);

  var meetingWithVito = new Date();
  meetingWithVito.setDate(meetingWithVito.getDate() + 1);
  meetingWithVito.setHours(16, 30, 0);

  var dinnerWithFredo = new Date();
  dinnerWithFredo.setDate(dinnerWithFredo.getDate() + 1);
  dinnerWithFredo.setHours(20, 0, 0);

  var dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  const [eventList, setEvents] = useState([
    {
      name: "Homer Simpson",
      date: +reso1,
      allDay: false,
      extra: {
        icon: personIcon,
        text: "party of 5",
      },
    },
    {
      name: "Han Solo",
      date: +reso2,
      allDay: false,
      extra: {
        icon: personIcon,
        text: "party of 2",
      },
    },
    {
      name: "Gandalf, the Grey",
      date: +reso3,
      allDay: false,
      extra: {
        icon: personIcon,
        text: "party of 9",
      },
    },
    {
      name: "Britta Perry",
      date: +reso4,
      allDay: false,
      extra: {
        icon: personIcon,
        text: "party of 7",
      },
    },
    {
      name: "Lunch with Michael",
      date: +lunchWithKevin,
      allDay: false,
    },
    {
      name: "Meeting with Vito",
      date: +meetingWithVito,
      allDay: false,
    },
    {
      name: "Dinner with Fredo",
      date: +dinnerWithFredo,
      allDay: false,
    },
    {
      name: "Day after Tomorrow",
      date: +dayAfterTomorrow,
      allDay: true,
      extra: {
        icon: thermometerIcon,
        text: "-30º C",
      },
    },
  ]);

  const [displayColorPicker, setDisplayColorPicker] = useState(0);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const [highlightToday, setHighlightToday] = useState(true);
  const [lang, setLang] = useState("en");
  const [primaryColor, setPrimaryColor] = useState("#4F6995");
  const [secondaryColor, setSecondaryColor] = useState("#D7E6EE");
  const [todayColor, setTodayColor] = useState("#3B3966");
  const [textColor, setTextColor] = useState("#333333");
  const [indicatorColor, setIndicatorColor] = useState("orange");
  const [animationSpeed, setAnimationSpeed] = useState(300);
  const [sidebarWidth, setSidebarWidth] = useState(180);
  const [detailWidth, setDetailWidth] = useState(280);
  const [showDetailToggler, setShowDetailToggler] = useState(true);
  const [showSidebarToggler, setShowSidebarToggler] = useState(true);
  const [onePanelAtATime, setOnePanelAtATime] = useState(false);
  const [allowDeleteEvent, setAllowDeleteEvent] = useState(true);
  const [allowAddEvent, setAllowAddEvent] = useState(true);
  const [openDetailsOnDateSelection, setOpenDetailsOnDateSelection] =
    useState(true);
  const [timeFormat24, setTimeFormat24] = useState(true);
  const [showAllDayLabel, setShowAllDayLabel] = useState(false);
  const [detailDateFormat, setDetailDateFormat] = useState("DD/MM/YYYY");

  const [newEventName, setNewEventName] = useState("");
  const [newEventDate, setNewEventDate] = useState(new Date());
  const [newEventAllDay, setNewEventAllDay] = useState(false);
  const [newEventIcon, setNewEventIcon] = useState("");
  const [newEventText, setNewEventText] = useState("");

  function deleteEvent(i: number) {
    var temp = eventList;
    temp.splice(i, 1);
    setEvents(temp);
  }

  function addEvent() {
    setShowAddEventModal(false);
    var newEvent = {
      name: newEventName,
      date: +newEventDate,
      allDay: newEventAllDay,
      extra: {
        icon: newEventIcon,
        text: newEventText,
      },
    };
    var temp = eventList;
    temp.push(newEvent);
    setEvents([...temp]);
  }

  useEffect(() => {
    var deleteEventFunction = `
    var temp = eventList
    temp.splice(i, 1)
    setEvents(temp)`;

    var addEventFunction = `
    var newEvent = {
      name: newEventName,
      date: newEventDate,
      allday: newEventAllDay,
      extra: {
        icon: newEventIcon,
        text: newEventText
      }
    };
    var temp = eventList;
    temp.push(newEvent);
    setEvents([...temp]);`;

    console.log(
      `%cfunction %cdeleteEvent %c() {\n`,
      "color: #f777c9",
      "color: #67fd6e",
      "color: #D7D7D7",
      deleteEventFunction,
      `\n}`
    );
    console.log(
      `%cfunction %caddEvent %c() {\n`,
      "color: #f777c9",
      "color: #67fd6e",
      "color: #D7D7D7",
      addEventFunction,
      `\n}`
    );
  }, []);

  useEffect(() => {
    console.log("%cEventList: ", "color: #b788f4", eventList);
  }, [eventList]);

  return (
    <>
      <header>
        <div className="header">
          <h1>RevoCalendar</h1>
          <div className="mobileMenu">MOBILE MENU</div>
          <ul>
            <li>
              <a href="#gettingStarted">Getting Started</a>
            </li>
            <li>
              <a href="#example">Live Example</a>
            </li>
            <li>
              <a
                href="https://gabrielmolter.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                Author
              </a>
            </li>
            <li>
              <GitHubButton
                href="https://github.com/gjmolter/revo-calendar"
                data-size="large"
                data-show-count="true"
                aria-label="Star gjmolter/revo-calendar on GitHub"
              >
                Star
              </GitHubButton>
            </li>
          </ul>
        </div>
      </header>
      <div className="container">
        <h2 id="gettingStarted">Getting Started</h2>
        <p>First, install revo-calendar package using NPM or Yarn</p>
        <div className="code">
          <code>
            <pre>$ npm i revo-calendar</pre>
            <pre className="comment"># or</pre>
            <pre>$ yarn add revo-calendar</pre>
          </code>
        </div>
        <p>Then, import the component and the CSS file</p>
        <div className="code">
          <code>
            <pre>
              <span className="codePink">import</span> RevoCalendar
              <span className="codePink"> from</span>
              <span className="codeYellow"> 'revo-calendar'</span>
            </pre>
          </code>
        </div>

        <h2 id="example">Live Example</h2>
        <div className="demo">
          <RevoCalendar
            events={eventList}
            style={{
              borderRadius: "5px",
              border: `5px solid ${primaryColor}`,
            }}
            date={new Date()}
            deleteEvent={deleteEvent}
            highlightToday={highlightToday}
            lang={lang}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            todayColor={todayColor}
            textColor={textColor}
            indicatorColor={indicatorColor}
            animationSpeed={animationSpeed}
            sidebarWidth={sidebarWidth}
            detailWidth={detailWidth}
            showDetailToggler={showDetailToggler}
            showSidebarToggler={showSidebarToggler}
            onePanelAtATime={onePanelAtATime}
            allowDeleteEvent={allowDeleteEvent}
            allowAddEvent={allowAddEvent}
            openDetailsOnDateSelection={openDetailsOnDateSelection}
            timeFormat24={timeFormat24}
            showAllDayLabel={showAllDayLabel}
            detailDateFormat={detailDateFormat}
            addEvent={(date: Date) => {
              setNewEventDate(date);
              setShowAddEventModal(true);
            }}
          />
        </div>
        {showAddEventModal && (
          <div className="addEventModal">
            <h2>Add your own event: </h2>
            <div className="options">
              <code>
                <pre>
                  <span className="codePink">var </span>newEvent = {"{"}
                </pre>
                <pre className="tab">
                  name<label className="codePink">:</label> "
                  <input
                    type="text"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                  />
                  ",
                </pre>
                <pre className="tab">
                  date<label className="codePink">:</label>
                  <DatePicker
                    id="datePicker"
                    selected={newEventDate}
                    onChange={(date) => {
                      date instanceof Date && setNewEventDate(date);
                    }}
                    showTimeSelect
                    dateFormat="dd/MM/yyyy"
                  />
                  <label className="timeDisplay" htmlFor="datePicker">{`${
                    newEventDate.getHours() <= 9
                      ? "0" + newEventDate.getHours()
                      : newEventDate.getHours()
                  }:${
                    newEventDate.getMinutes() <= 9
                      ? "0" + newEventDate.getMinutes()
                      : newEventDate.getMinutes()
                  }`}</label>
                  , <span className="comment">{"/* DD/MM/YYYY */"}</span>
                </pre>
                <pre className="tab">
                  allDay<label className="codePink">:</label>
                  <input
                    type="checkbox"
                    checked={newEventAllDay}
                    onChange={(e) => setNewEventAllDay(e.target.checked)}
                  />
                  ,
                </pre>
                <pre className="tab">
                  extra<label className="codePink">:</label> {"{"}
                </pre>
                <pre className="tab2">
                  icon<label className="codePink">:</label>"
                  <input
                    type="text"
                    value={newEventIcon}
                    onChange={(e) => setNewEventIcon(e.target.value)}
                  />
                  ",
                </pre>
                <pre className="tab2">
                  text<label className="codePink">:</label>"
                  <input
                    type="text"
                    value={newEventText}
                    onChange={(e) => setNewEventText(e.target.value)}
                  />
                  "
                </pre>
                <pre>{"}"}</pre>
                <div className="addEvent">
                  <button
                    className="colorPickerBtn"
                    disabled={newEventName === ""}
                    onClick={addEvent}
                  >
                    addEvent()
                  </button>
                </div>
              </code>
            </div>
            <div onClick={() => setShowAddEventModal(false)} />
          </div>
        )}
        <p style={{ marginTop: "3rem" }}>
          Before you start playing, please note that you won't be able to modify
          the <span>date</span>, <span>languages</span>, <span>style</span>,{" "}
          <span>className</span>, <span>addEvent</span>,{" "}
          <span>deleteEvent</span>, <span>detailDefault</span>,{" "}
          <span>sidebarDefault</span>,<span>dateSelected</span> and{" "}
          <span>eventSelected</span> props in this demo.
        </p>
        <p>
          For detailed explanations on all available props, check the{" "}
          <a
            href="https://github.com/gjmolter/revo-calendar"
            target="_blank"
            rel="noreferrer noopener"
          >
            README on GitHub
          </a>
        </p>
        <div className="options">
          <div>
            <label htmlFor="highlightToday">highlightToday: </label>
            <input
              type="checkbox"
              name="highlightToday"
              checked={highlightToday}
              onChange={(e) => {
                setHighlightToday(e.target.checked);
              }}
            />
          </div>
          <div
            onChange={(e) => {
              var element: any = e.target;
              setLang(element.value);
            }}
          >
            <label htmlFor="lang">lang: </label>
            <input type="radio" name="lang" value="en" id="en" defaultChecked />
            <label htmlFor="en"> English</label>
            <input type="radio" name="lang" value="pt" id="pt" />
            <label htmlFor="pt"> Portuguese</label>
            <input type="radio" name="lang" value="es" id="es" />
            <label htmlFor="es"> Spanish</label>
            <input type="radio" name="lang" value="de" id="de" />
            <label htmlFor="de"> German</label>
          </div>
          <div>
            <label>primaryColor: </label>
            <button
              onClick={() =>
                setDisplayColorPicker(displayColorPicker === 1 ? 0 : 1)
              }
              className="colorPickerBtn"
            >
              {displayColorPicker === 1 ? "Close" : "Pick Color"}
            </button>
            {displayColorPicker === 1 && (
              <div className="pickerContainer">
                <ChromePicker
                  color={primaryColor}
                  onChangeComplete={(c) => setPrimaryColor(c.hex)}
                  disableAlpha
                />
              </div>
            )}
          </div>
          <div>
            <label>secondaryColor: </label>
            <button
              onClick={() =>
                setDisplayColorPicker(displayColorPicker === 2 ? 0 : 2)
              }
              className="colorPickerBtn"
            >
              {displayColorPicker === 2 ? "Close" : "Pick Color"}
            </button>
            {displayColorPicker === 2 && (
              <div className="pickerContainer">
                <ChromePicker
                  color={secondaryColor}
                  onChangeComplete={(c) => setSecondaryColor(c.hex)}
                  disableAlpha
                />
              </div>
            )}
          </div>
          <div>
            <label>todayColor: </label>
            <button
              onClick={() =>
                setDisplayColorPicker(displayColorPicker === 3 ? 0 : 3)
              }
              className="colorPickerBtn"
            >
              {displayColorPicker === 3 ? "Close" : "Pick Color"}
            </button>
            {displayColorPicker === 3 && (
              <div className="pickerContainer">
                <ChromePicker
                  color={todayColor}
                  onChangeComplete={(c) => setTodayColor(c.hex)}
                  disableAlpha
                />
              </div>
            )}
          </div>
          <div>
            <label>textColor: </label>
            <button
              onClick={() =>
                setDisplayColorPicker(displayColorPicker === 4 ? 0 : 4)
              }
              className="colorPickerBtn"
            >
              {displayColorPicker === 4 ? "Close" : "Pick Color"}
            </button>
            {displayColorPicker === 4 && (
              <div className="pickerContainer">
                <ChromePicker
                  color={textColor}
                  onChangeComplete={(c) => setTextColor(c.hex)}
                  disableAlpha
                />
              </div>
            )}
          </div>
          <div>
            <label>indicatorColor: </label>
            <button
              onClick={() =>
                setDisplayColorPicker(displayColorPicker === 5 ? 0 : 5)
              }
              className="colorPickerBtn"
            >
              {displayColorPicker === 5 ? "Close" : "Pick Color"}
            </button>
            {displayColorPicker === 5 && (
              <div className="pickerContainer">
                <ChromePicker
                  color={indicatorColor}
                  onChangeComplete={(c) => setIndicatorColor(c.hex)}
                  disableAlpha
                />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="animationSpeed">animationSpeed: </label>
            <input
              type="number"
              name="animationSpeed"
              onChange={(e) => setAnimationSpeed(parseInt(e.target.value))}
              value={animationSpeed}
            />
            <span style={{ marginLeft: "10px" }}>ms</span>
          </div>
          <div>
            <label htmlFor="sidebarWidth">sidebarWidth: </label>
            <input
              type="number"
              name="sidebarWidth"
              onChange={(e) => setSidebarWidth(parseInt(e.target.value))}
              value={sidebarWidth}
            />
            <span style={{ marginLeft: "10px" }}>px</span>
          </div>
          <div>
            <label htmlFor="detailWidth">detailWidth: </label>
            <input
              type="number"
              name="detailWidth"
              onChange={(e) => setDetailWidth(parseInt(e.target.value))}
              value={detailWidth}
            />
            <span style={{ marginLeft: "10px" }}>px</span>
          </div>
          <div>
            <label htmlFor="showDetailToggler">showDetailToggler: </label>
            <input
              type="checkbox"
              name="showDetailToggler"
              checked={showDetailToggler}
              onChange={(e) => {
                setShowDetailToggler(e.target.checked);
              }}
            />
          </div>
          <div>
            <label htmlFor="showSidebarToggler">showSidebarToggler: </label>
            <input
              type="checkbox"
              name="showSidebarToggler"
              checked={showSidebarToggler}
              onChange={(e) => {
                setShowSidebarToggler(e.target.checked);
              }}
            />
          </div>
          <div>
            <label htmlFor="onePanelAtATime">onePanelAtATime: </label>
            <input
              type="checkbox"
              name="onePanelAtATime"
              checked={onePanelAtATime}
              onChange={(e) => {
                setOnePanelAtATime(e.target.checked);
              }}
            />
          </div>
          <div>
            <label htmlFor="allowDeleteEvent">allowDeleteEvent: </label>
            <input
              type="checkbox"
              name="allowDeleteEvent"
              checked={allowDeleteEvent}
              onChange={(e) => {
                setAllowDeleteEvent(e.target.checked);
              }}
            />
          </div>
          <div>
            <label htmlFor="allowAddEvent">allowAddEvent: </label>
            <input
              type="checkbox"
              name="allowAddEvent"
              checked={allowAddEvent}
              onChange={(e) => {
                setAllowAddEvent(e.target.checked);
              }}
            />
          </div>
          <div>
            <label htmlFor="openDetailsOnDateSelection">
              openDetailsOnDateSelection:{" "}
            </label>
            <input
              type="checkbox"
              name="openDetailsOnDateSelection"
              checked={openDetailsOnDateSelection}
              onChange={(e) => {
                setOpenDetailsOnDateSelection(e.target.checked);
              }}
            />
          </div>
          <div>
            <label htmlFor="timeFormat24">timeFormat24: </label>
            <input
              type="checkbox"
              name="timeFormat24"
              checked={timeFormat24}
              onChange={(e) => {
                setTimeFormat24(e.target.checked);
              }}
            />
          </div>
          <div>
            <label htmlFor="showAllDayLabel">showAllDayLabel: </label>
            <input
              type="checkbox"
              name="showAllDayLabel"
              checked={showAllDayLabel}
              onChange={(e) => {
                setShowAllDayLabel(e.target.checked);
              }}
            />
          </div>
          <div>
            <label htmlFor="detailDateFormat">detailDateFormat: </label>
            <input
              type="text"
              name="detailDateFormat"
              value={detailDateFormat}
              onChange={(e) => {
                setDetailDateFormat(e.target.value);
              }}
            />
          </div>
        </div>
        <p>
          Current coponent's JSX code (Some of these could be removed, if it
          wouldn't change the component's defaults):
        </p>
        <div className="code">
          <code>
            <pre>
              {"<"}
              <span className="codeBlue">RevoCalendar</span>
            </pre>
            <pre className="tab">
              <span className="codeGreen">events</span>
              {"={"}
              <span className="codePurple">eventList</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">style</span>
              {"={{"}
            </pre>
            <pre className="tab2">
              borderRadius:
              <span className="codeYellow">"5px"</span>,
            </pre>
            <pre className="tab2">
              border:
              <span className="codeYellow">"5px solid #4F6995"</span>
            </pre>
            <pre className="tab">{"}}"}</pre>
            <pre className="tab">
              <span className="codeGreen">highlightToday</span>
              {"={"}
              <span className="codePurple">{highlightToday.toString()}</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">lang</span>=
              <span className="codeYellow">"{lang}"</span>
            </pre>
            <pre className="tab">
              <span className="codeGreen">primaryColor</span>=
              <span className="codeYellow">"{primaryColor}"</span>
            </pre>
            <pre className="tab">
              <span className="codeGreen">secondaryColor</span>=
              <span className="codeYellow">"{secondaryColor}"</span>
            </pre>
            <pre className="tab">
              <span className="codeGreen">todayColor</span>=
              <span className="codeYellow">"{todayColor}"</span>
            </pre>
            <pre className="tab">
              <span className="codeGreen">textColor</span>=
              <span className="codeYellow">"{textColor}"</span>
            </pre>
            <pre className="tab">
              <span className="codeGreen">indicatorColor</span>=
              <span className="codeYellow">"{indicatorColor}"</span>
            </pre>
            <pre className="tab">
              <span className="codeGreen">animationSpeed</span>
              {"={"}
              <span className="codePurple">{animationSpeed}</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">sidebarWidth</span>
              {"={"}
              <span className="codePurple">{sidebarWidth}</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">detailWidth</span>
              {"={"}
              <span className="codePurple">{detailWidth}</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">showDetailToggler</span>
              {"={"}
              <span className="codePurple">{showDetailToggler.toString()}</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">showSidebarToggler</span>
              {"={"}
              <span className="codePurple">
                {showSidebarToggler.toString()}
              </span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">onePanelAtATime</span>
              {"={"}
              <span className="codePurple">{onePanelAtATime.toString()}</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">allowDeleteEvent</span>
              {"={"}
              <span className="codePurple">{allowDeleteEvent.toString()}</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">allowAddEvent</span>
              {"={"}
              <span className="codePurple">{allowAddEvent.toString()}</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">openDetailsOnDateSelection</span>
              {"={"}
              <span className="codePurple">
                {openDetailsOnDateSelection.toString()}
              </span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">timeFormat24</span>
              {"={"}
              <span className="codePurple">{timeFormat24.toString()}</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">showAllDayLabel</span>
              {"={"}
              <span className="codePurple">{showAllDayLabel.toString()}</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">detailDateFormat</span>=
              <span className="codeYellow">"{detailDateFormat}"</span>
            </pre>
            <pre className="tab">
              <span className="codeGreen">deleteEvent</span>
              {"={"}
              <span className="codeGreen">deleteEvent</span>
              {"}"}
            </pre>
            <pre className="tab">
              <span className="codeGreen">addEvent</span>
              {"={"}
              <span className="codeGreen">addEvent</span>
              {"}"}
            </pre>
            <pre>{"/>"}</pre>
          </code>
        </div>
        <p>
          If you're curious on what{" "}
          <span className="codeGreen">deleteEvent</span> or{" "}
          <span className="codeGreen">addEvent</span> functions do or what the{" "}
          <span className="codePurple">eventList</span> variable looks like,
          check the DevTools Console!
        </p>
      </div>
      <footer>
        <p>
          If you find this usefull and it has saved you some time, please
          consider
        </p>
        <div className="bmc">
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.buymeacoffee.com/gjmolter"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
              alt="Buying me a Coffee"
            />
            <span>Buying me a Coffee</span>
          </a>
        </div>
        <p>
          Also, feel free to contribute with this project on{" "}
          <a
            href="https://github.com/gjmolter/revo-calendar"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
