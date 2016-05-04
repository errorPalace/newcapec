/**
 * @Title: ResponseMsg.java
 * @Package net.newcapec.ewpp.xyk.utils
 * Copyright: Copyright (c) 2015
 * Company:新开普电子股份有限公司
 * 
 * @author lhf
 * @date 2015年10月19日 下午8:19:39
 * @version V1.0
 */
package net.newcapec.campus.quickaccess.utils;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

/**
 * @ClassName: ResponseMsg
 * @Description: 返回信息封装
 * @author lhf
 * @date 2015年10月19日 下午8:19:39
 * 
 */
public class ResponseMsg {
	private boolean result_;
	private String code;
	private Object msg;
	private Object body;

	/**
	 * 成功消息封装
	 */
	public static Response success() {
		Response response = new Response(true);
		response.setCode("000");
		return response;
	}

	/**
	 * 失败消息封装
	 */
	public static Response fail() {
		return new Response(false);
	}

	/**
	 * 自定义消息状态
	 */
	public static Response state(boolean result) {
		return new Response(result);
	}

	public boolean isResult_() {
		return result_;
	}

	protected void setResult_(boolean result_) {
		this.result_ = result_;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Object getMsg() {
		return msg;
	}

	public void setMsg(Object msg) {
		this.msg = msg;
	}

	public Object getBody() {
		return body;
	}

	public void setBody(Object body) {
		this.body = body;
	}


	public static class Response extends ResponseMsg {
		Map<String, Object> customFeild = null;

		public Response(boolean result) {
			this.setResult_(result);
		}

		public Response result(boolean result) {
			this.setResult_(result);
			return this;
		}

		public Response code(String code) {
			this.setCode(code);
			return this;
		}

		public Response message(Object message) {
			this.setMsg(message);
			return this;
		}

		public Response data(Object data) {
			this.setBody(data);
			return this;
		}

		public Response custom(String key, Object val) {

			if (customFeild == null) { //没有考虑到线程不安全的类使用custom方法，（可以把map换成currentMap、hashtableb,并修改成如下代码）
				customFeild = new HashMap<String, Object>();
			}
			/*synchronized (val) {  
				if (customFeild == null) {
					customFeild = new HashMap<String, Object>();
				}
			}*/

			customFeild.put(key, val);
			return this;
		}

		public String buildJSONMessage() {
			if (customFeild == null) {
				return JSON.toJSONString(this);
			} else {
				JSONObject json = (JSONObject) JSON.toJSON(this);
				json.putAll(customFeild);
				return json.toJSONString();
			}
		}
	}

}
