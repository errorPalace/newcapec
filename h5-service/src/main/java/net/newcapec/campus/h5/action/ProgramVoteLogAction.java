/**
 *
 */
package net.newcapec.campus.h5.action;

import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.entity.Program;
import net.newcapec.campus.h5.entity.ProgramVoteLog;
import net.newcapec.campus.h5.manager.ProgramManager;
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
public class ProgramVoteLogAction extends AbstractSimpleGridBaseAction<ProgramVoteLog> {

    /**
     *
     */
    private static final long serialVersionUID = 6854339386948579847L;
    private ProgramManager programManager;

    @Override
    protected Serializable getObjectId(ProgramVoteLog data) {
        return data.getId();
    }

    @Override
    protected int configPageSize() {
        return 15;
    }

    public ProgramVoteLog getData() {
        return data;
    }

    public void setData(ProgramVoteLog data) {
        this.data = data;
    }

    @Override
    protected JSONObject dataToJSONObject(ProgramVoteLog data) {
        JSONObject jsonObject = super.dataToJSONObject(data);
        if (data.getCreateStamp() != null) {
            jsonObject.put("createStamp", DateFormatUtils.format(
                    data.getCreateStamp(), "yy-MM-dd HH:mm:ss"));
        }
        String programIds = data.getProgramIds();
        if (StringUtils.isNotBlank(programIds)) {
            StringBuilder sb = new StringBuilder();
            String[] ids = programIds.split(",");
            for (String str : ids) {
                Program entity = programManager.get(Long.parseLong(str));
                sb.append("[");
                if (entity != null) {
                    sb.append(entity.getName());
                } else {
                    sb.append("找不到节目");
                }
                sb.append("] ");
            }
            jsonObject.put("programIds", sb.toString());
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
    public String view() throws Exception {
        super.view();
        String programIds = data.getProgramIds();
        if (StringUtils.isNotBlank(programIds)) {
            StringBuilder sb = new StringBuilder();
            String[] ids = programIds.split(",");
            for (String str : ids) {
                Program entity = programManager.get(Long.parseLong(str));
                sb.append("[");
                if (entity != null) {
                    sb.append(entity.getName());
                } else {
                    sb.append("找不到节目");
                }
                sb.append("] ");
            }
            setAttribute("programIds", sb.toString());
        }
        return SUCCESS;
    }

    public ProgramManager getProgramManager() {
        return programManager;
    }

    public void setProgramManager(ProgramManager programManager) {
        this.programManager = programManager;
    }
}
