package net.newcapec.campus.h5.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;

public class EdenTimeHelper {
	
	public static long second = 1000;  //1秒
	public static long minute = 60 * 1000;  //1分钟
	public static long hour = 60 * 60 * 1000;   //1小时
	public static long day = 24 * 60 * 60 * 1000;  //1天
	
	public static String toTimeString(long millis) {

		long span = System.currentTimeMillis() - millis;
		
		if(span<0){
			return "刚刚";
		}

		if (span < minute) {
			return span / second + "秒前";
		}

		if (span < hour) {
			return span / minute + "分钟前";
		}

		if (span < 24 * hour) {
			return span / hour + "小时前";
		}

		if (span < 30 * day) {
			return span / day + "天前";
		}

		if (span < 365 * day) {
			return EdenTimeHelper.a("MM-dd", millis);  //span / (30 * day) + "个月前";
		}

		return EdenTimeHelper.a("yyyy-MM-dd", millis);
	}
	


	public static String a(long arg6) {
		
		return toTimeString(arg6);
		
//        String v0 = null;
//        long v2 = System.currentTimeMillis() - arg6;
//        if(v2 < 60000) {
//            v0 = "1分钟前";
//        } else if (v2 < 3600000) {
//            v0 = v2 / 1000 / 60 + "分钟前";
//        } else {
//            Calendar v1 = Calendar.getInstance();
//            v1.setTimeInMillis(arg6);
//            Calendar v2_1 = Calendar.getInstance();
//            if(EdenTimeHelper.b(v1, v2_1)) {
//                if((EdenTimeHelper.c(v1, v2_1)) && (EdenTimeHelper.d(v1, v2_1))) {
//                    return EdenTimeHelper.a("今天 HH:mm", arg6);
//                }
//
//                if(EdenTimeHelper.a(v2_1, v1)) {
//                    return EdenTimeHelper.a("昨天 HH:mm", arg6);
//                }
//
//                if(!EdenTimeHelper.b(v2_1, v1)) {
//                    return v0;
//                }
//                v0 = EdenTimeHelper.a("MM-dd HH:mm", arg6);
//            } else {
//                v0 = EdenTimeHelper.a("yyyy-MM-dd HH:mm", arg6);
//            }
//        }
//        return v0;
    }

    public static String a(String arg1, long arg2) {
        return EdenTimeHelper.a(arg1, arg2, Locale.getDefault());
    }

    @Deprecated 
    public static boolean a(Calendar arg7, Calendar arg8) {
        int v4 = 2;
        int v2 = 6;
        int v6 = 5;
        boolean v0 = true;
        if(!EdenTimeHelper.b(arg7, arg8)) {
            if(arg7.get(v2) != 1) {
//                goto label_18;
            	return false;
            } else if (arg8.get(v2) != arg8.getMaximum(v2)) {
//                goto label_18;
            	return false;
            }
        } else if(EdenTimeHelper.c(arg7, arg8)) {
            if(arg7.get(v6) == arg8.get(v6) + 1) {
                return true;
            }
//            goto label_18;
            return false;
            
        } else {
            int v1 = arg7.get(v4);
            v2 = arg7.get(v6);
            int v3 = arg7.getActualMaximum(v6);
            v4 = arg8.get(v4);
            int v5 = arg8.get(v6);
            v6 = arg8.getActualMaximum(v6);
            if(v2 == 1) {
                if(v4 + 1 != v1) {
//                    goto label_18;
                	return false;
                } else if (v5 == v6) {
                } else {
//                    goto label_18;
                	return false;
                }
            } else if (v2 != v3 || v5 != 1) {
            } else if (v4 == v1 + 1) {
            } else {
//                goto label_18;
            	return false;
            }
        }
        return v0;
    }

    public static String getFuzzyTime(long arg4, boolean arg6) {
        return System.currentTimeMillis() - arg4 < 0 ? EdenTimeHelper.b(arg4, arg6) : EdenTimeHelper
                .c(arg4, arg6);
    }

    public static String a(String arg3, long arg4, Locale arg6) {
        return new SimpleDateFormat(arg3, arg6).format(Long.valueOf(arg4));
    }

    public static boolean a(long arg2, long arg4) {
        if(EdenTimeHelper.d(arg2, arg4) != 1) {
            return false;
        }
        return true;
    }

    public static boolean b(Calendar arg3, Calendar arg4) {
        if(arg3.get(1) != arg4.get(1)) {
            return false;
        }
        return true;
    }

    public static String b(long arg6, boolean arg8) {
        String v0_1;
        long v0 = arg6 - System.currentTimeMillis();
        if(v0 < 60000) {
            v0_1 = "马上";
        } else if(v0 < 3600000) {
            v0_1 = v0 / 1000 / 60 + "分钟后";
        } else {
            Calendar v1 = Calendar.getInstance();
            v1.setTimeInMillis(arg6);
            Calendar v2 = Calendar.getInstance();
            v0_1 = arg8 ? "(E) HH:mm" : " HH:mm";
            if(EdenTimeHelper.b(v1, v2)) {
                if((EdenTimeHelper.d(v1, v2)) && (EdenTimeHelper.c(v1, v2))) {
                    return EdenTimeHelper.a("今天" + v0_1, arg6);
                }
                if(EdenTimeHelper.a(System.currentTimeMillis(), arg6)) {
                    return EdenTimeHelper.a("明天" + v0_1, arg6);
                }
                return EdenTimeHelper.a("MM月dd日" + v0_1, arg6);
            }
            v0_1 = EdenTimeHelper.a("yyyy年MM月dd日" + v0_1, arg6);
        }
        return v0_1;
    }

