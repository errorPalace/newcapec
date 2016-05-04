package net.newcapec.campus.quickaccess.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.Charset;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;

import net.newcapec.v3.core.web.action.BaseAction;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSONObject;

/**
 * 业务服务接口调用
 * 
 * @author Administrator
 */
public class BaseServiceAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	/**
	 * 操作成功
	 */
	public static String MOBILE_SUCCESS = "100";
	/**
	 * 没有权限
	 */
	public static String MOBILE_LIMIT_FAILED = "101";
	/**
	 * 异常失败
	 */
	public static String MOBILE_EXCEPTION_FAILED = "102";

	protected String getDataParameter() {
		return this.getParameter("data");
	}

	protected String getAppCode() {
		return this.getParameter("appCode");
	}

	protected String getAppVersion() {
		return this.getParameter("appVersion");
	}

	protected String readRequestJsonString() throws IOException {
		HttpServletRequest request = this.getRequest();
		// 获取请求数据
		// 请求流
		ServletInputStream is = request.getInputStream();
		// 请求数据待存流
		ByteArrayOutputStream byteOS = new ByteArrayOutputStream();
		IOUtils.copy(is, byteOS);
		String acceptEncoding = request.getHeader("Accept-Encoding");

		String characterEncoding = request.getCharacterEncoding();
		this.log.debug("received data characterEncoding:{}", characterEncoding);
		if (StringUtils.isBlank(characterEncoding)) {
			characterEncoding = Charset.defaultCharset().name();
		}

		// 将待存流中的数据根据请求时设定的字符集组成字符串，即为请求数据包的数据体
		String jsondata = byteOS.toString(characterEncoding);
		this.log.debug("接收到请求数据[characterEncoding:{},acceptEncoding:{}]:{}", new Object[] { characterEncoding, acceptEncoding, jsondata });
		return jsondata;
	}

	protected JSONObject readRequestJSONObject() throws IOException {
		try {
			String jsondata = this.readRequestJsonString();
			return JSONObject.parseObject(jsondata);
		} catch (Exception e) {
			this.log.warn("读取的json格式遇到错误。", e);
			return new JSONObject();
		}
	}

}
