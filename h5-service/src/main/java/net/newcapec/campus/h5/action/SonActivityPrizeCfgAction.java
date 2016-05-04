/**
 *
 */
package net.newcapec.campus.h5.action;

import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.entity.Prize;
import net.newcapec.campus.h5.entity.SonActivity;
import net.newcapec.campus.h5.entity.SonActivityPrizeCfg;
import net.newcapec.campus.h5.manager.*;
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
public class SonActivityPrizeCfgAction extends AbstractSimpleGridBaseAction<SonActivityPrizeCfg> {

    /**
     *
     */
    private static final long serialVersionUID = 6854339386948579847L;
    private PrizeManager prizeManager;
    private SonActivityManager sonActivityManager;
    private ActivityManager activityManager;
    private ActivityPrizeCfgManager activityPrizeCfgManager;

    @Override
    protected Serializable getObjectId(SonActivityPrizeCfg data) {
        return data.getId();
    }

    @Override
    protected int configPageSize() {
        return 15;
    }

    public SonActivityPrizeCfg getData() {
        return data;
    }

    public void setData(SonActivityPrizeCfg data) {
        this.data = data;
    }

    @Override
    protected JSONObject dataToJSONObject(SonActivityPrizeCfg data) {
        JSONObject jsonObject = super.dataToJSONObject(data);
        if (data.getCreateStamp() != null) {
            jsonObject.put("createStamp", DateFormatUtils.format(
                    data.getCreateStamp(), "yy-MM-dd HH:mm"));
        }
        if (data.getModifyStamp() != null) {
            jsonObject.put("modifyStamp", DateFormatUtils.format(
                    data.getModifyStamp(), "yy-MM-dd HH:mm"));
        }
        jsonObject.put("allotCount", String.valueOf(data.getAllotCount()));
        jsonObject.put("inCount", String.valueOf(data.getInCount()));
        jsonObject.put("surplusCount", String.valueOf(data.getSurplusCount()));
        SonActivity sonActivity = sonActivityManager.get(data.getSonActivityId());
        if (sonActivity != null) {
            jsonObject.put("sonActivityId", sonActivity.getName());
        }
        Prize prize = prizeManager.get(data.getPrizeId());
        if (prize != null) {
            jsonObject.put("prizeId", Prize.TYPE_MAP.get(prize.getType()) + "[" + prize.getName() + "]");
        }
        return jsonObject;
    }

    @Override
    protected void setAttributeOnManager() throws Exception {
        super.setAttributeOnManager();
        setAttribute("ACTIVITY", activityManager.findAllMap());
        setAttribute("PRIZE", prizeManager.findAllMap());
        setAttribute("SONACTIVITY", sonActivityManager.findAllMap());
    }

    @Override
    protected Collection<Condition> createConditions() throws Exception {
        Collection<Condition> conditions = new ArrayList<Condition>();
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
        setAttribute("PRIZE", prizeManager.findAllMap());
        setAttribute("SONACTIVITY", sonActivityManager.findAllMap());
        return SUCCESS;
    }

    @Override
    public String enterEdit() throws Exception {
        super.enterEdit();
        SonActivity sonActivity = sonActivityManager.get(data.getSonActivityId());
        if (sonActivity != null) {
            setAttribute("sonActivityId", sonActivity.getName());
        }
        Prize prize = prizeManager.get(data.getPrizeId());
        if (prize != null) {
            setAttribute("prizeId", Prize.TYPE_MAP.get(prize.getType()) + "[" + prize.getName() + "]");
        }
        return SUCCESS;
    }

    @Override
    public void add() throws Exception {
        List<SonActivityPrizeCfg> list = this.getManager().findByCondition(Conditions.eq("sonActivityId", this.data.getSonActivityId()), Conditions.eq("prizeId", this.data.getPrizeId()), Conditions.eq("enable", false));
        if (list != null && !list.isEmpty()) {
            ajaxOutPutText("ajax:失败：已经存在这个奖品的配置了！");
            return;
        }
        Operator operator = V3SecurityContext.getCurrentOperator();
        this.data.setCreateOperator(operator.getName());
        this.data.setCreateStamp(new Date());
        try {
            SonActivityPrizeCfgManager sonActivityPrizeCfgManager = (SonActivityPrizeCfgManager) getManager();
            String result = sonActivityPrizeCfgManager.saveEntity(this.data);
            ajaxOutPutText(result);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:增加失败！");
        }
    }

    @Override
    public void edit() throws Exception {
        SonActivityPrizeCfg entity = this.getManager().findById(this.data.getId());
        if (entity == null) {
            this.ajaxOutPutText("ajax:对象已经不存在，可能已经被删除！");
            return;
        }
        Operator operator = V3SecurityContext.getCurrentOperator();
        entity.setModifyOperator(operator.getName());
        entity.setModifyStamp(new Date());
        try {
            SonActivityPrizeCfgManager sonActivityPrizeCfgManager = (SonActivityPrizeCfgManager) getManager();
            String result = sonActivityPrizeCfgManager.updateEntity(entity, this.data);
            ajaxOutPutText(result);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:修改失败！");
        }
    }

    @Override
    public String view() throws Exception {
        super.view();
        SonActivity sonActivity = sonActivityManager.get(data.getSonActivityId());
        if (sonActivity != null) {
            setAttribute("sonActivityId", sonActivity.getName());
        }
        Prize prize = prizeManager.get(data.getPrizeId());
        if (prize != null) {
            setAttribute("prizeId", Prize.TYPE_MAP.get(prize.getType()) + "[" + prize.getName() + "]");
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
            List<SonActivityPrizeCfg> list = this.getManager().findById(ids);
            for (SonActivityPrizeCfg entity : list) {
                SonActivityPrizeCfgManager sonActivityPrizeCfgManager = (SonActivityPrizeCfgManager) getManager();
                String result = sonActivityPrizeCfgManager.updateDelete(entity);
                if (StringUtils.isNotBlank(result))
                    ajaxOutPutText(result);
            }
            ajaxOutPutText(SUCCESS);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:删除失败！");
        }
    }

    public void setActivityPrizeCfgManager(ActivityPrizeCfgManager activityPrizeCfgManager) {
        this.activityPrizeCfgManager = activityPrizeCfgManager;
    }

    public void setSonActivityManager(SonActivityManager sonActivityManager) {
        this.sonActivityManager = sonActivityManager;
    }


    public void setPrizeManager(PrizeManager prizeManager) {
        this.prizeManager = prizeManager;
    }


    public void setActivityManager(ActivityManager activityManager) {
        this.activityManager = activityManager;
    }
}
