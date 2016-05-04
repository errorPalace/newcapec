package net.newcapec.campus.quickaccess.utils;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by skyline on 2015/12/15.
 */
public class LoggerUtils {
    private static final Logger logger = LoggerFactory.getLogger(LoggerUtils.class);

    public static Logger getLogger(){
        return logger;
    }

    private static void writeNormalLog(String logLevel, Logger logger, String outid, String customerCode, String logContext) {
        switch (logLevel) {
            case "ERROR":
                logger.error("[outid:{}-customerCode:{}] - {}", outid, customerCode, logContext);
                break;
            case "INFO":
                logger.info("[outid:{}-customerCode:{}] - {}", outid, customerCode, logContext);
                break;
            default:
                logger.info("[outid:{}-customerCode:{}] - {}", outid, customerCode, logContext);
                break;
        }
    }

    /**
     * 统一记录日志，级别：INFO，此方法用来设置日志的格式：[outId:{}-customerCode:{}] - log context ..
     *
     * @param logger       logger对象
     * @param outid        必传，学工号
     * @param customerCode 必传 ，学校编码
     * @param logContext   日志信息
     */
    public static void info(Logger logger, String outid, String customerCode, String logContext) {
        writeNormalLog("INFO", logger, outid, customerCode, logContext);
    }

    /**
     * 统一记录日志，级别：INFO，此方法用来设置日志的格式：[outId:{}-customerCode:{}] - log context ..
     *
     * @param outid        必传，学工号
     * @param customerCode 必传 ，学校编码
     * @param logContext   日志信息
     */
    public static void info(String outid, String customerCode, String logContext) {
        info(logger, outid, customerCode, logContext);
    }

    /**
     * 统一记录日志，级别：ERROR，此方法用来设置日志的格式：[outId:{}-customerCode:{}] - log context ..
     *
     * @param logger       logger对象
     * @param outid        必传，学工号
     * @param customerCode 必传 ，学校编码
     * @param logContext   日志信息
     */
    public static void error(Logger logger, String outid, String customerCode, String logContext) {
        writeNormalLog("ERROR", logger, outid, customerCode, logContext);
    }

    /**
     * 统一记录日志，级别：ERROR，此方法用来设置日志的格式：[outId:{}-customerCode:{}] - log context ..
     *
     * @param outid        必传，学工号
     * @param customerCode 必传 ，学校编码
     * @param logContext   日志信息
     */
    public static void error(String outid, String customerCode, String logContext) {
        error(logger, outid, customerCode, logContext);
    }
}
