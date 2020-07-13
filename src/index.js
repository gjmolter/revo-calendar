import React, {
  useState,
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef
} from 'react'

import styles from './RevoCalendar.module.css'

/***********
 * HELPERS *
 ***********/

const TRANSLATIONS = {
  en: {
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthsShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    noEventForThisDay: 'No event for this day... so take a rest!',
    allDay: 'All day'
  },
  es: {
    days: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ],
    daysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    daysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ],
    monthsShort: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ],
    noEventForThisDay: 'Ningún evento para este día... ¡así que descanse!',
    allDay: 'Todo el dia'
  },
  de: {
    days: [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag'
    ],
    daysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    daysMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    months: [
      'Januar',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember'
    ],
    monthsShort: [
      'Jan',
      'Feb',
      'Mär',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dez'
    ],
    noEventForThisDay:
      'Keine Veranstaltung für diesen Tag... also ruhen Sie sich aus!',
    allDay: 'Den ganzen Tag'
  },
  pt: {
    days: [
      'Domingo',
      'Segunda-Feira',
      'Terça-Feira',
      'Quarta-Feira',
      'Quinta-Feira',
      'Sexta-Feira',
      'Sábado'
    ],
    daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    daysMin: ['Do', '2ª', '3ª', '4ª', '5ª', '6ª', 'Sa'],
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    monthsShort: [
      'Jan',
      'Feb',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ],
    noEventForThisDay: 'Nenhum evento para este dia... então descanse!',
    allDay: 'Dia todo'
  }
}

const HELPER_FUNCTIONS = {
  isValidDate: function (d) {
    return d && !isNaN(d.getTime())
  },
  isLeapYear: function (cM, cY) {
    if (cM === 1) {
      if ((cY % 4 === 0 && cY % 100 !== 0) || cY % 400 === 0) {
        return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      } else {
        return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      }
    } else {
      return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    }
  },
  isToday: function (d, m, y) {
    var today = new Date()
    return (
      y === today.getFullYear() &&
      m === today.getMonth() &&
      d === today.getDate()
    )
  },
  getRGBAColor: function (color) {
    if (!color) return
    if (color.toLowerCase() === 'transparent') return [0, 0, 0, 0]
    if (color[0] === '#') {
      if (color.length < 7) {
        color =
          '#' +
          color[1] +
          color[1] +
          color[2] +
          color[2] +
          color[3] +
          color[3] +
          (color.length > 4 ? color[4] + color[4] : '')
      }
      return [
        parseInt(color.substr(1, 2), 16),
        parseInt(color.substr(3, 2), 16),
        parseInt(color.substr(5, 2), 16),
        color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1
      ]
    }
    if (color.indexOf('rgb') === -1) {
      var temp_elem = document.body.appendChild(
        document.createElement('fictum')
      )
      var flag = 'rgb(1, 2, 3)'
      temp_elem.style.color = flag
      if (temp_elem.style.color !== flag) return
      temp_elem.style.color = color
      if (temp_elem.style.color === flag || temp_elem.style.color === '') return
      color = getComputedStyle(temp_elem).color
      document.body.removeChild(temp_elem)
    }
    if (color.indexOf('rgb') === 0) {
      if (color.indexOf('rgba') === -1) color += ',1'
      return color.match(/[\.\d]+/g).map(function (a) {
        return +a
      })
    }
  },
  getFirstWeekDayOfMonth: function (cM, cY) {
    return new Date(cY, cM, 1).getDay()
  },
  getFormattedDate: function (date, format, lang) {
    var mm =
      date.getMonth() + 1 <= 9
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1
    var dd = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()

    format = format.replace('MMMM', TRANSLATIONS[lang].months[date.getMonth()])
    format = format.replace(
      'MMM',
      TRANSLATIONS[lang].monthsShort[date.getMonth()]
    )
    format = format.replace('MM', mm)
    format = format.replace('DD', dd)
    format = format.replace('dddd', TRANSLATIONS[lang].days[date.getDay()])
    format = format.replace('ddd', TRANSLATIONS[lang].daysShort[date.getDay()])
    format = format.replace('dd', TRANSLATIONS[lang].daysMin[date.getDay()])
    format = format.replace('YYYY', date.getFullYear())
    format = format.replace('YY', date.getFullYear().toString().substr(2))

    return format
  },
  getFormattedTime: function (date, format24h) {
    if (format24h) {
      var hours = date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()
      var minutes =
        date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()
      return `${hours}:${minutes}`
    } else {
      var time = date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      })
      return `${time}`
    }
  }
}

