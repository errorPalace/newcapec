/**
 * @Title: invoke.java
 * @Package net.newcapec.campus.quickaccess.boot
 * Copyright: Copyright (c) 2015
 * Company:新开普电子股份有限公司
 * 
 * @author lhf
 * @date 2015年12月8日 下午5:39:44
 * @version V1.0
 */
package net.newcapec.campus.quickaccess.boot;

import java.io.IOException;
import java.math.BigInteger;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.opensymphony.xwork2.ActionContext;
import net.newcapec.campus.quickaccess.boot.aop.AuthSource;
import net.newcapec.campus.quickaccess.entity.Student;
import net.newcapec.campus.quickaccess.manager.CustomerManager;
import net.newcapec.campus.quickaccess.manager.StudentManager;
import net.newcapec.campus.quickaccess.request.context.RequestUtils;
import net.newcapec.campus.quickaccess.utils.*;
import net.newcapec.campus.quickaccess.utils.urlbuilder.ParseUrlParameter;
import net.newcapec.v3.core.web.action.BaseAction;
import net.newcapec.v3.extend.orm.condition.Conditions;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;

/**
 * @ClassName: invoke
 * @author lhf
 * @date 2015年12月8日 下午5:39:44
 * 
 */
public class InvokeRequest extends BaseAction {
	private static final long serialVersionUID = 1L;

	private CustomerManager customerManager;
	private StudentManager studentManager;
	private PreferenceUtils preferenceUtils;

	private String gateWayUrl;

	/**
	 * 第三方门户请求访问入口, (v1为版本为1的接口)
	 * 
	 * @Title: invoke
	 * @throws URISyntaxException
	 * @throws IOException
	 */
	public String invoke() throws URISyntaxException, IOException, BadPaddingException, InvalidKeyException, IllegalBlockSizeException {
		String customerCode = getRequest().getParameter("customerCode");
		String outid = getRequest().getParameter("outid");

		DESedeCoder desCoder = new DESedeCoder();
		ActionContext.getContext().put("key",desCoder.encrypt("1=1&outid="+outid+"&customerCode="+customerCode).getHexString());
        LoggerUtils.info(outid,customerCode,"验证通过,请求首页");
        //ActionContext context = ActionContext.getContext();
		//context.put("outid", outid);
		//context.put("customerCode", customerCode);
		//gateWayUrl = "/mobile/index.html?outid=" + outid + "&customerCode=" + customerCode;
		return Route.INDEX.action();

		//调用玩校接口判断，获取用户信息
		/*	UserInfoRequestContext uircContext = new UserInfoRequestContext(outid, customerCode);
			String result = uircContext.sendRequest();
			System.out.println(result);

			//上面检查完毕，发送请求到玩校
			return null;*/
	}

	/**
	 * 
	 * H5访问中转路由。 前端页面在之前已经写好。固定访问一个地址。<br>
	 * 请求先走route , 之后根据请求命令字中转到相关的action
	 * 
	 * @Title: route
	 * @return String
	 * @throws IOException
	 */
	public void route() throws Exception {
		String outid = getRequest().getParameter("outid");
		String customerCode = getRequest().getParameter("customerCode");

		//验证key
		String key = getRequest().getParameter("key");
		if(StringUtils.isBlank(key)){
			ajaxOutPutJson(ResponseMsg.fail().message("key参数为空!").code("99"));
			return;
		}

		DESedeCoder desCoder = new DESedeCoder();
		String ogrinalKey = desCoder.decryptByHexString(key).getString();
		Map<String,String> paramsMap = ParseUrlParameter.URLRequest(ogrinalKey);
		if(!outid.equals(paramsMap.get("outid".toLowerCase())) || !customerCode.equalsIgnoreCase(paramsMap.get("customerCode".toLowerCase()))){
			ajaxOutPutJson(ResponseMsg.fail().message("key参数错误!").code("99"));
			return;
		}

		String command = getRequest().getParameter("method");
		/*
		 * 圈存
		 */
		if ("XYK_QC".equals(command)) {
			qcPayOrder();
			return;
		}

		/*
		 * 银行列表 
		 */
		if ("XYK_SIGN_BANK".equals(command)) {
			qcBankList();
			return;
		}

		String param = getRequest().getParameter("param");
        System.out.println(JSON.toJSONString(param));
		String result = RequestUtils.sendRequest(command, customerCode, param);

		//绑卡额外处理
		if ("XYK_REG_BIND".equalsIgnoreCase(command)) {
			JSONObject json = JSON.parseObject(result);
			if ("000".equals(json.getString("code")) && json.getJSONObject("body").getBooleanValue("result_")) {
				String userId = json.getJSONObject("body").getString("userid");
				bind(userId);
			} else {
				ajaxOutPutJson(ResponseMsg.fail().message("绑卡失败!").code("001").buildJSONMessage());
			}
			return;
		}
		//解绑额外处理
		if ("XYK_UNBIND".equalsIgnoreCase(command)) {
			JSONObject json = JSON.parseObject(result);
			if ("000".equals(json.getString("code")) && json.getJSONObject("body").getBooleanValue("result_")) {
				unbind();
			} else {
				ajaxOutPutJson(ResponseMsg.fail().message("解绑失败!").code("001").buildJSONMessage());
			}
			return;
		}

		ajaxOutPutJson(result);
	}

