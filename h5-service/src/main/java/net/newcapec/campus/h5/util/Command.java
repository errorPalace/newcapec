package net.newcapec.campus.h5.util;

public interface Command {
	/**
     * 推荐好友初始化页面的时候 根据用户id获取用户的相关信息
     */
    String INITRECOMMEND = "initRecommend";
    /**
     * 或去学校列表（模糊查询）
     */
    String GETSCHOOLLIST = "getSchoolList";
    /**
     *注册发送验证码
     */
    String SENDCAPTCHAFROMREGISTER = "sendCaptchaFromRegister";
    /**
     *推荐好友的注册
     */
    String REGISTER = "register";
}
