/**
 *
 */
package net.newcapec.campus.h5.action;

import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.entity.Activity;
import net.newcapec.campus.h5.entity.ActivityPrizeCfg;
import net.newcapec.campus.h5.entity.Prize;
import net.newcapec.campus.h5.manager.ActivityManager;
import net.newcapec.campus.h5.manager.PrizeManager;
import net.newcapec.v3.core.common.Operator;
import net.newcapec.v3.core.web.action.AbstractSimpleGridBaseAction;
import net.newcapec.v3.extend.orm.Condition;
import net.newcapec.v3.extend.orm.condition.Conditions;
import net.newcapec.v3.extend.security.V3SecurityContext;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * @author 喻康
 * @version BanWordsAction.java 2014-11-14 上午11:06:49
 */
public class ActivityPrizeCfgAction extends AbstractSimpleGridBaseAction<ActivityPrizeCfg> {

    /**
     *
     */
    private static final long serialVersionUID = 6854339386948579847L;
    private ActivityManager activityManager;
    private PrizeManager prizeManager;

    @Override
    protected Serializable getObjectId(ActivityPrizeCfg data) {
        return data.getId();
    }

    @Override
    protected int configPageSize() {
        return 15;
    }

    public ActivityPrizeCfg getData() {
        return data;
    }

    public void setData(ActivityPrizeCfg data) {
        this.data = data;
    }

    @Override
    protected JSONObject dataToJSONObject(ActivityPrizeCfg data) {
        JSONObject jsonObject = super.dataToJSONObject(data);
        if (data.getCreateStamp() != null) {
            jsonObject.put("createStamp", DateFormatUtils.format(
                    data.getCreateStamp(), "yy-MM-dd HH:mm"));
        }
        if (data.getModifyStamp() != null) {
            jsonObject.put("modifyStamp", DateFormatUtils.format(
                    data.getModifyStamp(), "yy-MM-dd HH:mm"));
        }
        jsonObject.put("count", String.valueOf(data.getCount()));
        jsonObject.put("winCount", String.valueOf(data.getWinCount()));
        jsonObject.put("allotCount", String.valueOf(data.getAllotCount()));
        Activity activity = activityManager.get(data.getActivityId());
        if (activity != null) {
            jsonObject.put("activityId", activity.getName());
        }
        Prize prize = prizeManager.get(data.getPrizeId());
        if (prize != null) {
            jsonObject.put("prizeId", Prize.TYPE_MAP.get(prize.getType()) + "[" + prize.getName() + "]");
        }
        return jsonObject;
    }


    @Override
    protected Collection<Condition> createConditions() throws Exception {
        Collection<Condition> conditions = new ArrayList<Condition>();
        String activityId = this.getParameter("activityId");
        if (StringUtils.isNotBlank(activityId)) {
            conditions.add(Conditions.eq("activityId", Long.parseLong(activityId)));
        }
        String prizeId = this.getParameter("prizeId");
        if (StringUtils.isNotBlank(prizeId)) {
            conditions.add(Conditions.eq("prizeId", Long.parseLong(prizeId)));
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
    protected void setAttributeOnManager() throws Exception {
        super.setAttributeOnManager();
        setAttribute("ACTIVITY", activityManager.findAllMap());
        setAttribute("PRIZE", prizeManager.findAllMap());
    }

    @Override
    public String enterAdd() throws Exception {
        super.enterAdd();
        setAttribute("ACTIVITY", activityManager.findAllMap());
        setAttribute("PRIZE", prizeManager.findAllMap());
        return SUCCESS;
    }

    @Override
    public String enterEdit() throws Exception {
        super.enterEdit();
        Activity activity = activityManager.get(data.getActivityId());
        if (activity != null) {
            setAttribute("activityId", activity.getName());
        }
        Prize prize = prizeManager.get(data.getPrizeId());
        if (prize != null) {
            setAttribute("prizeId", prize.getName());
            setAttribute("prizeType", Prize.TYPE_MAP.get(prize.getType()));
        }
        return SUCCESS;
    }

    @Override
    public void add() throws Exception {
        List<ActivityPrizeCfg> list = this.getManager().findByCondition(Conditions.eq("activityId", this.data.getActivityId()), Conditions.eq("prizeId", this.data.getPrizeId()), Conditions.eq("enable", false));
        if (list != null && !list.isEmpty()) {
            ajaxOutPutText("ajax:已经存在这个奖品的配置了！");
            return;
        }
        Operator operator = V3SecurityContext.getCurrentOperator();
        this.data.setCreateOperator(operator.getName());
        this.data.setCreateStamp(new Date());
        try {
            getManager().save(this.data);
            ajaxOutPutText(SUCCESS);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:增加失败！");
        }
    }

    @Override
    public void edit() throws Exception {
        ActivityPrizeCfg entity = this.getManager().findById(this.data.getId());
        if (entity == null) {
            this.ajaxOutPutText("ajax:对象已经不存在，可能已经被删除！");
            return;
        }
        if (this.data.getCount() < entity.getAllotCount()) {
            this.ajaxOutPutText("ajax:总数不能小于已分配数！");
            return;
        }
        entity.setCount(this.data.getCount());
        Operator operator = V3SecurityContext.getCurrentOperator();
        entity.setModifyOperator(operator.getName());
        entity.setModifyStamp(new Date());
        try {
            getManager().update(entity);
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
        Prize prize = prizeManager.get(data.getPrizeId());
        if (prize != null) {
            setAttribute("prizeId", prize.getName());
            setAttribute("prizeType", Prize.TYPE_MAP.get(prize.getType()));
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
            List<ActivityPrizeCfg> list = this.getManager().findById(ids);
            for (ActivityPrizeCfg entity : list) {
                if (entity.getAllotCount()>0||entity.getWinCount()>0) {
                    ajaxOutPutText("ajax:奖品已经分发出去了，不能删除！");
                    return;
                }
                entity.setEnable(true);
                getManager().update(entity);
            }
            ajaxOutPutText(SUCCESS);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:删除失败！");
        }
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
}