    public static String b(long arg8) {
        String v0 = null;
        long v2 = System.currentTimeMillis() - arg8;
        if(v2 < 60000) {
            v0 = "1分钟前";
        } else if (v2 < 3600000) {
            v0 = v2 / 1000 / 60 + "分钟前";
        } else {
            Calendar v1 = Calendar.getInstance();
            v1.setTimeInMillis(arg8);
            Calendar v4 = Calendar.getInstance();
            if(!EdenTimeHelper.b(v1, v4)) {
                v0 = EdenTimeHelper.a("yyyy-MM-dd", arg8);
            } else if(v2 < 86400000) {
                v0 = EdenTimeHelper.c(v1.getTimeInMillis(), v4.getTimeInMillis()) + "小时前";
            } else if(EdenTimeHelper.a(v4, v1)) {
                v0 = "昨天";
            } else if(EdenTimeHelper.b(v4, v1)) {
                v0 = EdenTimeHelper.a("MM-dd", arg8);
            }
        }
        return v0;
    }

    public static boolean b(long arg2, long arg4) {
        boolean v0 = EdenTimeHelper.d(arg2, arg4) == -1 ? true : false;
        return v0;
    }

    public static boolean c(Calendar arg2, Calendar arg3) {
        boolean v0 = arg2.get(2) == arg3.get(2) ? true : false;
        return v0;
    }

    public static String c(long arg6, boolean arg8) {
        String v0_1;
        long v0 = System.currentTimeMillis() - arg6;
        if(v0 < 60000) {
            v0_1 = "刚刚";
        } else if(v0 < 3600000) {
            v0_1 = v0 / 1000 / 60 + "分钟前";
        } else {
            Calendar v1 = Calendar.getInstance();
            v1.setTimeInMillis(arg6);
            Calendar v2 = Calendar.getInstance();
            v0_1 = arg8 ? " E HH:mm" : " HH:mm";
            if(EdenTimeHelper.b(v1, v2)) {
                if((EdenTimeHelper.c(v1, v2)) && (EdenTimeHelper.d(v1, v2))) {
                    return EdenTimeHelper.a("今天" + v0_1, arg6);
                }

                if(EdenTimeHelper.b(System.currentTimeMillis(), arg6)) {
                    return EdenTimeHelper.a("昨天" + v0_1, arg6);
                }

                return EdenTimeHelper.a("MM月dd日" + v0_1, arg6);
            }
            v0_1 = EdenTimeHelper.a("yyyy年MM月dd日" + v0_1, arg6);
        }
        return v0_1;
    }

    public static int c(long arg4, long arg6) {
        return ((int)(Math.abs(arg4 - arg6) / 3600000));
    }

    public static String getSimpleDay(long arg6) {
        String v0 = null;
        Calendar v1 = Calendar.getInstance();
        v1.setTimeInMillis(arg6);
        Calendar v2 = Calendar.getInstance();
        if(EdenTimeHelper.b(v1, v2)) {
            if((EdenTimeHelper.c(v1, v2)) && (EdenTimeHelper.d(v1, v2))) {
                return EdenTimeHelper.a("HH:mm", arg6);
            }

            if(EdenTimeHelper.b(System.currentTimeMillis(), arg6)) {
                return "昨天";
            }

            if(!EdenTimeHelper.b(v2, v1)) {
                return v0;
            }
            v0 = EdenTimeHelper.a("MM-dd", arg6);
        } else {
            v0 = EdenTimeHelper.a("yyyy-MM-dd", arg6);
        }
        return v0;
    }

    public static boolean d(Calendar arg2, Calendar arg3) {
        boolean v0 = arg2.get(5) == arg3.get(5) ? true : false;
        return v0;
    }

    private static int d(long arg8, long arg10) {
        Calendar v0 = Calendar.getInstance();
        v0.setTimeInMillis(arg8);
        v0.set(11, 0);
        v0.set(12, 0);
        v0.set(13, 0);
        v0.set(14, 0);
        Calendar v1 = Calendar.getInstance();
        v1.setTimeInMillis(arg10);
        v1.set(11, 0);
        v1.set(12, 0);
        v1.set(13, 0);
        v1.set(14, 0);
        return ((int)(v0.getTimeInMillis() / 86400000 - v1.getTimeInMillis() / 86400000));
    }

    public static String getSimpleDaytime(long arg6) {
        String v0 = null;
        Calendar v1 = Calendar.getInstance();
        v1.setTimeInMillis(arg6);
        Calendar v2 = Calendar.getInstance();
        if(EdenTimeHelper.b(v1, v2)) {
            if((EdenTimeHelper.c(v1, v2)) && (EdenTimeHelper.d(v1, v2))) {
                return EdenTimeHelper.a("HH:mm", arg6);
            }

            if(EdenTimeHelper.b(System.currentTimeMillis(), arg6)) {
                return EdenTimeHelper.a("昨天 HH:mm", arg6);
            }

            if(!EdenTimeHelper.b(v2, v1)) {
                return v0;
            }
            v0 = EdenTimeHelper.a("MM-dd HH:mm", arg6);
        } else {
            v0 = EdenTimeHelper.a("yyyy-MM-dd HH:mm", arg6);
        }
        return v0;
    }
}
