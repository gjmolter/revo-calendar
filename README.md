# revo-calendar

![npm](https://img.shields.io/npm/dt/revo-calendar?style=flat-square)
![NPM](https://img.shields.io/npm/l/revo-calendar?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/revo-calendar?style=flat-square)


A modern-looking React Event Calendar component.

Very much inspired on [Evo Calendar](https://github.com/edlynvillegas/evo-calendar/). If you're not using React on your project, I recommend this calendar plugin that runs on jQuery.

## Demo 👀

Live Demo and Playground: [https://gjmolter.github.io/revo-calendar](https://gjmolter.github.io/revo-calendar)

## Install 📦

```bash
#NPM
npm i revo-calendar

#YARN
yarn add revo-calendar
```

## Usage ✍️

```jsx
//Import the component
import RevoCalendar from "revo-calendar";

const Index = () => {
  return <RevoCalendar {...props} />;
};
```

## Available Props 🎛️

| Prop                       | Type      | Default                                           | Description                                                                                                                                                  | Options                                                                                   |
| -------------------------- | --------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| events                     | array     | `[]`                                              | List of events to be added to the calendar                                                                                                                   | See detailed explanation below                                                            |
| date                       | Date      | `new Date()`                                      | Default current date                                                                                                                                         | Any JS Date object                                                                        |
| className                  | string    | `''`                                              | Adds extra CSS classes to the calendar                                                                                                                       | Any class name                                                                            |
| style                      | CSS-in-JS | `{}`                                              | Adds extra CSS using CSS-in-JS                                                                                                                               | Any CSS-in-JS                                                                             |
| highlightToday             | bool      | `true`                                            | If `true`, will show a ring around today's date on calendar                                                                                                  | `true` or `false`                                                                         |
| lang                       | string    | `'en'`                                            | Calendar's language                                                                                                                                          | `en`, `pt`, `fr`, `es`, `de`, `ru` or any other if custom `languages` is used             |
| primaryColor               | string    | `'#4F6995'`                                       | Background color for the side panels and text color for current month name                                                                                   | Hex, RGB, RGBA, CSS color name                                                            |
| secondaryColor             | string    | `'#4F6995'`                                       | Calendar background color and side panels text color                                                                                                         | Hex, RGB, RGBA, CSS color name                                                            |
| todayColor                 | string    | `'#4F6995'`                                       | Color of today's highlight ring (Will only be used if `highlightToday` is `true`                                                                             | Hex, RGB, RGBA, CSS color name                                                            |
| textColor                  | string    | `'#4F6995'`                                       | Text color for weekday names and day numbers                                                                                                                 | Hex, RGB, RGBA, CSS color name                                                            |
| indicatorColor             | string    | `'orange'`                                        | Text color for event indicator                                                                                                                               | Hex, RGB, RGBA, CSS color name                                                            |
| animationSpeed             | number    | `300`                                             | Speed in milliseconds for all transitions and animations                                                                                                     | Any number                                                                                |
| sidebarWidth               | number    | `180`                                             | Size in pixels of the left panel (month/year selection)                                                                                                      | Any number                                                                                |
| detailWidth                | number    | `280`                                             | Size in pixels of the right panel (current day's events)                                                                                                     | Any number                                                                                |
| showSidebarToggler         | bool      | `true`                                            | If `true`, will show left panel's toggling button                                                                                                            | `true` or `false`                                                                         |
| sidebarDefault             | bool      | `true`                                            | If `true`, will have left panel open by default                                                                                                              | `true` or `false`                                                                         |
| showDetailToggler          | bool      | `true`                                            | If `true`, will show right panel's toggling button                                                                                                           | `true` or `false`                                                                         |
| detailDefault              | bool      | `true`                                            | If `true`, will have right panel open by default                                                                                                             | `true` or `false`                                                                         |
| onePanelAtATime            | bool      | `false`                                           | If `true`, won't allow two panels to be open simultaneously                                                                                                  | `true` or `false`                                                                         |
| openDetailsOnDateSelection | bool      | `true`                                            | If `true`, will open right panel when date is selected                                                                                                       | `true` or `false`                                                                         |
| timeFormat24               | bool      | `true`                                            | If `true`, will display dates in 24H format instead of 12 (21:41 instead of 9:41 PM)                                                                         | `true` or `false`                                                                         |
| detailDateFormat           | string    | `'DD/MM/YYYY'`                                    | The way that current selected date will be displayed on right panel                                                                                          | Any string. See details below                                                             |
| languages                  | object    | translation object with `en`, `pt`, `es`, `fr`, `ru` and `de` | If the current supported languages are not enough or you want to modify one of the translations, you can add your own translations object. See details below |
| dateSelected               | function  | `date => {}`                                      | Use this function to get current selected date on your parent component                                                                                      | Any function that receives an object with `day`, `month` and `year` keys                  |
| eventSelected              | function  | `index => {}`                                     | Use this function to get clicked event's index                                                                                                               | Any function that receives a `number` parameter (event index on `events` array)           |
| allowDeleteEvent           | bool      | `false`                                           | If `true`, will display delete button when event is clicked                                                                                                  | `true` or `false`                                                                         |
| allowAddEvent              | bool      | `false`                                           | If `true`, will display add event button on right panel                                                                                                      | `true` or `false`                                                                         |
| addEvent                   | function  | `date => {}`                                      | Use this function to add Events to `events` array                                                                                                            | Any function that receives an object with `day`, `month` and `year` keys                  |
| deleteEvent                | function  | `index => {}`                                     | Use this function to delete events from the `events` array                                                                                                   | Any function that receives a `number` parameter (index to be deleted from `events` array) |

### events Prop

`events` should receive an array of event objects. Events have two mandatory parameters and two optionals

Event object:

| Key    | Type           | Mandatory | Descrition                                                                                                                                                                    |
| ------ | -------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name   | string         | ✔️        | Event name                                                                                                                                                                    |
| date   | unix timestamp | ✔️        | 13 character timestamp. Can be obtained from adding operator `+` before JS `Date` object.                                                                                     |
| allDay | bool           |           | If `true`, will ignore `Date` object's time and show `allDay` string from current language's translation object                                                               |
| extra  | object         |           | If exists, will add one extra event information next to time. The object needs to contain strings: `icon` and `text`. `icon` will be passed as an `svg` `path` `d` parameter. |

Example:

```js
var events = [
  {
    name: "Buyout",
    date: Date.now(),
    allDay: true,
  },
  {
    name: "Reservation",
    date: 1594422992000,
    extra: {
      icon: "M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09           4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z",
      text: "7 People",
    },
  },
];
```

The example's `extra.icon` will render this: ![person icon](https://cdn-std.droplr.net/files/acc_519625/A2Wdsw)

### languages Prop

You can create an object where each key is a language (key needs to match `lang` atribute), each language needs to have the keys: `days`, `daysShort`, `daysMin`, `months`, `monthsShort`, `noEventForThisDay` and `allDay`.

Here is an example of the Esperanto language:

```js
const translations = {
  esperanto: {
    days: ["Dimanĉo", ..."Sabato"],
    daysShort: ["Dim", ..."Sab"],
    daysMin: ["Di", ..."Sa"],
    months: ["Januaro", ..."Decembro"],
    monthsShort: ["Jan", ..."Dec"],
    noEventForThisDay: "Neniu evento por ĉi tiu tago ... do ripozu!",
    allDay: "Tuta tago",
    addEvent: "Aldoni eventon",
    delete: "Forigi",
    eventTime: "Tempo de evento",
    previousYear: "Pasintjare",
    nextYear: "Venonta jaro",
    toggleSidebar: "Baskulu flanka kolumno",
    toggleDetails: "Ŝaltu Detalojn",
  },
};
```

To render the calendar using custom `esperanto` language, pass the `translations` object and the key to `languages` and `lang` respectivelly.

Example:

```jsx
<RevoCalendar languages={translations} lang="esperanto" />
```

### detailDateFormat Prop

detailDateFormat can be any string, with the following placeholders being replaced:

| placeholder | replacement          | example  |
| ----------- | -------------------- | -------- |
| `MMMM`      | Full month name      | November |
| `MMM`       | Short month name     | Nov      |
| `MM`        | Month number         | 11       |
| `DD`        | Day number           | 18       |
| `nth`       | Ordinal day number   | 18th     |
| `dddd`      | Weekday name         | Thursday |
| `ddd`       | Short weekday name   | Thu      |
| `dd`        | Tiny weekday name    | Th       |
| `YYYY`      | Full year            | 1997     |
| `YY`        | Year's last 2 digits | 97       |

Example

```js
"MMM nth, YYYY" => "Nov 18th, 1997"
```

## License

MIT © [gjmolter](https://github.com/gjmolter)