// -1 = ANIMATE CLOSING | 0 = NOTHING | 1 = ANIMATE OPENING.
let animatingSidebar = 0
let animatingDetail = 0

/******************
 * MAIN COMPONENT *
 ******************/
export default function RevoCalendar({
  style = {},
  events = [],
  highlightToday = true,
  lang = 'en',
  primaryColor = 'black',
  secondaryColor = 'white',
  accentColor = '#ddd',
  animationSpeed = 300,
  sidebarWidth = 180,
  detailWidth = 280,
  showDetailToggler = true,
  detailDefault = true,
  showSidebarToggler = true,
  sidebarDefault = true,
  onePanelAtATime = false,
  openDetailsOnDateSelection = true,
  timeFormat24 = true,
  detailDateFormat = 'DD/MM/YYYY',
  date = new Date(),
  getCurrentCalendarState = (date) => {},
  deleteEvent = (index) => {}
}) {
  // TRANSFORM ANY PASSED COLOR FORMAT INTO RGB.
  const primaryColorRGBA = `rgb(${
    HELPER_FUNCTIONS.getRGBAColor(primaryColor)[0]
  }, ${HELPER_FUNCTIONS.getRGBAColor(primaryColor)[1]}, ${
    HELPER_FUNCTIONS.getRGBAColor(primaryColor)[2]
  })`
  const secondaryColorRGBA = `rgb(${
    HELPER_FUNCTIONS.getRGBAColor(secondaryColor)[0]
  }, ${HELPER_FUNCTIONS.getRGBAColor(secondaryColor)[1]}, ${
    HELPER_FUNCTIONS.getRGBAColor(secondaryColor)[2]
  })`
  const accentColorRGBA = `rgb(${
    HELPER_FUNCTIONS.getRGBAColor(accentColor)[0]
  }, ${HELPER_FUNCTIONS.getRGBAColor(accentColor)[1]}, ${
    HELPER_FUNCTIONS.getRGBAColor(accentColor)[2]
  })`

  const calendarRef = useRef(null)

  // GET CALENDAR SIZE HOOK.
  function useCalendarSize() {
    const [size, setSize] = useState([0, 0, 0])
    useLayoutEffect(() => {
      function updateSize() {
        setSize([
          calendarRef.current.offsetWidth,
          calendarRef.current.scrollHeight,
          calendarRef.current.children[0].scrollHeight
        ])
      }
      window.addEventListener('resize', updateSize)
      updateSize()
      return () => window.removeEventListener('resize', updateSize)
    }, [calendarRef.current])
    return size
  }

  const [calendarWidth, calendarHeight, sidebarHeight] = useCalendarSize()

  // IF CALENDAR WIDTH CAN'T FIT BOTH PANELS, FORCE ONE PANEL AT A TIME.
  if (calendarWidth <= 320 + sidebarWidth + detailWidth) {
    onePanelAtATime = true
    // IF BOTH SIDEBAR AND DETAIL PANELS ARE SET TO BE OPEN BY DEFAULT, SIDEBAR WILL HAVE PRIORITY.
    if (sidebarDefault && detailDefault) {
      detailDefault = false
    }
  }

  // IN ORDER TO MAKE IT RESPONSIBLE, PANELS WILL FLOAT ON TOP OF CALENDAR ON LOW RES.
  const floatingPanels =
    calendarWidth <= 320 + sidebarWidth || calendarWidth <= 320 + detailWidth

  // IF, WITH THE CURRENT SETTING, THE SIDEBAR OR DETAIL PANELS WON'T FIT THE SCREEN, MAKE THEM SMALLER.
  sidebarWidth =
    calendarWidth < sidebarWidth + 40 ? calendarWidth - 40 : sidebarWidth
  detailWidth =
    calendarWidth < detailWidth + 40 ? calendarWidth - 40 : detailWidth

  // USE TODAY AS DEFAULT SELECTED DATE IF PASSED DATE IS INVALID.
  if (!HELPER_FUNCTIONS.isValidDate(date)) {
    console.log('The passed date prop is invalid')
    date = new Date()
  }

  // SET INITIAL STATE.
  const [currentDay, setDay] = useState(date.getDate())
  const [currentMonth, setMonth] = useState(date.getMonth())
  const [currentYear, setYear] = useState(date.getFullYear())

  const [sidebarOpen, setSidebarState] = useState(sidebarDefault)
  const [detailsOpen, setDetailsState] = useState(detailDefault)

  // GIVE PARENT COMPONENET THE CURRENT SELECTED CALENDAR DAY.
  useEffect(() => {
    getCurrentCalendarState({
      day: currentDay,
      month: currentMonth,
      year: currentYear
    })
  }, [currentDay, currentMonth, currentYear])

  /***********************
   * CALENDAR COMPONENTS *
   ***********************/
  function CalendarSidebar() {
    function prevYear() {
      setYear(currentYear - 1)
    }

    function nextYear() {
      setYear(currentYear + 1)
    }

    // MAKE SURE NO ANIMATION WILL RUN ON NEXT RE-RENDER.
    function animationEnd() {
      animatingSidebar = 0
    }

    function toggleSidebar() {
      animatingSidebar = sidebarOpen ? -1 : 1
      setSidebarState(!sidebarOpen)
      // FORCE DETAILS TO CLOSE IF onePanelAtATime IS true.
      if (animatingSidebar === 1 && onePanelAtATime && detailsOpen) {
        animatingDetail = -1
        setDetailsState(false)
      }
    }

    function ChevronButton({ angle, color, action }) {
      return (
        <button onClick={action}>
          <svg
            aria-hidden='true'
            focusable='false'
            width='1em'
            height='1em'
            style={{ transform: `rotate(${angle}deg)` }}
            preserveAspectRatio='xMidYMid meet'
            viewBox='0 0 8 8'
          >
            <path d='M1.5 1L0 2.5l4 4l4-4L6.5 1L4 3.5L1.5 1z' fill={color} />
            <rect x='0' y='0' width='8' height='8' fill='rgba(0, 0, 0, 0)' />
          </svg>
        </button>
      )
    }

    return (
      <Fragment>
        <div
          className={`${styles.sidebar}  ${
            animatingSidebar === 1 && styles.slideInLeft
          } ${animatingSidebar === -1 && styles.slideOutLeft} ${
            sidebarOpen ? styles.defaultOpen : styles.defaultClosed
          } ${floatingPanels ? styles.floating : ''}`}
          onAnimationEnd={animationEnd}
        >
          <div className={styles.yearSelect}>
            <ChevronButton
              angle={90}
              color={secondaryColorRGBA}
              action={prevYear}
            />
            <span>{currentYear}</span>
            <ChevronButton
              angle={270}
              color={secondaryColorRGBA}
              action={nextYear}
            />
          </div>
          <div>
            <ul>
              {TRANSLATIONS[lang].months.map((month, i) => {
                return (
                  <li key={i}>
                    <button
                      className={i === currentMonth ? styles.currentMonth : ''}
                      onClick={() => setMonth(i)}
                    >
                      {month}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        {showSidebarToggler && (
          <button
            onClick={toggleSidebar}
            className={`${styles.closeSidebar}  ${
              animatingSidebar === 1 && styles.sidebarTogglerSlideIn
            } ${animatingSidebar === -1 && styles.sidebarTogglerSlideOut} ${
              sidebarOpen ? styles.defaultOpen : styles.defaultClosed
            }`}
          >
            <svg width='24' height='24' viewBox='0 0 24 24'>
              <path
                fill={secondaryColorRGBA}
                d='M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z'
              />
            </svg>
          </button>
        )}
      </Fragment>
    )
  }

  function CalendarInner() {
    // GET LIST OF DAYS ON EACH MONTH ACCOUNTING FOR LEAP YEARS.
    const daysInMonths = HELPER_FUNCTIONS.isLeapYear(currentMonth, currentYear)

    let days = []
    for (let index = 1; index <= daysInMonths[currentMonth]; index++) {
      var isToday = HELPER_FUNCTIONS.isToday(index, currentMonth, currentYear)
      var highlight = isToday && highlightToday

      let day = (
        <button
          className={`${highlight ? styles.today : ''} ${
            index === currentDay ? styles.currentDay : ''
          }`}
          onClick={() => {
            setDay(index)
            if (openDetailsOnDateSelection && !detailsOpen) {
              animatingDetail = 1
              setDetailsState(true)
              // FORCE SIDEBAR TO CLOSE IF onePanelAtATime IS true.
              if (onePanelAtATime && sidebarOpen) {
                animatingSidebar = -1
                setSidebarState(false)
              }
            }
          }}
        >
          {index}
        </button>
      )
      days.push(day)
    }

    return (
      <div className={styles.inner}>
        <h1 className={styles.monthName}>
          {TRANSLATIONS[lang].months[currentMonth]}
        </h1>
        <div className={styles.scrollInner}>
          <div className={styles.dayNames}>
            {TRANSLATIONS[lang].daysShort.map((weekDay) => {
              return <div key={weekDay}>{weekDay.toUpperCase()}</div>
            })}
          </div>
          <div className={styles.days}>
            {days.map((day, i) => {
              return (
                <div
                  key={i}
                  className={styles.day}
                  style={
                    i === 0
                      ? {
                          gridColumnStart:
                            HELPER_FUNCTIONS.getFirstWeekDayOfMonth(
                              currentMonth,
                              currentYear
                            ) + 1
                        }
                      : {}
                  }
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  function CalendarDetails() {
    var selectedDate = new Date(currentYear, currentMonth, currentDay)

    // WILL SHOW DELETE EVENT BUTTON ON CURRENT showDelete INDEX. -1 WON'T SHOW ANYTHING
    const [showDelete, setDeleteState] = useState(-1)

    // MAKE SURE NO ANIMATION WILL RUN ON NEXT RE-RENDER.
    function animationEnd() {
      animatingDetail = 0
    }

    function toggleDetails() {
      animatingDetail = detailsOpen ? -1 : 1
      setDetailsState(!detailsOpen)
      // FORCE SIDEBAR TO CLOSE IF onePanelAtATime IS true.
      if (animatingDetail === 1 && onePanelAtATime && sidebarOpen) {
        animatingSidebar = -1
        setSidebarState(false)
      }
    }

    function toggleDeleteButton(i) {
      showDelete === i ? setDeleteState(-1) : setDeleteState(i)
    }

    let eventDivs = []
    for (let index = 0; index < events.length; index++) {
      var eventDate = new Date(events[index].date)

      // TAKE OUT TIME FROM PASSED TIMESTAMP IN ORDER TO COMPARE ONLY DATE
      var tempDate = new Date(events[index].date)
      tempDate.setHours(0, 0, 0, 0)

      if (
        HELPER_FUNCTIONS.isValidDate(eventDate) &&
        tempDate.getTime() === selectedDate.getTime()
      ) {
        let event = (
          <div
            key={index}
            className={styles.event}
            onClick={() => toggleDeleteButton(index)}
          >
            <p>{events[index].name}</p>
            <div>
              <div>
                <svg width='20' height='20' viewBox='0 0 24 24'>
                  <path
                    fill={primaryColorRGBA}
                    d='M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 12v-6h-2v8h7v-2h-5z'
                  />
                </svg>
                <span>
                  {events[index].allday
                    ? TRANSLATIONS[lang].allDay
                    : `${HELPER_FUNCTIONS.getFormattedTime(
                        eventDate,
                        timeFormat24
                      )}`}
                </span>
              </div>
              {events[index].extra && (
                <div>
                  <svg width='20' height='20' viewBox='0 0 24 24'>
                    <path
                      fill={primaryColorRGBA}
                      d={events[index].extra.icon}
                    ></path>
                  </svg>
                  <span>{events[index].extra.text}</span>
                </div>
              )}
            </div>
            {showDelete === index && (
              <button onClick={() => deleteEvent(index)}>Delete</button>
            )}
          </div>
        )
        eventDivs.push(event)
      }
    }

    // FOR NO-EVENT DAYS ADD NO EVENTS TEXT
    if (eventDivs.length === 0) {
      eventDivs.push(<p key={-1}>{TRANSLATIONS[lang].noEventForThisDay}</p>)
    }

    return (
      <Fragment>
        <div
          className={`${styles.detail}  ${
            animatingDetail === 1 && styles.slideInRight
          } ${animatingDetail === -1 && styles.slideOutRight} ${
            detailsOpen ? styles.defaultOpen : styles.defaultClosed
          } ${floatingPanels ? styles.floating : ''}`}
          onAnimationEnd={animationEnd}
        >
          <div className={styles.dateTitle}>
            {HELPER_FUNCTIONS.getFormattedDate(
              selectedDate,
              detailDateFormat,
              lang
            )}
          </div>
          <div className={styles.events}>
            {eventDivs.map((event) => {
              return event
            })}
          </div>
        </div>
        {showDetailToggler && (
          <button
            onClick={toggleDetails}
            className={`${styles.closeDetail}  ${
              animatingDetail === 1 && styles.detailsTogglerSlideIn
            } ${animatingDetail === -1 && styles.detailsTogglerSlideOut} ${
              detailsOpen ? styles.defaultOpen : styles.defaultClosed
            }`}
          >
            <svg width='24' height='24' viewBox='0 0 24 24'>
              <path
                fill={secondaryColorRGBA}
                d='M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z'
              />
            </svg>
          </button>
        )}
      </Fragment>
    )
  }

  /**************************
   * RENDER ACTUAL CALENDAR *
   **************************/
  return (
    <div className={styles.revoCalendar} ref={calendarRef} style={style}>
      <style>{`
        .${styles.revoCalendar} {
          --primaryColor: ${primaryColorRGBA};
          --primaryColor50: rgba(
            ${HELPER_FUNCTIONS.getRGBAColor(primaryColorRGBA)[0]},
            ${HELPER_FUNCTIONS.getRGBAColor(primaryColorRGBA)[1]},
            ${HELPER_FUNCTIONS.getRGBAColor(primaryColorRGBA)[2]},
            ${HELPER_FUNCTIONS.getRGBAColor(primaryColorRGBA)[3] / 2}
          );
          --secondaryColor: ${secondaryColorRGBA};
          --accentColor: ${accentColorRGBA};
          --animationSpeed: ${animationSpeed}ms;
          --sidebarWidth: ${sidebarWidth}px;
          --detailWidth: ${detailWidth}px;
          --minHeight: ${sidebarHeight}px;
        }
      `}</style>
      <CalendarSidebar />
      <CalendarInner />
      <CalendarDetails />
    </div>
  )
}
