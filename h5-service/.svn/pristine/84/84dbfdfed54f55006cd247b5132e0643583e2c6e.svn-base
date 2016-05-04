/**
 *
 */
package net.newcapec.campus.h5.action;

import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.entity.Activity;
import net.newcapec.campus.h5.entity.ActivityLog;
import net.newcapec.campus.h5.entity.Prize;
import net.newcapec.campus.h5.entity.SonActivity;
import net.newcapec.campus.h5.manager.ActivityManager;
import net.newcapec.campus.h5.manager.PrizeManager;
import net.newcapec.campus.h5.manager.SonActivityManager;
import net.newcapec.v3.core.web.action.AbstractSimpleGridBaseAction;
import net.newcapec.v3.extend.orm.Condition;
import net.newcapec.v3.extend.orm.condition.Conditions;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

/**
 * @author 喻康
 * @version BanWordsAction.java 2014-11-14 上午11:06:49
 */
public class ActivityLogAction extends AbstractSimpleGridBaseAction<ActivityLog> {

    /**
     *
     */
    private static final long serialVersionUID = 6854339386948579847L;
    private ActivityManager activityManager;
    private SonActivityManager sonActivityManager;
    private PrizeManager prizeManager;

    @Override
    protected Serializable getObjectId(ActivityLog data) {
        return data.getId();
    }

    @Override
    protected int configPageSize() {
        return 15;
    }

    public ActivityLog getData() {
        return data;
    }

    public void setData(ActivityLog data) {
        this.data = data;
    }

    @Override
    protected JSONObject dataToJSONObject(ActivityLog data) {
        JSONObject jsonObject = super.dataToJSONObject(data);
        if (data.getCreateStamp() != null) {
            jsonObject.put("createStamp", DateFormatUtils.format(
                    data.getCreateStamp(), "yy-MM-dd HH:mm:ss"));
        }
        Activity activity = activityManager.get(data.getActivityId());
        if (activity != null) {
            jsonObject.put("activityId", activity.getName());
        }
        SonActivity sonActivity = sonActivityManager.get(data.getSonActivityId());
        if (sonActivity != null) {
            jsonObject.put("sonActivityId", sonActivity.getName());
        }
        if (data.getPrizeId() == null) {
            jsonObject.put("prizeId", "未中奖");
        } else {
            Prize prize = prizeManager.get(data.getPrizeId());
            if (prize != null) {
                jsonObject.put("prizeId", Prize.TYPE_MAP.get(prize.getType()) + ":" + prize.getName());
            }
        }
        return jsonObject;
    }

    @Override
    protected Collection<Condition> createConditions() throws Exception {
        Collection<Condition> conditions = new ArrayList<Condition>();
        String name = this.getParameter("name");
        if (StringUtils.isNotBlank(name)) {
            conditions.add(Conditions.eq("userName", name));
        }
        String mobile = this.getParameter("mobile");
        if (StringUtils.isNotBlank(mobile)) {
            conditions.add(Conditions.eq("mobile", mobile));
        }
        String activityId = this.getParameter("activityId");
        if (StringUtils.isNotBlank(activityId)) {
            conditions.add(Conditions.eq("activityId", Long.parseLong(activityId)));
        }
        String sonActivityId = this.getParameter("sonActivityId");
        if (StringUtils.isNotBlank(sonActivityId)) {
            conditions.add(Conditions.eq("sonActivityId", Long.parseLong(sonActivityId)));
        }
        String prizeId = this.getParameter("prizeId");
        if (StringUtils.isNotBlank(prizeId)) {
            conditions.add(Conditions.eq("prizeId", Long.parseLong(prizeId)));
        }
        String win = this.getParameter("win");
        if (StringUtils.isNotBlank(win)) {
            if ("1".equals(win)) {//中奖
                conditions.add(Conditions.isNotNull("prizeId"));
            } else if ("2".equals(win)) {//未中奖
                conditions.add(Conditions.isNull("prizeId"));
            }
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
        conditions.add(Conditions.desc("id"));
        return conditions;
    }

    @Override
    protected void setAttributeOnManager() throws Exception {
        super.setAttributeOnManager();
        setAttribute("ACTIVITY", activityManager.findAllMap());
        setAttribute("PRIZE", prizeManager.findAllMap());
        setAttribute("SONACTIVITY", sonActivityManager.findAllMap());
    }

    @Override
    public String view() throws Exception {
        super.view();
        Activity activity = activityManager.get(data.getActivityId());
        if (activity != null) {
            setAttribute("activityId", activity.getName());
        }
        SonActivity sonActivity = sonActivityManager.get(data.getSonActivityId());
        if (sonActivity != null) {
            setAttribute("sonActivityId", sonActivity.getName());
        }
        if (data.getPrizeId() != null) {
            Prize prize = prizeManager.get(data.getPrizeId());
            if (prize != null) {
                setAttribute("prizeId", Prize.TYPE_MAP.get(prize.getType()) + prize.getName());
            }
        }else{
            setAttribute("prizeId", "未中奖");
        }

        return SUCCESS;
    }

    public ActivityManager getActivityManager() {
        return activityManager;
    }

    public void setActivityManager(ActivityManager activityManager) {
        this.activityManager = activityManager;
    }

    public PrizeManager getPrizeManager() {
        return prizeManager;
    }

    public void setPrizeManager(PrizeManager prizeManager) {
        this.prizeManager = prizeManager;
    }

    public SonActivityManager getSonActivityManager() {
        return sonActivityManager;
    }

    public void setSonActivityManager(SonActivityManager sonActivityManager) {
        this.sonActivityManager = sonActivityManager;
    }
}
