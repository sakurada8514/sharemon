import format from "date-fns/format";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "@material-ui/pickers";
import jaLocale from "date-fns/locale/ja";

class ExtendedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
        return format(date, "yyyy MMM", { locale: this.locale });
    }
    getDatePickerHeaderText(date) {
        return format(date, "MMMd日", { locale: this.locale });
    }
}

export default function MyDatePicker(props) {
    return (
        <MuiPickersUtilsProvider utils={ExtendedUtils} locale={jaLocale}>
            <DatePicker
                label="日付*"
                okLabel="決定"
                cancelLabel="キャンセル"
                value={props.date}
                onChange={props.setDate}
                format="yyyy/MM/dd"
                animateYearScrolling
                fullWidth
                margin="normal"
            />
        </MuiPickersUtilsProvider>
    );
}
