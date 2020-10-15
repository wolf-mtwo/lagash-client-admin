export class ReportUtils {

  constructor() {
    'ngInject';
  }

  get_months_range(times) {
    var start = this.get_start_time_date();
    var dates = [];
    for (let index = 0; index < times; index++) {
      dates.push(moment(start).subtract(index, 'months'));
    }
    return this.convert_date_to_months(dates);
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
          end: new Date(timestamp + milliseconds - 1),
          label: moment(timestamp).format('LL')
        }
    });
  }

  convert_date_to_months(dates) {
    return dates.map((date) => {
        return {
          start: moment(date).startOf('month'),
          end: moment(date).endOf('month'),
          label: moment(date).format('MMMM YYYY')
        }
    });
  }
}

