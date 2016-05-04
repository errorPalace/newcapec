/**
 *
 */
package net.newcapec.campus.h5.action;

import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.Job.PrizePoolJob;
import net.newcapec.campus.h5.entity.Activity;
import net.newcapec.campus.h5.entity.SonActivity;
import net.newcapec.campus.h5.manager.ActivityManager;
import net.newcapec.campus.h5.manager.QuartzManager;
import net.newcapec.v3.core.common.Operator;
import net.newcapec.v3.core.web.action.AbstractSimpleGridBaseAction;
import net.newcapec.v3.extend.orm.Condition;
import net.newcapec.v3.extend.orm.condition.Conditions;
import net.newcapec.v3.extend.security.V3SecurityContext;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.quartz.JobDataMap;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * @author 喻康
 * @version BanWordsAction.java 2014-11-14 上午11:06:49
 */
public class SonActivityAction extends AbstractSimpleGridBaseAction<SonActivity> {

    /**
     *
     */
    private static final long serialVersionUID = 6854339386948579847L;
    private ActivityManager activityManager;

    @Override
    protected Serializable getObjectId(SonActivity data) {
        return data.getId();
    }

    @Override
    protected int configPageSize() {
        return 15;
    }

    public SonActivity getData() {
        return data;
    }

    public void setData(SonActivity data) {
        this.data = data;
    }

    @Override
    protected JSONObject dataToJSONObject(SonActivity data) {
        JSONObject jsonObject = super.dataToJSONObject(data);
        if (data.getCreateStamp() != null) {
            jsonObject.put("createStamp", DateFormatUtils.format(
                    data.getCreateStamp(), "yy-MM-dd HH:mm"));
        }
        if (data.getModifyStamp() != null) {
            jsonObject.put("modifyStamp", DateFormatUtils.format(
                    data.getModifyStamp(), "yy-MM-dd HH:mm"));
        }
        if (data.getStartStamp() != null) {
            jsonObject.put("startStamp", DateFormatUtils.format(
                    data.getStartStamp(), "yy-MM-dd HH:mm:ss"));
        }
        if (data.getEndStamp() != null) {
            jsonObject.put("endStamp", DateFormatUtils.format(
                    data.getEndStamp(), "yy-MM-dd HH:mm:ss"));
        }
        Activity activity = activityManager.get(data.getActivityId());
        if (activity != null) {
            jsonObject.put("activityId", activity.getName());
        }
        jsonObject.put("inCount", String.valueOf(data.getInCount()));
        jsonObject.put("count", String.valueOf(data.getCount()));
        jsonObject.put("takeCount", String.valueOf(data.getTakeCount()));
        return jsonObject;
    }

    @Override
    protected Collection<Condition> createConditions() throws Exception {
        Collection<Condition> conditions = new ArrayList<Condition>();
        String name = this.getParameter("name");
        if (StringUtils.isNotBlank(name)) {
            conditions.add(Conditions.eq("name", name));
        }
        String createBeginDate = this.getParameter("createBeginDate");
        if (StringUtils.isNotBlank(createBeginDate)) {
            conditions
                    .add(Conditions
                            .ge("createStamp",
                                    net.newcapec.v3.commons.lang.DateFormatUtils.FULL_SIMPLE_DATE_STALY
                                            .parseObject(createBeginDate)));
        }
        String createEndDate = this.getParameter("createEndDate");
        if (StringUtils.isNotBlank(createEndDate)) {
            conditions
                    .add(Conditions
                            .le("createStamp",
                                    net.newcapec.v3.commons.lang.DateFormatUtils.FULL_SIMPLE_DATE_STALY
                                            .parseObject(createEndDate)));
        }
        conditions.add(Conditions.eq("enable", false));
        conditions.add(Conditions.desc("id"));
        return conditions;
    }

    @Override
    public String enterAdd() throws Exception {
        super.enterAdd();
        setAttribute("ACTIVITY", activityManager.findAllMap());
        return SUCCESS;
    }

    @Override
    public String enterEdit() throws Exception {
        super.enterEdit();
        Activity activity = activityManager.get(data.getActivityId());
        if (activity != null) {
            setAttribute("activityId", activity.getName());
        }
        return SUCCESS;
    }

