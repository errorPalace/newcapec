package net.newcapec.campus.h5.manager.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.dao.ProgramDao;
import net.newcapec.campus.h5.entity.Program;
import net.newcapec.campus.h5.entity.ProgramVoteLog;
import net.newcapec.campus.h5.manager.ProgramManager;
import net.newcapec.campus.h5.manager.ProgramVoteLogManager;
import net.newcapec.v3.extend.manager.BaseManagerImpl;
import net.newcapec.v3.extend.orm.condition.Conditions;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ProgramManagerImpl extends BaseManagerImpl<Program> implements
        ProgramManager {
    private ProgramVoteLogManager programVoteLogManager;

    /**
     * 获取节目列表
     *
     * @param userId
     * @return
     */
    public JSONObject findAllProgram(Long userId) {
        JSONObject result = new JSONObject();
        JSONObject data = new JSONObject();
        data.put("isVote", false);
        List<Long> logIdList = new ArrayList<>();
        List<Program> list = new ArrayList<>();
        List<ProgramVoteLog> logList = programVoteLogManager.findByCondition(Conditions.eq("userId", userId));
        if (logList != null && !logList.isEmpty()) {
            data.put("isVote", true);
            String[] strs = logList.get(0).getProgramIds().split(",");
            for (String str : strs) {
                logIdList.add(Long.parseLong(str));
            }
            list = this.findByCondition(Conditions.desc("count"));
        } else {
            list = this.findByCondition(Conditions.asc("id"));
        }
        int sumCount = 0;//总票数
        int empCount = 0;//最大的票数
        for (Program program : list) {
            if (program.getCount() > empCount) {
                empCount = program.getCount();
            }
            sumCount += program.getCount();
        }
        // 创建一个数值格式化对象
        NumberFormat numberFormat = NumberFormat.getInstance();
        // 设置精确到小数点后2位
        numberFormat.setMaximumFractionDigits(1);
        JSONObject obj = null;
        JSONArray array = new JSONArray();
        for (Program program : list) {
            obj = new JSONObject();
            obj.put("id", program.getId());
            obj.put("name", program.getName());
            obj.put("participant", program.getParticipant());
            obj.put("director", program.getDirector());
            obj.put("count", program.getCount());
            if (sumCount > 0)
                obj.put("countPercent", numberFormat.format((float) program.getCount() / (float) sumCount * 100));
            else
                obj.put("countPercent", 0);
            if (empCount > 0)
                obj.put("relativePercent", numberFormat.format((float) program.getCount() / (float) empCount * 100));
            else
                obj.put("relativePercent", 0);
            if (logIdList.contains(program.getId())) {
                obj.put("isVote", true);
            } else {
                obj.put("isVote", false);
            }
            array.add(obj);
        }
        data.put("rows", array);
        result.put("result_", true);
        result.put("code_", 0);
        result.put("message_", "成功");
        result.put("data", data);
        return result;
    }

    /**
     * 投票
     *
     * @return
     */
    public JSONObject saveVote(String programIds, Long userId, String userName, String mobile) {
        int sumCount = 3;//每人最多投三个节目
        JSONObject result = new JSONObject();
        String[] ids = programIds.split(",");
        if (ids.length > sumCount) {
            result.put("result_", false);
            result.put("code_", 99);
            result.put("message_", "每人最多投三个节目！");
            result.put("data", null);
            return result;
        }
        Long[] proIds = new Long[ids.length];
        for (int count = 0; count < proIds.length; ++count) {
            proIds[count] = Long.decode(ids[count]);
        }
        List<Program> programList = this.findById(proIds);
        if (programList == null || programList.size() != ids.length) {
            result.put("result_", false);
            result.put("code_", 99);
            result.put("message_", "存在非法节目！");
            result.put("data", null);
            return result;
        }
        List<ProgramVoteLog> list = programVoteLogManager.findByCondition(Conditions.eq("userId", userId));
        if (list == null || list.isEmpty()) {
            ProgramVoteLog log = new ProgramVoteLog();
            log.setCreateStamp(new Date());
            log.setMobile(mobile);
            log.setProgramIds(programIds);
            log.setUserId(userId);
            log.setUserName(userName);
            log = programVoteLogManager.save(log);
            if (log != null) {
                ProgramDao programDao = (ProgramDao) this.dao;
                for (Program entity : programList) {
                    programDao.updateCount(entity.getId());
                }
                result.put("result_", true);
                result.put("code_", 0);
                result.put("message_", "成功！");
            } else {
                result.put("result_", false);
                result.put("code_", 99);
                result.put("message_", "投票失败！");
            }
        } else {
            result.put("result_", false);
            result.put("code_", 99);
            result.put("message_", "已经投过票了！");
        }
        return result;
    }

    public void setProgramVoteLogManager(ProgramVoteLogManager programVoteLogManager) {
        this.programVoteLogManager = programVoteLogManager;
    }
}
