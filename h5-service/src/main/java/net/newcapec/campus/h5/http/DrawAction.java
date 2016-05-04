/**
 *
 */
package net.newcapec.campus.h5.http;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.PrizeFileResourceCategory;
import net.newcapec.campus.h5.entity.Activity;
import net.newcapec.campus.h5.entity.ActivityLog;
import net.newcapec.campus.h5.entity.Prize;
import net.newcapec.campus.h5.entity.SonActivity;
import net.newcapec.campus.h5.manager.ActivityLogManager;
import net.newcapec.campus.h5.manager.ActivityManager;
import net.newcapec.campus.h5.manager.PrizeManager;
import net.newcapec.campus.h5.manager.SonActivityManager;
import net.newcapec.campus.h5.manager.redis.RedisDrawManager;
import net.newcapec.v3.core.web.action.BaseAction;
import net.newcapec.v3.core.web.servlet.WebSourceServlet;
import net.newcapec.v3.extend.orm.Condition;
import net.newcapec.v3.extend.orm.Pagination;
import net.newcapec.v3.extend.orm.condition.Conditions;
import org.apache.commons.lang.StringUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * @author 喻康
 * @version BanWordsAction.java 2014-11-14 上午11:06:49
 */
public class DrawAction extends BaseAction {

    /**
     *
     */
    private static final long serialVersionUID = 6854339386948579847L;
    private ActivityManager activityManager;
    private SonActivityManager sonActivityManager;
    private RedisDrawManager redisDrawManager;
    private ActivityLogManager activityLogManager;
    private PrizeManager prizeManager;
    private HttpCampusUtils httpCampusUtils;
    private String token;

    /**
     * @throws IOException
     */
    public void draw() throws IOException {
        //   result.put("messCode", 4);  0.中奖 1未中奖 2活动不存在 3活动未开始 4服务端异常
        JSONObject result = new JSONObject();
        try {
            if (StringUtils.isBlank(token)) {
                result.put("result_", false);
                result.put("code_", 99);
                result.put("message_", "请求参数不全！");
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
                ajaxOutPutJson(result);
                return;
            } else {
                userId = jsonObject.getLong("userId");
                name = jsonObject.getString("name");
                mobile = jsonObject.getString("mobile");
            }
            List<Activity> list = activityManager.findByCondition(Conditions.eq("enable", false), Conditions.gt("endStamp", new Date()), Conditions.asc("endStamp"));
            Long activityId = 0L;
            if (list != null && !list.isEmpty()) {
                activityId = list.get(0).getId();
            }
            List<SonActivity> sonList = sonActivityManager.findByCondition(Conditions.eq("activityId", activityId), Conditions.eq("enable", false), Conditions.gt("endStamp", new Date()), Conditions.asc("endStamp"));
            Long sonActivityId = 0L;
            if (sonList != null && !sonList.isEmpty()) {
                sonActivityId = sonList.get(0).getId();
            }
            JSONObject data = redisDrawManager.drawPool(sonActivityId, userId, name, mobile);
            Long prizeId = data.getLong("prizeId");
            data.remove("prizeId");
            String path = getRequest().getScheme() + "://" + getRequest().getServerName() + ":" + getRequest().getServerPort() + getRequest().getContextPath();
            if (prizeId != null && prizeId > 0) {
                Prize prize = prizeManager.get(prizeId);
                String photo = prize.getImagePath();
                if (StringUtils.isNotBlank(photo)) {
                    photo = path
                            + WebSourceServlet.FILE_GETTER_SERVLET_URL_PATTERN
                            + PrizeFileResourceCategory.NAME + "/" + photo;
                }
                data.put("prizeName", prize.getName());
                data.put("prizePhoto", photo);
            } else {
                data.put("prizeName", "");
                data.put("prizePhoto", "");
            }
            result.put("result_", true);
            result.put("code_", 0);
            result.put("message_", "抽奖成功！");
            result.put("data", JSONObject.toJSONString(data));
            ajaxOutPutJson(result);
        } catch (Exception e) {
            log.error(null, e);
            result.put("result_", false);
            result.put("code_", 99);
            result.put("message_", "抽奖失败！");
            JSONObject data = new JSONObject();
            data.put("prizeName", "");
            data.put("prizePhoto", "");
            result.put("takeCount", 0);
            result.put("messCode", 4);
            result.put("data", JSONObject.toJSONString(data));
            ajaxOutPutJson(result);
        }
    }

