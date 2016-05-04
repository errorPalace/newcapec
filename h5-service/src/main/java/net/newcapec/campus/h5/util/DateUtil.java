package net.newcapec.campus.h5.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DateUtil {
	public static final String FORMAT_FULL = "yyyy-MM-dd HH:mm:ss";
	protected static final transient Logger logger = LoggerFactory
			.getLogger(DateUtil.class);
	public static final int YEAR_RETURN = 0;

	public static final int MONTH_RETURN = 1;

	public static final int DAY_RETURN = 2;

	public static final int HOUR_RETURN = 3;

	public static final int MINUTE_RETURN = 4;

	public static final int SECOND_RETURN = 5;

	private static long getBetween(Date beginDate, Date endDate,
			int returnPattern) throws java.text.ParseException {

		Calendar beginCalendar = Calendar.getInstance();
		Calendar endCalendar = Calendar.getInstance();
		beginCalendar.setTime(beginDate);
		endCalendar.setTime(endDate);
		switch (returnPattern) {
		case YEAR_RETURN:
			return DateUtil.getByField(beginCalendar, endCalendar,
					Calendar.YEAR);
		case MONTH_RETURN:
			return DateUtil.getByField(beginCalendar, endCalendar,
					Calendar.YEAR)
					* 12
					+ DateUtil.getByField(beginCalendar, endCalendar,
							Calendar.MONTH);
		case DAY_RETURN:
			return DateUtil.getTime(beginDate, endDate) / (24 * 60 * 60 * 1000);
		case HOUR_RETURN:
			return DateUtil.getTime(beginDate, endDate) / (60 * 60 * 1000);
		case MINUTE_RETURN:
			return DateUtil.getTime(beginDate, endDate) / (60 * 1000);
		case SECOND_RETURN:
			return DateUtil.getTime(beginDate, endDate) / 1000;
		default:
			return 0;
		}
	}

	private static long getByField(Calendar beginCalendar,
			Calendar endCalendar, int calendarField) {
		return endCalendar.get(calendarField)
				- beginCalendar.get(calendarField);
	}

	private static long getTime(Date beginDate, Date endDate) {
		return endDate.getTime() - beginDate.getTime();
	}

	public static String getBetween(Date date) throws ParseException {
		String result = "";
		Date currentDate = new Date();
		long count = DateUtil.getBetween(date, currentDate,
				DateUtil.MONTH_RETURN);
		if (count >= 12) {
			result = DateFormatUtils.format(date, "yy-MM-dd HH:mm");
		} else if (count >= 1) {
			result = count + "个月前";
		} else {
			count = DateUtil.getBetween(date, currentDate, DateUtil.DAY_RETURN);
			if (count >= 1) {
				result = count + "天前";
			} else {
				count = DateUtil.getBetween(date, currentDate,
						DateUtil.HOUR_RETURN);
				if (count >= 1) {
					result = count + "小时前";
				} else {
					count = DateUtil.getBetween(date, currentDate,
							DateUtil.MINUTE_RETURN);
					if (count >= 1) {
						result = count + "分钟前";
					} else {
						count = DateUtil.getBetween(date, currentDate,
								DateUtil.SECOND_RETURN);
						if (count >= 1) {
							result = count + "秒前";
						} else {
							result = "刚刚";
						}

					}
				}
			}
		}
		return result;
	}

	public static Date getStartTime() {
		Calendar todayStart = Calendar.getInstance();
		todayStart.set(Calendar.HOUR_OF_DAY, 0);
		todayStart.set(Calendar.MINUTE, 0);
		todayStart.set(Calendar.SECOND, 0);
		todayStart.set(Calendar.MILLISECOND, 0);

		return todayStart.getTime();
	}

	public static Date getEndTime() {
		Calendar todayEnd = Calendar.getInstance();
		todayEnd.set(Calendar.HOUR_OF_DAY, 23);
		todayEnd.set(Calendar.MINUTE, 59);
		todayEnd.set(Calendar.SECOND, 59);
		todayEnd.set(Calendar.MILLISECOND, 999);
		return todayEnd.getTime();
	}

	public static String getDateString(Date date, String format) {
		if (date == null) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}

	/**
	 * hour小时之前的时间
	 * 
	 * @param hour
	 * @return
	 */
	public static Date beforeHourToNowDate(int hour) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.HOUR_OF_DAY, calendar.get(Calendar.HOUR_OF_DAY)
				- hour);
		return calendar.getTime();
	}

	/**
	 * 年之后的时间
	 * 
	 * @param hour
	 * @return
	 */
	public static Date afterYearToNowDate(int year) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, calendar.get(Calendar.YEAR) + year);
		return calendar.getTime();
	}

	public static void main(String[] args) {
		System.out.println(afterYearToNowDate(1000));
		System.out.println(afterYearToNowDate(1000).getTime());
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(sdf.format(getStartTime()));
		System.out.println(sdf.format(getEndTime()));
		
		System.out.println(sdf.format(beforeHourToNowDate(500)));
	}
}
