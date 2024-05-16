import moment from "moment";

export function dateFormat(datetimeString: string, displayType: "date" | "time" | "datetime" | "relative") {
  const momentDate = moment(datetimeString);

  switch (displayType) {
    case "date":
      return momentDate.format("YYYY-MM-DD");
    case "time":
      return momentDate.format("HH:mm:ss");
    case "datetime":
      return momentDate.format("YYYY-MM-DD HH:mm:ss");
    case "relative":
      return momentDate.fromNow();
    default:
      return "";
  }
}