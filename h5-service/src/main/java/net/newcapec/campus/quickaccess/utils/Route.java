/**
 * @Title: Route.java
 * @Package net.newcapec.campus.quickaccess.utils
 * Copyright: Copyright (c) 2015
 * Company:新开普电子股份有限公司
 * 
 * @author lhf
 * @date 2015年12月10日 下午5:08:36
 * @version V1.0
 */
package net.newcapec.campus.quickaccess.utils;

/**
 * @ClassName: Route
 * @author lhf
 * @date 2015年12月10日 下午5:08:36
 * 
 */
public enum Route {
	INDEX("index"), BIND("bind"), ERROR("error");

	private String routeName;

	private Route(String routeName) {
		this.routeName = routeName;
	}

	/**
	 * 
	 * 返回action对应的跳转
	 * 
	 * @Title: action
	 * @return String 返回跳转码
	 */
	public String action() {
		return routeName;
	}
}
