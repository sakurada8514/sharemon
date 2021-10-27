import format from "date-fns/format";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, DatePickerProps } from "@material-ui/pickers";
import jaLocale from "date-fns/locale/ja";

class ExtendedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    return format(date, "yyyy MMM", { locale: this.locale });
  }
  getDatePickerHeaderText(date: Date) {
    return format(date, "MMMd日", { locale: this.locale });
  }
}

type MyDatePickerProps = {
  date: Date;
  setDate: DatePickerProps["onChange"];
  views: DatePickerProps["views"];
  format: DatePickerProps["format"];
  openTo: DatePickerProps["openTo"];
};

const MyDatePicker: React.FC<MyDatePickerProps> = ({
  date,
  setDate,
  views,
  format,
  openTo,
}) => {
  return (
    <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
      <DatePicker
        inputVariant="outlined"
        label="日付*"
        okLabel="決定"
        cancelLabel="キャンセル"
        value={date}
        onChange={setDate}
        format={format}
        animateYearScrolling
        fullWidth
        margin="normal"
        views={views}
        openTo={openTo}
        // error={typeof errors.regist_date !== "undefined"}
        // helperText={errors.regist_date}
      />
    </MuiPickersUtilsProvider>
  );
};
export default MyDatePicker;
