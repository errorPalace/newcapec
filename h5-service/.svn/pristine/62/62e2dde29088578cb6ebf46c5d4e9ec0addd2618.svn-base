/**
 * @Title: UserInfoRequestContext.java
 * @Package net.newcapec.campus.quickaccess.request.context
 * Copyright: Copyright (c) 2015
 * Company:新开普电子股份有限公司
 * 
 * @author lhf
 * @date 2015年12月10日 下午3:20:21
 * @version V1.0
 */
package net.newcapec.campus.quickaccess.request.context;


/**
 * @ClassName: UserInfoRequestContext
 * @author lhf
 * @date 2015年12月10日 下午3:20:21
 *
 */
public class UserInfoRequestContext extends BaseRequestContext {
	public String outid;
	private String customerCode;

	public UserInfoRequestContext(String outid, String customerCode) {
		this.customerCode = customerCode;
		this.outid = outid;
	}


	public String getOutid() {
		return outid;
	}

	public void setOutid(String outid) {
		this.outid = outid;
	}

	/*
	 * @see net.newcapec.campus.quickaccess.request.context.RequestContext#command()
	 */
	@Override
	public String command() {
		return "queryByOutid";
	}

	/*
	 * @see net.newcapec.campus.quickaccess.request.context.RequestContext#customerCode()
	 */
	@Override
	public String customerCode() {
		return customerCode;
	}

}
