package net.newcapec.campus.h5.manager;

import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.entity.Program;
import net.newcapec.v3.extend.manager.BaseManager;

public interface ProgramManager extends BaseManager<Program> {
    /**
     * 获取节目列表
     *
     * @param userId
     * @return
     */
    public JSONObject findAllProgram(Long userId);
    /**
     * 投票
     *
     * @return
     */
    public JSONObject saveVote(String programIds, Long userId, String userName, String mobile);
}