    /**
     * 中奖人列表/我的中奖列表
     */
    public void winners() throws IOException {
        JSONObject result = new JSONObject();
        try {
            Long userId = null;
            if (StringUtils.isNotBlank(token)) {
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
            }

        /*    List<Activity> list = activityManager.findByCondition(Conditions.eq("enable", false), Conditions.gt("endStamp", new Date()), Conditions.lt("startStamp", new Date()));
            Long activityId = 0L;
            if (list != null && !list.isEmpty()) {
                activityId = list.get(0).getId();
            }*/
            List<ActivityLog> dataList = new ArrayList<ActivityLog>();
            if (userId == null) {
                java.util.Collection<Condition> conditions = new java.util.ArrayList<Condition>();
//                conditions.add( Conditions.eq("activityId", activityId));
                conditions.add(Conditions.isNotNull("prizeId"));
                conditions.add(Conditions.desc("id"));
                Pagination<ActivityLog> pagination = activityLogManager.findAll(0, 30
                        , (Condition[]) conditions
                        .toArray(new Condition[conditions.size()]));
                Collection<ActivityLog> datas = pagination.getResults();
                dataList.addAll(datas);
            } else {
                dataList = activityLogManager.findByCondition(Conditions.eq("userId", userId), Conditions.isNotNull("prizeId"), Conditions.desc("id"));
            }
            String path = getRequest().getScheme() + "://" + getRequest().getServerName() + ":" + getRequest().getServerPort() + getRequest().getContextPath();
            JSONArray array = new JSONArray();
            JSONObject obj = null;
            for (ActivityLog log : dataList) {
                Prize prize = prizeManager.get(log.getPrizeId());
                obj = new JSONObject();
                if (userId != null) {
                    String photo = prize.getImagePath();
                    if (StringUtils.isNotBlank(photo)) {
                        photo = path
                                + WebSourceServlet.FILE_GETTER_SERVLET_URL_PATTERN
                                + PrizeFileResourceCategory.NAME + "/" + photo;
                    }
                    obj.put("prizeNote", prize.getNote());
                    obj.put("prizePhoto", photo);
                }
                obj.put("userName", log.getUserName());
                obj.put("prizeName", prize.getName());
                obj.put("time", log.getCreateStamp().getTime());
                array.add(obj);
            }
            result.put("data", array);
            result.put("result_", true);
            result.put("code_", 0);
            result.put("message_", "获取成功！");
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

    /**
     * @throws IOException
     */
    public void drawInfo() throws IOException {
        JSONObject result = new JSONObject();
        try {
            if (StringUtils.isBlank(token)) {
                result.put("result_", false);
                result.put("code_", 99);
                result.put("message_", "请求参数不全！");
                ajaxOutPutJson(result);
                return;
            }
            Long userId = null;
            JSONObject jsonObject = httpCampusUtils.getUserByToken(token);
            if (jsonObject == null) {
                result.put("result_", false);
                result.put("code_", 99);
                result.put("message_", "非法用户！");
                ajaxOutPutJson(result);
                return;
            } else {
                userId = jsonObject.getLong("userId");
            }
            List<Activity> list = activityManager.findByCondition(Conditions.eq("enable", false), Conditions.gt("endStamp", new Date()), Conditions.asc("endStamp"));
            Long activityId = 0L;
            if (list != null && !list.isEmpty()) {
                activityId = list.get(0).getId();
            }
            List<SonActivity> sonList = sonActivityManager.findByCondition(Conditions.eq("activityId", activityId), Conditions.eq("enable", false), Conditions.gt("endStamp", new Date()), Conditions.asc("endStamp"));
            SonActivity sonActivity = null;
            if (sonList != null && !sonList.isEmpty()) {
                sonActivity = sonList.get(0);
            }
            JSONObject data = new JSONObject();
            if (sonActivity != null) {
                if (sonActivity.getTakeCount() == -1) {
                    data.put("takeCount", sonActivity.getTakeCount());
                } else {
                    long count = sonActivity.getTakeCount() - redisDrawManager.getTakeCount(sonActivity.getId(), userId);
                    count = count < 0 ? 0 : count;
                    data.put("takeCount", count);
                }
            } else {
                data.put("takeCount", 0);
            }
            result.put("result_", true);
            result.put("code_", 0);
            result.put("message_", "成功！");
            result.put("data", JSONObject.toJSONString(data));
            ajaxOutPutJson(result);
        } catch (Exception e) {
            log.error(null, e);
            result.put("result_", false);
            result.put("code_", 99);
            result.put("message_", "失败！");
            result.put("data", "");
            ajaxOutPutJson(result);
        }
    }

    public RedisDrawManager getRedisDrawManager() {
        return redisDrawManager;
    }

    public void setRedisDrawManager(RedisDrawManager redisDrawManager) {
        this.redisDrawManager = redisDrawManager;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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

    public void setActivityLogManager(ActivityLogManager activityLogManager) {
        this.activityLogManager = activityLogManager;
    }

    public void setHttpCampusUtils(HttpCampusUtils httpCampusUtils) {
        this.httpCampusUtils = httpCampusUtils;
    }
}
