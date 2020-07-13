import React, { useState } from 'react'

import RevoCalendar from 'revo-calendar'
import 'revo-calendar/dist/index.css'

const App = () => {
  function logCurrent(date) {
    console.log(`${date.day}/${date.month}/${date.year}`)
  }

  function deleteEvent(i) {
    var temp = events
    temp.splice(i)
    setEvents(temp)
  }

  var eventsList = [
    {
      name: 'Test Event',
      date: 1594422992000,
      allday: true
    },
    {
      name: 'Another Event',
      date: +new Date(),
      allday: false,
      extra: {
        icon:
          'M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z',
        text: '7 people'
      }
    }
  ]
  const [events, setEvents] = useState(eventsList)

  return (
    <RevoCalendar
      events={events}
      lang='pt'
      primaryColor={'#FF9040'}
      secondaryColor={'white'}
      accentColor={'#ddd'}
      getCurrentCalendarState={logCurrent}
      sidebarDefault={false}
      deleteEvent={deleteEvent}
      style={{
        borderRadius: '10px',
        border: '1px solid var(--accentColor)'
      }}
    />
  )
}

export default App
