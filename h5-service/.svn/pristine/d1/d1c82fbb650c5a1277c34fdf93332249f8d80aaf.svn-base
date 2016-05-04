package net.newcapec.campus.h5.action;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import net.newcapec.campus.h5.entity.IpAddrLog;
import net.newcapec.campus.h5.manager.IpAddrLogManager;
import net.newcapec.campus.h5.util.Command;
import net.newcapec.campus.quickaccess.request.context.RequestUtils;
import net.newcapec.campus.quickaccess.utils.PreferenceUtils;
import net.newcapec.v3.core.web.action.BaseAction;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RecommendFriendRegisterAction extends BaseAction {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private IpAddrLogManager ipAddrLogManager;
	private PreferenceUtils preferenceUtils;
 
	public void setIpAddrLogManager(IpAddrLogManager ipAddrLogManager) {
		this.ipAddrLogManager = ipAddrLogManager;
	}
	public void setPreferenceUtils(PreferenceUtils preferenceUtils) {
		this.preferenceUtils = preferenceUtils;
	}

	public void redirectURL(){
		String recCode = this.getParameter("recCode");
		if(null == recCode){
			recCode ="";
		}
		String h5RedirectURLl = preferenceUtils.getH5RedirectURL();
		try {
			this.getResponse().sendRedirect(h5RedirectURLl+"?recCode="+recCode);
			System.out.println(h5RedirectURLl+"?"+recCode);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	// 初始化页面使用
	public void initPage() throws Exception {

		JSONObject resultJson = new JSONObject();
		JSONObject data = new JSONObject();
		String recommendCode = this.getParameter("recommendCode");
		// Long userId = this.getLongParameter("userId");
		// Long userId = 9827L;
		JSONObject requestData = new JSONObject();
		requestData.put("recommendCode", recommendCode);

		String resp = RequestUtils.sendRequestH5(Command.INITRECOMMEND, "",
				requestData.toJSONString());
		this.log.debug(resp);

		JSONObject respJSON = JSONObject.parseObject(resp);
		String code = respJSON.getString("code");
		String msg = respJSON.getString("message");
		if ("0".equals(code)) {
			String body = respJSON.getString("data");
			JSONObject bodyJSON = JSONObject.parseObject(body);
			this.log.debug("bodyJSON" + bodyJSON);
			int code_ = bodyJSON.getIntValue("code_");
			String message_ = bodyJSON.getString("message_");
			if (code_ == 0) {
				String userName = bodyJSON.getString("userName");
				String customPic = bodyJSON.getString("customPic");
				Long customerId = bodyJSON.getLong("customerId");
				Long schoolId = bodyJSON.getLong("schoolId");
				String customerName = bodyJSON.getString("customerName");

				data.put("userName", userName);
				data.put("customPic", customPic);
				data.put("customerId", customerId);
				data.put("customerName", customerName);
				data.put("schoolId", schoolId);
				resultJson.put("code_", 0);
				resultJson.put("message_", message_);
				resultJson.put("data", data);
				ajaxOutPutText(resultJson);
			} else {

				resultJson.put("code_", 99);
				resultJson.put("message_", message_);
				resultJson.put("data", data);
				ajaxOutPutText(resultJson);
			}

		} else {
			resultJson.put("code_", code);
			resultJson.put("message_", msg);
			resultJson.put("data", data);
			ajaxOutPutText(resultJson);
			this.log.debug("code" + code + "~~~~~~msg" + msg);
		}

	}

	// 获取学校列表
	public void getSchoolList() throws Exception {

		JSONObject resultJson = new JSONObject();
		JSONObject data = new JSONObject();
		String schoolName = this.getParameter("schoolName");
		JSONObject requestData = new JSONObject();
		requestData.put("schoolName", schoolName);
		// JSONObject request = new JSONObject();
		// request.put("param", requestData);
		String resp = RequestUtils.sendRequestH5(Command.GETSCHOOLLIST, "",
				requestData.toJSONString());
		this.log.debug(resp);

		JSONObject respJSON = JSONObject.parseObject(resp);
		String code = respJSON.getString("code");
		String msg = respJSON.getString("message");
		if ("0".equals(code)) {
			String body = respJSON.getString("data");
			JSONObject bodyJSON = JSONObject.parseObject(body);
			this.log.debug("bodyJSON" + bodyJSON);
			int code_ = bodyJSON.getIntValue("code_");
			String message_ = bodyJSON.getString("message_");
			if (code_ == 0) {
				JSONArray schoolList = bodyJSON.getJSONArray("schoolList");
				resultJson.put("code_", 0);
				resultJson.put("message_", "成功");
				data.put("schoolList", schoolList);
				resultJson.put("data", data);
				ajaxOutPutText(resultJson);
			} else {
				resultJson.put("code_", 99);
				resultJson.put("message_", message_);
				resultJson.put("data", data);
				ajaxOutPutText(resultJson);
			}

		} else {
			resultJson.put("code_", code);
			resultJson.put("message_", msg);
			resultJson.put("data", data);
			ajaxOutPutText(resultJson);
			this.log.debug("code" + code + "~~~~~~msg" + msg);
		}

	}

	public boolean isMobileNO(String mobiles) {
		Pattern p = Pattern.compile("^1[0-9]{10}$");
		Matcher m = p.matcher(mobiles);
		return m.matches();
	}

	// 发送验证码
	public void sendCaptchaFromRegister() throws Exception {
		
        String ipAddr = this.getIpAddr(this.getRequest());
        IpAddrLog ig = new IpAddrLog();
        ig.setCreateDate(new Date());
        ig.setIpAddr(ipAddr);
        ipAddrLogManager.save(ig);
		JSONObject resultJson = new JSONObject();
		JSONObject data = new JSONObject();
		String mobile = this.getParameter("mobile");
		boolean mobileNO = this.isMobileNO(mobile);
		if (!mobileNO) {
			resultJson.put("code_", 99);
			resultJson.put("message_", "手机号不合法");
			resultJson.put("data", data);
			ajaxOutPutText(resultJson);
			return;
		}
		JSONObject requestData = new JSONObject();
		requestData.put("mobile", mobile);
		// JSONObject request = new JSONObject();
		// request.put("param", requestData);
		String resp = RequestUtils
				.sendRequestH5(Command.SENDCAPTCHAFROMREGISTER, "",
						requestData.toJSONString());
		this.log.debug(resp);

		JSONObject respJSON = JSONObject.parseObject(resp);
		String code = respJSON.getString("code");
		String msg = respJSON.getString("message");
		if ("0".equals(code)) {
			String body = respJSON.getString("data");
			JSONObject bodyJSON = JSONObject.parseObject(body);
			this.log.debug("bodyJSON" + bodyJSON);
			int intValue = bodyJSON.getIntValue("code_");
			String message_ = bodyJSON.getString("message_");
			if (intValue == 0) {
				resultJson.put("code_", 0);
				resultJson.put("message_", "成功");
				resultJson.put("data", data);
				ajaxOutPutText(resultJson);
			} else {
				resultJson.put("code_", 99);
				resultJson.put("message_", message_);
				resultJson.put("data", data);
				ajaxOutPutText(resultJson);
			}

		} else {
			resultJson.put("code_", code);
			resultJson.put("message_", msg);
			resultJson.put("data", data);
			ajaxOutPutText(resultJson);
			this.log.debug("code" + code + "~~~~~~msg" + msg);
		}

	}

	// 推荐好友注册
	public void register() throws Exception {

		JSONObject resultJson = new JSONObject();
		JSONObject data = new JSONObject();
		String mobile = this.getParameter("mobile");
		boolean mobileNO = this.isMobileNO(mobile);
		if (!mobileNO) {
			resultJson.put("code_", 99);
			resultJson.put("message_", "手机号不合法");
			resultJson.put("data", data);
			ajaxOutPutText(resultJson);
			return;
		}
		Long schoolId = this.getLongParameter("schoolId");
		String authCode = this.getParameter("authCode");
		String recommendCode = this.getParameter("recommendCode");
		JSONObject requestData = new JSONObject();
		requestData.put("mobile", mobile);
		requestData.put("schoolId", schoolId);
		requestData.put("authCode", authCode);
		requestData.put("recommendCode", recommendCode);

		// JSONObject request = new JSONObject();
		// request.put("param", requestData);
		String resp = RequestUtils.sendRequestH5(Command.REGISTER, "",
				requestData.toJSONString());
		this.log.debug(resp);

		JSONObject respJSON = JSONObject.parseObject(resp);
		String code = respJSON.getString("code");
		String msg = respJSON.getString("message");
		if ("0".equals(code)) {
			String body = respJSON.getString("data");
			JSONObject bodyJSON = JSONObject.parseObject(body);
			this.log.debug("bodyJSON" + bodyJSON);
			int intValue = bodyJSON.getIntValue("code_");
			String message_ = bodyJSON.getString("message_");
			if (intValue == 0) {
				String initPassword = bodyJSON.getString("initPassword");
				data.put("initPassword", initPassword);
				data.put("mobile", mobile);
				resultJson.put("code_", 0);
				resultJson.put("message_", "成功");
				resultJson.put("data", data);
				ajaxOutPutText(resultJson);
			} else {
				resultJson.put("code_", 99);
				resultJson.put("message_", message_);
				resultJson.put("data", data);
				ajaxOutPutText(resultJson);
			}

		} else {
			resultJson.put("code_", code);
			resultJson.put("message_", msg);
			resultJson.put("data", data);
			ajaxOutPutText(resultJson);
			this.log.debug("code" + code + "~~~~~~msg" + msg);
		}

	}

	public String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

}
