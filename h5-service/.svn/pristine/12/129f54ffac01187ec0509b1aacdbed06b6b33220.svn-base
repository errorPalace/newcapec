package net.newcapec.campus.h5.manager;

import net.newcapec.v3.quartz.service.V3ScheduleService;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.SchedulerException;
import org.quartz.impl.JobDetailImpl;
import org.quartz.impl.triggers.CronTriggerImpl;

import java.text.ParseException;

/**
 * @author zz 2008-10-8 14:19:01
 * @version 1.00.000
 * @Title:Quartz管理类
 * @Description:
 * @Copyright:
 */
public class QuartzManager {
    //	private static Scheduler sf=(StdScheduler)ContextLoader.getCurrentWebApplicationContext().getBean("startQuertz");
//	private static Scheduler sf=null;
    private static String JOB_GROUP_NAME = "DEFAULT";
    private static String TRIGGER_GROUP_NAME = "DEFAULT";


    private static V3ScheduleService v3ScheduleService;

//	private final static Logger logger=LoggerFactory.getLogger(QuartzManager.class.getName());

    /**
     * 添加一个定时任务，使用默认的任务组名，触发器名，触发器组名
     *
     * @param jobName 任务名
     * @param job     任务
     * @param time    时间设置，参考quartz说明文档
     * @throws SchedulerException
     * @throws ParseException
     */
    public static void addJob(String jobName, Job job, String time)
            throws SchedulerException, ParseException {
        //System.out.println("增加job"+jobName);
//		Scheduler sched = sf;

        //是否存在同名job
//		JobDetail jobDetailOld=sf.getJobDetail(jobName,JOB_GROUP_NAME);
//		JobDetail jobDetailOld=sf.getJobDetail(new JobKey(jobName,JOB_GROUP_NAME));
        //不存在
//		if(jobDetailOld==null){

        if (!v3ScheduleService.jobExisting(jobName, JOB_GROUP_NAME)) {
//			JobDetail jobDetail = new JobDetail(jobName, JOB_GROUP_NAME, job.getClass());// 任务名，任务组，任务执行类
            JobDetailImpl jobDetail = new JobDetailImpl();
            jobDetail.setName(jobName);
            jobDetail.setGroup(JOB_GROUP_NAME);
            jobDetail.setJobClass(job.getClass());

            // 触发器
            CronTriggerImpl trigger = new CronTriggerImpl();// 触发器名,触发器组
            trigger.setName(jobName);
            trigger.setGroup(TRIGGER_GROUP_NAME);
            trigger.setCronExpression(time);// 触发器时间设定
//			sched.scheduleJob(jobDetail,trigger);
            v3ScheduleService.schedule(jobDetail, trigger);
//			// 启动
//			if(!sched.isShutdown())
//				sched.start();
//		}
        }
        //存在
//		if(jobDetailOld!=null){
//			logger.info("job名({})已存在！",jobName);
//		}
    }

    /**
     * @param jobName
     * @param job
     * @param jobDataMap
     * @param time
     * @throws SchedulerException
     * @throws ParseException
     * @author 景明超
     * 2012-3-23 下午05:13:31
     */
    public static void addJob(String jobName, Job job, JobDataMap jobDataMap, String time)
            throws SchedulerException, ParseException {
        //System.out.println("增加job"+jobName);
//		Scheduler sched = sf;

//		JobDetail jobDetail = new JobDetail(jobName, JOB_GROUP_NAME, job.getClass());// 任务名，任务组，任务执行类
        JobDetailImpl jobDetail = new JobDetailImpl();
        jobDetail.setName(jobName);
        jobDetail.setGroup(JOB_GROUP_NAME);
        jobDetail.setJobClass(job.getClass());
        jobDetail.setJobDataMap(jobDataMap);
        // 触发器
        CronTriggerImpl trigger = new CronTriggerImpl();// 触发器名,触发器组
        trigger.setName(jobName);
        trigger.setGroup(TRIGGER_GROUP_NAME);
        trigger.setCronExpression(time);// 触发器时间设定
//			sched.scheduleJob(jobDetail,trigger);
        v3ScheduleService.schedule(jobDetail, trigger);

//    	jobDetail.setJobDataMap(jobDataMap);
//		// 触发器
//		CronTrigger trigger = 
//			new CronTrigger(jobName, TRIGGER_GROUP_NAME);// 触发器名,触发器组
//		trigger.setCronExpression(time);// 触发器时间设定
//		sched.scheduleJob(jobDetail,trigger);
        // 启动
//		if(!sched.isShutdown()){
//			sched.start();
//		}
    }