    @Override
    public void add() throws Exception {
        long dataStart = data.getStartStamp().getTime();
        long dataEnd = data.getEndStamp().getTime();
        Activity activity = activityManager.get(this.data.getActivityId());
        if ((dataStart >= activity.getStartStamp().getTime() && dataStart <= activity.getEndStamp().getTime()) && (dataEnd >= activity.getStartStamp().getTime() && dataEnd <= activity.getEndStamp().getTime())) {
            List<SonActivity> list = this.getManager().findByCondition(Conditions.eq("activityId", this.data.getActivityId()), Conditions.eq("enable", false));
            if (list != null && !list.isEmpty()) {
                for (SonActivity entity : list) {
                    long entityStart = entity.getStartStamp().getTime();
                    long entityEnd = entity.getEndStamp().getTime();
                    if ((dataStart >= entityStart && dataStart <= entityEnd) || (dataEnd >= entityStart && dataEnd <= entityEnd)) {
                        ajaxOutPutText("ajax:这个时间段已经存在举办活动！");
                        return;
                    }
                }
            }
        } else {
            ajaxOutPutText("ajax:超出活动举办时间！");
            return;
        }
        Operator operator = V3SecurityContext.getCurrentOperator();
        this.data.setCreateOperator(operator.getName());
        this.data.setCreateStamp(new Date());
        try {
            SonActivity entity = getManager().save(this.data);
            if (entity != null)
                addJob(entity);
            ajaxOutPutText(SUCCESS);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:增加失败！");
        }
    }

    @Override
    public void edit() throws Exception {
        SonActivity entity = this.getManager().findById(this.data.getId());
        if (entity == null) {
            this.ajaxOutPutText("ajax:对象已经不存在，可能已经被删除！");
            return;
        }
        entity.setInCount(this.data.getInCount());
        entity.setName(this.data.getName());
        entity.setTakeCount(this.data.getTakeCount());
        Operator operator = V3SecurityContext.getCurrentOperator();
        entity.setModifyOperator(operator.getName());
        entity.setModifyStamp(new Date());
        try {
            entity = getManager().update(entity);
       /*     if (entity != null)
                addJob(entity);*/
            ajaxOutPutText(SUCCESS);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:修改失败！");
        }
    }

    @Override
    public String view() throws Exception {
        super.view();
        Activity activity = activityManager.get(data.getActivityId());
        if (activity != null) {
            setAttribute("activityId", activity.getName());
        }
        return SUCCESS;
    }

    @Override
    public void delete() throws Exception {
        try {
            String[] checkboxkeys = this.getParameter("checkboxkeys").split("\\,");
            Long[] ids = new Long[checkboxkeys.length];

            for (int count = 0; count < ids.length; ++count) {
                ids[count] = Long.decode(checkboxkeys[count]);
            }
            List<SonActivity> list = this.getManager().findById(ids);
            for (SonActivity entity : list) {
                entity.setEnable(true);
                SonActivity entity1= getManager().update(entity);
                if (entity1 != null)
                    QuartzManager.removeJob(String.valueOf(entity.getId()));
            }
            ajaxOutPutText(SUCCESS);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:删除失败！");
        }
    }

    /**
     * 发布定时任务
     *
     * @param entity
     */
    private void addJob(SonActivity entity) {
        if(entity.getStartStamp().getTime()<System.currentTimeMillis()){
            return;
        }
        Long start = entity.getStartStamp().getTime() - (PrizePoolJob.time * 1000);
        Date date = null;
        if (start > System.currentTimeMillis()) {
            date = new Date(start);
        } else {
            date = new Date(System.currentTimeMillis()+60000);
        }
        String time = QuartzManager.convertDateToCronTime(DateFormatUtils.format(
                date, "yyyy-MM-dd HH:mm"));
        try {
            JobDataMap map=new JobDataMap();
            map.put("sonActivityId",entity.getId());
            QuartzManager.addJob(String.valueOf("Activity:"+entity.getId()), new PrizePoolJob(),map, time);
        } catch (Exception e) {
            log.error("奖池定时初始化任务失败", e);
        }
    }

    public void setActivityManager(ActivityManager activityManager) {
        this.activityManager = activityManager;
    }
}
