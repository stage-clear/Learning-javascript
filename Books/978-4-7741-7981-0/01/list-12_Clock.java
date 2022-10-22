package greetingmodel;

import java.util.Calendar;

class Clock
{
  private Calendar calendar;
  
  Clock ()
  {
    this.calendar = Calendar.getInstance();
  }
  
  String ampm ()
  {
    int hour = calendar.get(Calendar.HOUR_OF_DAY);
    if (hour <= 12) return "am";
    return "pm";
  }
}
