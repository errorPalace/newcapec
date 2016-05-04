/**
 *
 */
package net.newcapec.campus.h5.action;

import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.entity.Activity;
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
public class ActivityAction extends AbstractSimpleGridBaseAction<Activity> {

    /**
     *
     */
    private static final long serialVersionUID = 6854339386948579847L;


    @Override
    protected Serializable getObjectId(Activity data) {
        return data.getId();
    }

    @Override
    protected int configPageSize() {
        return 15;
    }

    public Activity getData() {
        return data;
    }

    public void setData(Activity data) {
        this.data = data;
    }

    @Override
    protected JSONObject dataToJSONObject(Activity data) {
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
    public void add() throws Exception {
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
        Activity entity = this.getManager().findById(this.data.getId());
        if (entity == null) {
            this.ajaxOutPutText("ajax:对象已经不存在，可能已经被删除！");
            return;
        }
        entity.setInCount(this.data.getInCount());
        entity.setName(this.data.getName());
        entity.setDescription(this.data.getDescription());
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
    public void delete() throws Exception {
        try {
            String[] checkboxkeys = this.getParameter("checkboxkeys").split("\\,");
            Long[] ids = new Long[checkboxkeys.length];

            for (int count = 0; count < ids.length; ++count) {
                ids[count] = Long.decode(checkboxkeys[count]);
            }
            List<Activity> list = this.getManager().findById(ids);
            for (Activity entity : list) {
                entity.setEnable(true);
                getManager().update(entity);
            }
            ajaxOutPutText(SUCCESS);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:删除失败！");
        }
    }
    public void use() throws Exception {
        try {
            String[] checkboxkeys = this.getParameter("checkboxkeys").split("\\,");
            String use=this.getParameter("use");
            Long[] ids = new Long[checkboxkeys.length];

            for (int count = 0; count < ids.length; ++count) {
                ids[count] = Long.decode(checkboxkeys[count]);
            }
            List<Activity> list = this.getManager().findById(ids);
            for (Activity entity : list) {
                if("0".equals(use)){//开放抽奖
                    entity.setUse(false);
                }else{//关闭抽奖
                    entity.setUse(true);
                }
                getManager().update(entity);
            }
            ajaxOutPutText(SUCCESS);
        } catch (Exception e) {
            log.error(null, e);
            ajaxOutPutText("ajax:操作失败！");
        }
    }

}