	/**
	 * 绑卡操作
	 * 
	 * @Title: bind
	 * @param userId
	 */
	@AuthSource(check = false)
	public void bind(String userId) throws IOException {
		String customerCode = getRequest().getParameter("customerCode");
		String param = getRequest().getParameter("param");
		JSONObject bindInfo = JSON.parseObject(param);
		String outid = bindInfo.getString("outid");

		Student student = null;

		List<Student> students = (List<Student>) studentManager.findByCondition(Conditions.eq("outId", outid),
				Conditions.eq("customerCode", customerCode));

		if (students.size() > 0) {
			student = students.get(0);
			student.setBindCardState(true);
			student.setOutId(outid);
			student.setUserid(userId);
			student = studentManager.update(student);
		} else {
			student = new Student();
			student.setBindCardState(true);
			student.setCustomerCode(customerCode);
			student.setName(bindInfo.getString("name"));
			student.setOutId(bindInfo.getString("outid"));
			//student.setParam(param);
			student.setUserid(userId);
			student.setDate(new Date());
			student = studentManager.save(student);
		}

		if (student != null) {
			ajaxOutPutJson(ResponseMsg.success().message("绑卡成功!").buildJSONMessage());
		} else {
			ajaxOutPutJson(ResponseMsg.fail().code("002").message("绑卡失败!").buildJSONMessage());
		}
	}

	/**
	 * 解绑操作
	 * 
	 * @throws IOException
	 * 
	 * @Title: unbind void
	 */
	@AuthSource(check = false)
	public void unbind() throws IOException {
		String customerCode = getRequest().getParameter("customerCode");
		String param = getRequest().getParameter("param");
		JSONObject bindInfo = JSON.parseObject(param);
		String outid = bindInfo.getString("outid");

		List<Student> students = (List<Student>) studentManager.findByCondition(Conditions.eq("outId", outid),
				Conditions.eq("customerCode", customerCode));

		if (students.size() <= 0) {
			ajaxOutPutJson(ResponseMsg.fail().code("99").message("解绑失败,用户不存在?").buildJSONMessage());
			return;
		} else {
			Student student = students.get(0);
			student.setBindCardState(false);
			studentManager.update(student);
			ajaxOutPutJson(ResponseMsg.success().message("解绑成功！").buildJSONMessage());
			return;
		}
	}