    /**
     * 添加一个定时任务
     *
     * @param jobName          任务名
     * @param jobGroupName     任务组名
     * @param triggerName      触发器名
     * @param triggerGroupName 触发器组名
     * @param job              任务
     * @param time             时间设置，参考quartz说明文档
     * @throws SchedulerException
     * @throws ParseException
     */
    public static void addJob(String jobName, String jobGroupName,
                              String triggerName, String triggerGroupName,
                              Job job, String time)
            throws SchedulerException, ParseException {
//		Scheduler sched = sf;
//		JobDetail jobDetail = new JobDetail(jobName, jobGroupName, job.getClass());// 任务名，任务组，任务执行类
//		// 触发器
//		CronTrigger trigger = 
//			new CronTrigger(triggerName, triggerGroupName);// 触发器名,触发器组
//		trigger.setCronExpression(time);// 触发器时间设定
//		sched.scheduleJob(jobDetail,trigger);
        JobDetailImpl jobDetail = new JobDetailImpl();
        jobDetail.setName(jobName);
        jobDetail.setGroup(jobGroupName);
        jobDetail.setJobClass(job.getClass());

        // 触发器
        CronTriggerImpl trigger = new CronTriggerImpl();// 触发器名,触发器组
        trigger.setName(jobName);
        trigger.setGroup(jobGroupName);
        trigger.setCronExpression(time);// 触发器时间设定
        v3ScheduleService.schedule(jobDetail, trigger);
//		sched.scheduleJob(jobDetail,trigger);
//		if(!sched.isShutdown())
//			sched.start();
    }

    /**
     * 修改一个任务的触发时间(使用默认的任务组名，触发器名，触发器组名)
     *
     * @param jobName
     * @param time
     * @throws SchedulerException
     * @throws ParseException
     */
    public static void modifyJobTime(String jobName, String time)
            throws SchedulerException, ParseException {

//		Scheduler sched = sf;
//		Trigger trigger = sched.getTrigger(jobName,TRIGGER_GROUP_NAME);

        // 触发器
        CronTriggerImpl trigger = new CronTriggerImpl();// 触发器名,触发器组
        trigger.setName(jobName);
        trigger.setGroup(TRIGGER_GROUP_NAME);
        if (trigger != null) {
//			JobDetail jobDetail=sched.getJobDetail(jobName, JOB_GROUP_NAME);

//			JobDetail jobDetail=sched.getJobDetail(new JobKey(jobName, JOB_GROUP_NAME));
            JobDetailImpl nDetail = new JobDetailImpl();
            nDetail.setName(jobName);
            nDetail.setGroup(JOB_GROUP_NAME);
            removeJob(jobName);
//			CronTrigger trigger2=new CronTrigger(jobName, JOB_GROUP_NAME);
            CronTriggerImpl trigger2 = new CronTriggerImpl();// 触发器名,触发器组
            trigger2.setName(jobName);
            trigger2.setGroup(JOB_GROUP_NAME);
            trigger2.setCronExpression(time);
            v3ScheduleService.schedule(nDetail, trigger);
//			sched.scheduleJob(nDetail, trigger2);
//			if(sched.isShutdown()){
//				sched.start();
//			}
            //System.out.println("修改job"+jobName);
        }
    }

