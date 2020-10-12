export class ReportUtils {

  constructor() {
    'ngInject';
  }

  get_dates_range(times) {
    var start = this.get_start_time_date();
    var dates = [];
    var milliseconds = this.get_day_milliseconds();
    for (let index = 0; index < times; index++) {
      dates.push(start.getTime() - (milliseconds * index));
    }
    return this.convert_timestamp_to_dates(dates);
  }

  get_start_time_date() {
    var start = new Date();
    start.setHours(0, 0, 0, 0);
    return start;
  }

  get_day_milliseconds() {
    return 86400 * 1000;
  }

  convert_timestamp_to_dates(timestamps) {
    var milliseconds = this.get_day_milliseconds();
    return timestamps.map((timestamp) => {
        return {
          start: new Date(timestamp),
          end: new Date(timestamp + milliseconds - 1)
        }
    });
  }
}