	/**
	 * 圈存获取银行列表
	 * 
	 * @Title: qcPayOrder
	 * @throws IOException
	 */
	public void qcBankList() throws IOException {
		String customerCode = getRequest().getParameter("customerCode");
		String customerid = getRequest().getParameter("customerid"); //一卡通用户编号, 不是玩校customerId
		String dpcode = getRequest().getParameter("dpcode");
		String outid = getRequest().getParameter("outid");
		String command = getRequest().getParameter("method");

		if (StringUtils.isBlank(customerCode) || StringUtils.isBlank(outid) || StringUtils.isBlank(customerid)
				|| StringUtils.isBlank(dpcode) || StringUtils.isBlank(command)) {
			ajaxOutPutJson(ResponseMsg.fail().code("55").message("参数错误!"));
			return;
		}

		//String command = RequestUtils.METHOD.get(method);

		String param = "{outid:\"" + outid + "\"}";
        //获取token
		String tokenStr = RequestUtils.sendRequest("XYK_QC_TOKEN", customerCode, param); //获取token
        JSONObject tokenJson = JSON.parseObject(tokenStr);
        JSONObject body = JSON.parseObject(tokenJson.getString("body"));
        if(!"000".equals(tokenJson.getString("code")) ||  !body.getBooleanValue("_result")){ //获取token失败
            ajaxOutPutJson(tokenStr);
            return;
        }
        //获取银行列表
		JSONObject pa = new JSONObject();
		pa.put("outid", outid);
		pa.put("key", getSignBanksMD5(dpcode, customerid, body.getString("_message")));
		String bankList = RequestUtils.sendRequest(command, customerCode, pa.toJSONString()); //获取银行列表
		ajaxOutPutJson(bankList);
	}

	/**
	 * 圈存
	 * 
	 * @throws IOException
	 * @Title: qcPayOrder
	 */
	public void qcPayOrder() throws IOException {
		String customerCode = getRequest().getParameter("customerCode");
		String customerid = getRequest().getParameter("customerid"); //一卡通用户编号, 不是玩校customerId
		String dpcode = getRequest().getParameter("dpcode");
		String outid = getRequest().getParameter("outid");
		String command = getRequest().getParameter("method");

		String bankId = getRequest().getParameter("bankId");
		String money = getRequest().getParameter("money");
		String password = getRequest().getParameter("password");

		if (StringUtils.isBlank(customerCode) || StringUtils.isBlank(outid) || StringUtils.isBlank(customerid)
				|| StringUtils.isBlank(dpcode) || StringUtils.isBlank(command)) {
			ajaxOutPutJson(ResponseMsg.fail().code("55").message("参数错误!"));
			return;
		}

		//String command = RequestUtils.METHOD.get(method);
		String param = "{outid:\"" + outid + "\"}";
        //获取token
		String tokenStr = RequestUtils.sendRequest("XYK_QC_TOKEN", customerCode, param); //获取token
        JSONObject tokenJson = JSON.parseObject(tokenStr);
        JSONObject body = JSON.parseObject(tokenJson.getString("body"));
        if(!"000".equals(tokenJson.getString("code")) ||  !body.getBooleanValue("_result")){ //获取token失败
            ajaxOutPutJson(tokenStr);
            return;
        }
        //圈存操作
		JSONObject pa = new JSONObject();
		pa.put("outid", outid);
		pa.put("bankId", bankId);
		pa.put("money", money);
		pa.put("md5password", MD5.MD5EncodeUpperCase(password));
		pa.put("key", getQcMD5(dpcode, customerid, bankId, money, body.getString("_message")));

		String result = RequestUtils.sendRequest(command, customerCode, pa.toJSONString());
		ajaxOutPutJson(result);
	}

	/**
	 * 获取 签约银行 md5
	 * 
	 * @param token
	 * @return
	 */
	private static String getSignBanksMD5(String dpcode, String customerid, String token) {
		BigInteger t1 = new BigInteger(token.substring(0, 14));
		BigInteger t2 = new BigInteger(token.substring(14, token.length()));
		String tmp = dpcode + customerid + (t1.longValue() - t2.longValue());
		return MD5.MD5EncodeUpperCase(tmp);
	}

	/**
	 * 获取 圈存提交 md5
	 * 
	 * @param token
	 * @return
	 */
	private static String getQcMD5(String dpcode, String customerid, String bankId, String money, String token) {
		BigInteger t1 = new BigInteger(token.substring(0, 14));
		BigInteger t2 = new BigInteger(token.substring(14, token.length()));
		String tmp = dpcode + customerid + bankId + money + (t1.longValue() - t2.longValue());
		return MD5.MD5EncodeUpperCase(tmp);

	}

	public void setCustomerManager(CustomerManager customerManager) {
		this.customerManager = customerManager;
	}

	public void setStudentManager(StudentManager studentManager) {
		this.studentManager = studentManager;
	}

	public void setGateWayUrl(String gateWayUrl) {
		this.gateWayUrl = gateWayUrl;
	}

	public String getGateWayUrl() {
		return gateWayUrl;
	}

}
