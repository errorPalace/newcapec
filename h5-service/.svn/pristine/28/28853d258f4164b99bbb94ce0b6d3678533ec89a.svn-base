/**
 * @Title: RequestUtils.java
 * @Package net.newcapec.campus.quickaccess.request.context
 * Copyright: Copyright (c) 2015
 * Company:新开普电子股份有限公司
 * 
 * @author lhf
 * @date 2015年12月11日 上午8:55:29
 * @version V1.0
 */
package net.newcapec.campus.quickaccess.request.context;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import net.newcapec.campus.quickaccess.utils.HttpRequestUtils;
import net.newcapec.campus.quickaccess.utils.ModuleBeanUtils;
import net.newcapec.campus.quickaccess.utils.Pboc3desmac;
import net.newcapec.campus.quickaccess.utils.PreferenceUtils;

/**
 * @ClassName: RequestUtils
 * @Description: TODO
 * @author lhf
 * @date 2015年12月11日 上午8:55:29
 *
 */
public class RequestUtils {

	public static final HashMap<String, String> METHOD = new HashMap<String, String>() {
		private static final long serialVersionUID = 1631617244716231150L;

		{
			put("XYK_BASE_INFO", "QueryUserByOutid");// 基本信息
			put("XYK_TRADE_DETAIL", "QueryTrade");// 用户交易明细
			put("XYK_LOST_CARD", "CardLose");// 用户卡挂失
			put("XYK_MODIFY_PASSWORD", "UpdateUserCardQueryPwd");// 修改查询密码
			put("XYK_CLAIM", "QueryFundDatils");// 领款查询

			put("XYK_QC_TOKEN", "GetQcToken");//获取圈存token
			put("XYK_QC", "Qc");//圈存充值
			put("XYK_SIGN_BANK", "QuerySignBankList");//获取签约银行列表

			put("XYK_CHECK_IN", "PICK_CARD");// 捡卡登记
			//put("XYK_CHECK_IN", "T01009");// 捡卡登记
			put("XYK_REG_BIND", "registAndBindH5");//绑卡
			put("XYK_UNBIND", "unBindEcard");//绑卡

			put("WX_SCHOOL_LIST", "QuerySchoolList");//学校列表
			put("WX_BASE_INFO", "");//玩校基本信息

		}
	};

	public static String sendRequest(String command, String customerCode, String param) throws IOException {
		PreferenceUtils preference = (PreferenceUtils) ModuleBeanUtils.getBean("preferenceUtils");
		String url = preference.getOpenCampusUrl();
		String appId = preference.getOpenCampusFlag();
		String secret = preference.getOpenCampusSign();

		Map<String, String> requestData = new HashMap<String, String>();

		requestData.put("appId", appId);
		requestData.put("customerCode", customerCode);
		requestData.put("command", METHOD.get(command));
		requestData.put("param", param);

		String sign = Pboc3desmac.sort(requestData);
		String signTemp = "key=" + secret + "&" + sign;
		System.out.println(signTemp);
		String sig = Pboc3desmac.string2MD5(signTemp);
		requestData.put("sign", sig.toUpperCase());

		System.out.println(requestData);

		String result = HttpRequestUtils.sendHttpRequestForm(url, requestData);
		return result;
	}
	public static String sendRequestH5(String command, String customerCode, String param) throws IOException {
		PreferenceUtils preference = (PreferenceUtils) ModuleBeanUtils.getBean("preferenceUtils");
		String url = preference.getH5OpenCampusUrl();
		String appId = preference.getOpenCampusFlag();
		String secret = preference.getOpenCampusSign();

		Map<String, String> requestData = new HashMap<String, String>();

		requestData.put("appId", appId);
		requestData.put("customerCode", customerCode);
		requestData.put("command", command);
		requestData.put("param", param);

		String sign = Pboc3desmac.sort(requestData);
		String signTemp = "key=" + secret + "&" + sign;
		System.out.println(signTemp);
		String sig = Pboc3desmac.string2MD5(signTemp);
		requestData.put("sign", sig.toUpperCase());

		System.out.println(requestData);

		String result = HttpRequestUtils.sendHttpRequestForm(url, requestData);
		return result;
	}
}
