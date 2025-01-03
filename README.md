# Vantage Calendar

A modern, flexible and customizable event calendar built with JavaScript. This calendar provides a rich set of features for displaying and managing events, with support for multiple themes, responsive layouts, and extensive customization options.

> This project was forked from [Evo Calendar](https://edlynvillegas.github.io/evo-calendar/) by Edlyn Villegas. We extend our gratitude for the original work that formed the foundation for this enhanced version.

## Installation

### Using NPM
```bash
npm install vantage-calendar
```

### Using CDN
```html
<!-- Required Dependencies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/date-fns/2.30.0/date-fns.min.js"></script>

<!-- Vantage Calendar CSS and JS -->
<link rel="stylesheet" href="dist/vantage-calendar.min.css">
<script src="dist/vantage-calendar.min.js"></script>
```

## Basic Usage

```javascript
// Initialize calendar
const calendar = new VantageCalendar('#calendar', {
    theme: 'default',
    language: 'en',
    format: 'yyyy-MM-dd'
});

// Add events
calendar.addEvent([
    {
        id: '1',
        name: 'Meeting',
        date: '2024-12-13',
        type: 'meeting',
        color: '#4CAF50',
        shape: 'DIAMOND'
    }
]);
```

## Configuration Options

### Core Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| theme | string | 'default' | Calendar theme ('default', 'midnight-blue', 'royal-navy', 'orange-coral') |
| format | string | 'yyyy-MM-dd' | Date format for all dates |
| titleFormat | string | 'MMMM yyyy' | Format for calendar title |
| eventHeaderFormat | string | 'MMMM d, yyyy' | Format for event header dates |
| firstDayOfWeek | number | 0 | First day of week (0 = Sunday, 6 = Saturday) |
| language | string | 'en' | Calendar language |
| todayHighlight | boolean | true | Highlight today's date |
| sidebarDisplayDefault | boolean | true | Show sidebar by default |
| eventDisplayDefault | boolean | true | Show event list by default |
| sidebarToggler | boolean | true | Show sidebar toggler button |
| eventListToggler | boolean | true | Show event list toggler button |

# Event object:

| Key    | Type           | Mandatory | Description                                                                                                                                                                    |
| ------ | -------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name   | string         | ✔️        | Event name                                                                                                                                                                    |
| date   | unix timestamp | ✔️        | 13 character timestamp. Can be obtained from adding operator `+` before JS `Date` object.                                                                                     |
| allDay | bool           |           | If `true`, will ignore `Date` object's time and show `allDay` string from current language's translation object                                                               |
| extra  | object         |           | Optional metadata about the event including icon, text and color.                                                                                                             |

### Extra Object Properties:
| Key   | Type   | Description                                                                           |
|-------|--------|---------------------------------------------------------------------------------------|
| icon  | string | SVG path data or predefined shape constant from `SHAPE_ICONS`                         |
| text  | string | Additional text displayed next to the icon                                            |
| color | string | Color for the icon (Hex, RGB, RGBA or CSS color name). Defaults to `indicatorColor`   |

### Available Shape Icons
The following shapes are predefined and can be used as icon values:
- `CIRCLE`
- `SQUARE` 
- `TRIANGLE`
- `DIAMOND`
- `PENTAGON`

Example:

```js
import { SHAPE_ICONS } from 'revo-calendar';

var events = [
  {
    name: "Team Meeting",
    date: Date.now(),
    extra: {
      icon: SHAPE_ICONS.CIRCLE,
      text: "Virtual Meeting",
      color: "#4CAF50"
    }
  },
  {
    name: "Important Deadline",
    date: 1594422992000,
    extra: {
      // Custom SVG path
      icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
      text: "High Priority",
      color: "#f44336"
    }
  }
];

## API Methods

### Calendar Control
```javascript
// Set/change theme
calendar.setTheme('midnight-blue');

// Select specific date
calendar.dateController.selectDate('2024-12-25');

// Select month
calendar.monthController.selectMonth(11); // December

// Select year
calendar.yearController.selectYear(2024);
```

### Event Management
```javascript
// Add single event
calendar.addEvent({
    id: '1',
    name: 'Meeting',
    date: '2024-12-13'
});

// Add multiple events
calendar.addEvent([
    {
        id: '2',
        name: 'Holiday Party',
        date: '2024-12-25',
        type: 'holiday'
    },
    {
        id: '3',
        name: 'Birthday',
        date: '2024-12-31',
        type: 'birthday'
    }
]);

// Remove single event
calendar.removeEvent('1');

// Clear all events
calendar.events.clearEvents();

// Get all events
const events = calendar.events.getEvents();

// Get events for specific date
const dateEvents = calendar.events.getEventsForDate('2024-12-25');
```

### UI Control
```javascript
// Toggle sidebar
calendar.sidebar.toggle();

// Toggle event list
calendar.eventList.toggle();

// Refresh calendar view
calendar.refreshView();

// Destroy calendar instance
calendar.destroy();
```

## Events

### Calendar Events
```javascript
// Date selection
calendar.element.on('selectDate', (event, date) => {
    console.log('Selected date:', date);
});

// Month selection
calendar.element.on('selectMonth', (event, month, monthIndex) => {
    console.log('Selected month:', month, monthIndex);
});

// Year selection
calendar.element.on('selectYear', (event, year) => {
    console.log('Selected year:', year);
});

// Event selection
calendar.element.on('selectEvent', (event, calendarEvent) => {
    console.log('Selected event:', calendarEvent);
});

// Calendar initialization
calendar.element.on('init', (event, calendar) => {
    console.log('Calendar initialized');
});

// Calendar destruction
calendar.element.on('destroy', (event, calendar) => {
    console.log('Calendar destroyed');
});
```

## Themes

The calendar comes with four built-in themes:
- `default`: Clean, professional look with purple accents
- `midnight-blue`: Dark theme with blue accents
- `royal-navy`: Navy blue theme with gold accents
- `orange-coral`: Warm theme with orange gradients

### Custom Theming

You can customize the calendar's appearance by modifying the CSS variables defined in the theme files. The main variables are:

```css
:root {
    --primary-color: #8773c1;
    --primary-light: #a692e0;
    --primary-dark: #755eb5;
    --bg-color: #fbfbfb;
    --text-color: #5a5a5a;
    --border-color: #eaeaea;
    /* ... and more */
}
```

## Responsive Design

The calendar is fully responsive and adapts to different screen sizes:
- Desktop (>1024px): Full layout with sidebar and event list
- Tablet (768px-1024px): Collapsible sidebar and event list
- Mobile (<768px): Optimized mobile view with toggleable components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## License

MIT License - see LICENSE file for details

## Contributing

We welcome contributions! Please see our contributing guidelines for details.

## Support

For bug reports and feature requests, please use the GitHub issues tracker. For questions and discussions, join our community on GitHub Discussions.
