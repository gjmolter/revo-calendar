import { CSS_COLORS, LEAP_MONTH_DAYS, REGULAR_MONTH_DAYS } from "./consts";

const helperFunctions = {
  isValidDate: function (d: Date): Date | boolean {
    return d && !isNaN(d.getTime());
  },
  isLeapYear: function (cY: number): number[] {
    if ((cY % 4 === 0 && cY % 100 !== 0) || cY % 400 === 0) {
      return LEAP_MONTH_DAYS;
    } else {
      return REGULAR_MONTH_DAYS;
    }
  },
  isToday: function (d: number, m: number, y: number): boolean {
    var today = new Date();
    return y === today.getFullYear() && m === today.getMonth() && d === today.getDate();
  },
  decomposeRGBA: function (color: string | null): number[] | null {
    if (!color) return null;
    if (color.toLowerCase() === "transparent") return [0, 0, 0, 0];
    if (color[0] === "#") {
      if (color.length < 7) {
        color =
          "#" +
          color[1] +
          color[1] +
          color[2] +
          color[2] +
          color[3] +
          color[3] +
          (color.length > 4 ? `${color[4]}${color[4]}` : "");
      }
      return [
        parseInt(color.substr(1, 2), 16),
        parseInt(color.substr(3, 2), 16),
        parseInt(color.substr(5, 2), 16),
        color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1,
      ];
    }
    if (color.indexOf("rgb") === -1) {
      if (CSS_COLORS[color]) {
        return helperFunctions.decomposeRGBA(CSS_COLORS[color]);
      }
    }
    if (color.indexOf("rgb") === 0) {
      if (color.indexOf("rgba") === -1) color += ",1";
      var rgbaItems = color.match(/[\.\d]+/g);
      if (rgbaItems != null) {
        return rgbaItems.map(function (a) {
          return +a;
        });
      }
    }
    return null;
  },
  getRGBColor: function (color: string): string {
    var rgba = this.decomposeRGBA(color);
    return rgba != null ? `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})` : "";
  },
  getRGBAColorWithAlpha: function (color: string, alpha: number): string {
    var rgba = this.decomposeRGBA(color);
    return rgba != null ? `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3] * alpha})` : "";
  },
  getFirstWeekDayOfMonth: function (cM: number, cY: number): number {
    return new Date(cY, cM, 1).getDay();
  },
  getNumberWithOrdinal: function (n: number): string {
    var s = ["th", "st", "nd", "rd"];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  },
  getFormattedDate: function (date: Date, format: string, lang: string, languages: object): string {
    var mm = date.getMonth() + 1 <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1).toString();
    var dd = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate().toString();
    var nth = this.getNumberWithOrdinal(date.getDate());

    format = format.replace("MMMM", languages[lang].months[date.getMonth()]);
    format = format.replace("MMM", languages[lang].monthsShort[date.getMonth()]);
    format = format.replace("MM", mm);
    format = format.replace("DD", dd);
    format = format.replace("nth", nth);
    format = format.replace("dddd", languages[lang].days[date.getDay()]);
    format = format.replace("ddd", languages[lang].daysShort[date.getDay()]);
    format = format.replace("dd", languages[lang].daysMin[date.getDay()]);
    format = format.replace("YYYY", date.getFullYear().toString());
    format = format.replace("YY", date.getFullYear().toString().substr(2));

    return format;
  },
  getFormattedTime: function (date: Date, format24h: boolean): string {
    if (format24h) {
      var hours = date.getHours() <= 9 ? "0" + date.getHours() : date.getHours();
      var minutes = date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes();
      return `${hours}:${minutes}`;
    } else {
      var time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return `${time}`;
    }
  },
};

export default helperFunctions;
