/**
 *
 */
package net.newcapec.campus.h5.action;

import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.entity.Program;
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
public class ProgramAction extends AbstractSimpleGridBaseAction<Program> {

    /**
     *
     */
    private static final long serialVersionUID = 6854339386948579847L;

    @Override
    protected Serializable getObjectId(Program data) {
        return data.getId();
    }

    @Override
    protected int configPageSize() {
        return 15;
    }

    public Program getData() {
        return data;
    }

    public void setData(Program data) {
        this.data = data;
    }

    @Override
    protected JSONObject dataToJSONObject(Program data) {
        JSONObject jsonObject = super.dataToJSONObject(data);
        if (data.getCreateStamp() != null) {
            jsonObject.put("createStamp", DateFormatUtils.format(
                    data.getCreateStamp(), "yy-MM-dd HH:mm:ss"));
        }
        jsonObject.put("count", String.valueOf(data.getCount()));
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
        conditions.add(Conditions.desc("id"));
        return conditions;
    }

}
