/**
 * @Title: RequestContext.java
 * @Package net.newcapec.campus.quickaccess.request.context
 * Copyright: Copyright (c) 2015
 * Company:新开普电子股份有限公司
 * 
 * @author lhf
 * @date 2015年12月10日 下午3:12:55
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

import com.alibaba.fastjson.JSON;

/**
 * @ClassName: RequestContext
 * @author lhf
 * @date 2015年12月10日 下午3:12:55
 * 
 */
public abstract class BaseRequestContext {

	public abstract String command();

	public abstract String customerCode();

	public String sendRequest() throws IOException {
		PreferenceUtils preference = (PreferenceUtils) ModuleBeanUtils.getBean("preferenceUtils");
		String url = preference.getOpenCampusUrl();
		String appId = preference.getOpenCampusFlag();
		String secret = preference.getOpenCampusSign();

		Map<String, String> requestData = new HashMap<String, String>();

		requestData.put("appId", appId);
		requestData.put("customerCode", this.customerCode());
		requestData.put("command", this.command());
		requestData.put("param", JSON.toJSONString(this));

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
