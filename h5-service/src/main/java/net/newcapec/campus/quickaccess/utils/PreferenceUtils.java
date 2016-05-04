package net.newcapec.campus.quickaccess.utils;

import net.newcapec.v3.plugin.preference.V3PreferenceUtils;

public class PreferenceUtils extends V3PreferenceUtils {
    public String getOpenCampusSign() {
        String stringValue = this.getStringValue("ifaceservice.key");
        return stringValue;
    }

    public String getOpenCampusFlag() {
        String stringValue = this.getStringValue("ifaceservice.flag");
        return stringValue;
    }

    public String getOpenCampusUrl() {
        String stringValue = this.getStringValue("ifaceservice.invokeRequstUrl");
        return stringValue;
    }

    public String getH5OpenCampusUrl() {
        String stringValue = this.getStringValue("ifaceservice.invokeRequstH5Url");
        return stringValue;
    }

    public String getH5RedirectURL() {
        String redirectURL = this.getStringValue("H5service.redirectURL");
        return redirectURL;
    }

    /**
     * 奖品图片名字
     *
     * @return
     */
    public String getPrizeImageURL() {
        String stringValue = this.getStringValue("h5.prizeImageURL");
        return stringValue;
    }

    /**
     * 获取redis服务器ip地址
     *
     * @return
     */
    public String getRedisIP() {
        return this.getStringValue("campus.redis.ip");
    }

    /**
     * 获取redis服务器密码
     *
     * @return
     */
    public String getRedisPASSWORD() {
        return this.getStringValue("campus.redis.password");
    }

    /**
     * 获取redis服务器端口号
     *
     * @return
     */
    public Integer getRedisPORT() {
        return this.getIntegerValue("campus.redis.port");
    }

    /**
     * 获取redis服务器设置最大连接数
     *
     * @return
     */
    public Integer getRedisMaxTotal() {
        return this.getIntegerValue("campus.redis.maxTotal");
    }

    /**
     * 获取redis服务器最大阻塞时间
     *
     * @return
     */
    public Integer getRedisMaxWaitMillis() {
        return this.getIntegerValue("campus.redis.maxWaitMillis");
    }

    /**
     * 获取redis服务器设置空闲连接
     *
     * @return
     */
    public Integer getRedisMaxIdle() {
        return this.getIntegerValue("campus.redis.maxIdle");
    }

    /**
     * 是否启用redis服务器
     *
     * @return
     */
    public Boolean getRedisIsOpen() {
        return this.getBooleanValue("campus.redis.isOpen");
    }

    /**
     * 玩校获取用户信息url
     *
     * @return
     */
    public String getCampusUrl() {
        return this.getStringValue("campus.url");
    }

    /**
     * 玩校签名flag
     *
     * @return
     */
    public String getCampusFlag() {
        return this.getStringValue("campus.flag");
    }

    /**
     * 玩校签名key
     *
     * @return
     */
    public String getCampusKey() {
        return this.getStringValue("campus.key");
    }
    
    
    
    
    
    
    
    
    
    
    /**
     * 玩校获取用户信息url
     *
     * @return
     */
    public String getCampusUrlSys() {
        return this.getStringValue("campus.sys.url");
    }

    /**
     * 玩校签名flag
     *
     * @return
     */
    public String getCampusFlagSys() {
        return this.getStringValue("campus.sys.flag");
    }

    /**
     * 玩校签名key
     *
     * @return
     */
    public String getCampusKeySys() {
        return this.getStringValue("campus.sys.key");
    }
    
    
    
    
    
    
    
    /**
     * 校园卡日记分享URL
     *
     * @return
     */
    public String getSchoolCardDiaryShareURL() {
        return this.getStringValue("campus.schoolCardDiary_ShareURL");
    }
    //玩校充值节约的时间
    public Integer getSaveTime(){
    	 return this.getIntegerValue("campus.schoolCardDiary.saveTime");
    }
    //没有使用玩校充值浪费的时间
    public Integer getWasteTime(){
   	 return this.getIntegerValue("campus.schoolCardDiary.wasteTime");
   }
   
    //投票 
    //获取用户信息后投票入口
    public String getVoteRedirectURL() {
        String redirectURL = this.getStringValue("vote.redirectURL");
        return redirectURL;
    }
    //获取不到用户信息错误的页面入口
    public String getErrorTokenURL() {
        String redirectURL = this.getStringValue("error.redirectURL");
        return redirectURL;
    }
    //投票分享URL
    public String getVoteShareURL() {
        String redirectURL = this.getStringValue("vote.shareURL");
        return redirectURL;
    }
    
    /**
     * 
     *
     * @return
     */
    public String getWXUrl() {
        return this.getStringValue("wx.url");
    }
    /**
     * 学校新闻标题长度
     *
     * @return
     */
    public Integer getNewsTitleSub() {
        return this.getIntegerValue("campus.news.titleSub");
    }

    /**
     * 学校新闻概略长度
     *
     * @return
     */
    public Integer getNewsSummarySub() {
        return this.getIntegerValue("campus.news.summarySub");
    }
    /**
     * 玩校前置接口服务调用url
     *
     * @return
     */
    public String getCampusUrlPreSys() {
        return this.getStringValue("campus.presys.url");
    }
}
