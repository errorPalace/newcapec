package net.newcapec.campus.h5.Job;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.entity.Activity;
import net.newcapec.campus.h5.entity.SonActivity;
import net.newcapec.campus.h5.entity.SonActivityPrizeCfg;
import net.newcapec.campus.h5.manager.ActivityManager;
import net.newcapec.campus.h5.manager.SonActivityManager;
import net.newcapec.campus.h5.manager.SonActivityPrizeCfgManager;
import net.newcapec.campus.h5.manager.redis.RedisDrawManager;
import net.newcapec.campus.h5.util.BeanUtils;
import net.newcapec.v3.extend.orm.condition.Conditions;
import org.quartz.*;

import java.util.List;
import java.util.UUID;

/**
 * Created by wa on 2016/1/12.
 */
@PersistJobDataAfterExecution
@DisallowConcurrentExecution
public class PrizePoolJob implements Job {
    public static final int time = 300;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        JobDataMap map =  context.getJobDetail().getJobDataMap();
        Long sonActivityId = Long.parseLong(map.get("sonActivityId").toString());
        SonActivityManager sonActivityManager = (SonActivityManager) BeanUtils.getBean("sonActivityManager");
        SonActivityPrizeCfgManager sonActivityPrizeCfgManager = (SonActivityPrizeCfgManager) BeanUtils.getBean("sonActivityPrizeCfgManager");
        RedisDrawManager redisDrawManager = (RedisDrawManager) BeanUtils.getBean("redisDrawManager");
        ActivityManager activityManager = (ActivityManager) BeanUtils.getBean("activityManager");
        SonActivity sonActivity = sonActivityManager.get(sonActivityId);
        JSONArray array = new JSONArray();
        JSONObject obj = null;
        for (int i = 0; i < sonActivity.getCount(); i++) {
            obj = new JSONObject();
            obj.put("prizeId", -1L);
            obj.put("code",    sonActivity.getId() + ":"+UUID.randomUUID());
            array.add(obj);
        }
        List<SonActivityPrizeCfg> list = sonActivityPrizeCfgManager.findByCondition(Conditions.eq("sonActivityId", sonActivity.getId()), Conditions.eq("enable", false));
        if (list != null && !list.isEmpty()) {
            for (SonActivityPrizeCfg sonActivityPrizeCfg : list) {
                for (int i = 0; i < sonActivityPrizeCfg.getAllotCount(); i++) {
                    obj = new JSONObject();
                    obj.put("prizeId", sonActivityPrizeCfg.getPrizeId());
                    obj.put("code", sonActivity.getId() + ":" +  UUID.randomUUID());
                    array.add(obj);
                }
            }
        }
        Activity activity = activityManager.get(sonActivity.getActivityId());
        Long time = (activity.getEndStamp().getTime() - sonActivity.getStartStamp().getTime()) / 1000;
        redisDrawManager.intiPool(sonActivity.getActivityId(),sonActivity.getId(), array, time.intValue() + PrizePoolJob.time * 3);
    }
}