    /**
     * @param triggerName
     * @param triggerGroupName
     * @param time
     * @throws SchedulerException
     * @throws ParseException
     */
    public static void modifyJobTime(String triggerName, String triggerGroupName,
                                     String time)
            throws SchedulerException, ParseException {
//		Scheduler sched = sf;
//		Trigger trigger = sched.getTrigger(triggerName,triggerGroupName);
        v3ScheduleService.pauseTrigger(triggerName, triggerGroupName);
//		Trigger trigger = sched.getTrigger(new TriggerKey(triggerName,triggerGroupName));
        CronTriggerImpl trigger = new CronTriggerImpl();// 触发器名,触发器组
        trigger.setName(triggerName);
        trigger.setGroup(triggerGroupName);
        trigger.setCronExpression(time);
        v3ScheduleService.resumeTrigger(triggerName, triggerGroupName);
//		if(trigger != null){
//			CronTriggerImpl ct = (CronTriggerImpl)trigger;
//			// 修改时间
//			ct.setCronExpression(time);
//			// 重启触发器
////			sched.resumeTrigger(triggerName,triggerGroupName);
//			sched.resumeTrigger(new TriggerKey(triggerName,triggerGroupName));
//		}
    }

    /**
     * 移除一个任务(使用默认的任务组名，触发器名，触发器组名)
     *
     * @param jobName
     * @throws SchedulerException
     */
    public static void removeJob(String jobName)
            throws SchedulerException {

        v3ScheduleService.deleteJob(jobName, JOB_GROUP_NAME);
//		Scheduler sched = sf;
//		sched.pauseTrigger(jobName,TRIGGER_GROUP_NAME);// 停止触发器
//		sched.unscheduleJob(jobName,TRIGGER_GROUP_NAME);// 移除触发器
//		sched.deleteJob(jobName,JOB_GROUP_NAME);// 删除任务
//		sched.pauseTrigger(new TriggerKey(jobName,TRIGGER_GROUP_NAME));// 停止触发器
//		sched.unscheduleJob(new TriggerKey(jobName,TRIGGER_GROUP_NAME));// 移除触发器
//		sched.deleteJob(new JobKey(jobName,JOB_GROUP_NAME));// 删除任务
        //System.out.println("移除job"+jobName);
    }

    /**
     * 移除一个任务
     *
     * @param jobName
     * @param jobGroupName
     * @param triggerName
     * @param triggerGroupName
     * @throws SchedulerException
     */
    public static void removeJob(String jobName, String jobGroupName,
                                 String triggerName, String triggerGroupName)
            throws SchedulerException {
        v3ScheduleService.deleteJob(jobName, jobGroupName);
////		Scheduler sched = sf;
//		sched.pauseTrigger(new TriggerKey(triggerName,triggerGroupName));// 停止触发器
//		sched.unscheduleJob(new TriggerKey(triggerName,triggerGroupName));// 移除触发器
//		sched.deleteJob(new JobKey(jobName,jobGroupName));// 删除任务
    }

    /**
     * 将格式为HH:mm:ss的时间转为 每天的cron表达式
     *
     * @param time
     * @return
     * @author 景明超
     * 2011-11-21 下午02:38:47
     */
    public static String convertToCronTime(String time) {
        String[] times = time.split(":");
        String h = times[0];
        String m = times[1];
        String s = times[2];
        StringBuffer sb = new StringBuffer();
        sb.append(Integer.valueOf(s));
        sb.append(" ").append(Integer.valueOf(m));
        sb.append(" ").append(Integer.valueOf(h));
        sb.append(" * * ?");
        return sb.toString();
    }

    /**
     * 将格式为<b>yyyy年MM月dd日HH时mm分 或  yyyy-MM-dd HH:mm</b>的时间转为 对应的cron表达式
     *
     * @param time
     * @return
     * @author 景明超
     * 2012-3-23 下午03:34:19
     */
    public static String convertDateToCronTime(String time) {
        StringBuffer sb = new StringBuffer();

        String year = time.substring(0, 4);
        String month = time.substring(5, 7);
        String day = time.substring(8, 10);
        String hour = time.substring(11, 13);
        String min = time.substring(14, 16);
        sb.append("0 ").append(Integer.parseInt(min))
                .append(" ").append(Integer.parseInt(hour))
                .append(" ").append(Integer.parseInt(day))
                .append(" ").append(Integer.parseInt(month))
                .append(" ? ").append(year);
        return sb.toString();
    }

    /**
     * @param scheduleService the v3ScheduleService to set
     */
    public void setV3ScheduleService(V3ScheduleService scheduleService) {
        v3ScheduleService = scheduleService;
    }
}


