/**
 *
 */
package net.newcapec.campus.h5.http;

import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.manager.ProgramManager;
import net.newcapec.v3.core.web.action.BaseAction;
import org.apache.commons.lang.StringUtils;

import java.io.IOException;

/**
 * @author 喻康
 * @version BanWordsAction.java 2014-11-14 上午11:06:49
 */
public class ProgramVoteAction extends BaseAction {

    /**
     *
     */
    private static final long serialVersionUID = 6854339386948579847L;
    private ProgramManager programManager;
    private HttpCampusUtils httpCampusUtils;
    private String token;
    private String programIds;

    /**
     * 投票
     *
     * @throws IOException
     */
    public void programVote() throws IOException {
        JSONObject result = new JSONObject();
        try {
            if (StringUtils.isBlank(token) || StringUtils.isBlank(programIds)) {
                result.put("result_", false);
                result.put("code_", 99);
                result.put("message_", "请求参数不全！");
                result.put("data", null);
                ajaxOutPutJson(result);
                return;
            }
            Long userId = null;
            String name = null;
            String mobile = null;
            JSONObject jsonObject = httpCampusUtils.getUserByToken(token);
            if (jsonObject == null) {
                result.put("result_", false);
                result.put("code_", 99);
                result.put("message_", "非法用户！");
                result.put("data", null);
                ajaxOutPutJson(result);
                return;
            } else {
                userId = jsonObject.getLong("userId");
                name = jsonObject.getString("name");
                mobile = jsonObject.getString("mobile");
            }
            result = programManager
                    .saveVote(programIds, userId, name, mobile);
            if (result != null && result.getBoolean("result_")) {
                JSONObject obj = programManager.findAllProgram(userId);
                JSONObject data = JSONObject.parseObject(obj.getString("data"));
                result.put("data", data.getString("rows"));
                result.put("result_", true);
                result.put("code_", 0);
                result.put("message_", "投票成功！");
            } else {
                result.put("result_", false);
                result.put("code_", 99);
                result.put("message_", "投票失败！");
                result.put("data", null);
            }
            ajaxOutPutJson(result);
        } catch (Exception e) {
            log.error(null, e);
            result.put("result_", false);
            result.put("code_", 99);
            result.put("message_", "投票失败！");
            result.put("data", null);
            ajaxOutPutJson(result);
        }
    }

    /**
     * 节目列表
     */
    public void getProgram() throws IOException {
        JSONObject result = new JSONObject();
        try {
            if (StringUtils.isBlank(token)) {
                result.put("result_", false);
                result.put("code_", 99);
                result.put("message_", "请求参数不全！");
                result.put("data", null);
                ajaxOutPutJson(result);
                return;
            }
            Long userId = null;
            JSONObject jsonObject = httpCampusUtils.getUserByToken(token);
            if (jsonObject == null) {
                result.put("result_", false);
                result.put("code_", 99);
                result.put("message_", "非法用户！");
                result.put("data", null);
                ajaxOutPutJson(result);
                return;
            } else {
                userId = jsonObject.getLong("userId");
            }
            result = programManager.findAllProgram(userId);
            ajaxOutPutJson(result);
        } catch (Exception e) {
            log.error(null, e);
            result.put("result_", false);
            result.put("code_", 99);
            result.put("message_", "获取失败！");
            result.put("data", null);
            ajaxOutPutJson(result);
        }
    }

    public ProgramManager getProgramManager() {
        return programManager;
    }

    public void setProgramManager(ProgramManager programManager) {
        this.programManager = programManager;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getProgramIds() {
        return programIds;
    }

    public void setProgramIds(String programIds) {
        this.programIds = programIds;
    }

    public void setHttpCampusUtils(HttpCampusUtils httpCampusUtils) {
        this.httpCampusUtils = httpCampusUtils;
    }
}
