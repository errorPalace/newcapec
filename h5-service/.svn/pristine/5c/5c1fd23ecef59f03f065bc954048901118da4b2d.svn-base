/**
 * @Title: RequestFactory.java
 * @Package net.newcapec.campus.quickaccess.request.context
 * Copyright: Copyright (c) 2015
 * Company:新开普电子股份有限公司
 * 
 * @author lhf
 * @date 2015年12月10日 下午4:09:38
 * @version V1.0
 */
package net.newcapec.campus.quickaccess.request.context;

import javax.servlet.http.HttpServletRequest;

/**
 * @ClassName: RequestFactory
 * @author lhf
 * @date 2015年12月10日 下午4:09:38
 * 
 */
public class RequestFactory {
	public static BaseRequestContext getRequextContext(String command, HttpServletRequest request) {
		BaseRequestContext baseRequestContext = null;
		switch (command) {
		case "XYK_BASE_INFO":// 基本信息
			UserInfoRequestContext userInfoRequestContext = new UserInfoRequestContext(request.getParameter("outid"),
					request.getParameter("customerCode"));
			baseRequestContext = userInfoRequestContext;
			break;
		case "XYK_LOST_CARD":// 用户交易明细

			break;
		case "XYK_TRADE_DETAIL":// 用户卡挂失
			break;
		case "XYK_MODIFY_PASSWORD": // 修改查询密码
			break;
		case "XYK_CLAIM": // 领款查询
			break;
		case "XYK_QC_TOKEN": //获取圈存token
			break;
		case "XYK_QC": //圈存充值
			break;
		case "XYK_SIGN_BANK": //获取签约银行列表
			break;
		case "WX_SCHOOL_LIST": //学校列表
			break;
		default:
			throw new NullPointerException("没有该命令字!");
		}
		return baseRequestContext;
	}
}
