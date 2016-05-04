/**
 * @Title: ValidInterceptor.java
 * @Package net.newcapec.campus.quickaccess.boot.aop
 * Copyright: Copyright (c) 2015
 * Company:新开普电子股份有限公司
 * @author lhf
 * @date 2015年12月11日 下午2:51:26
 * @version V1.0
 */
package net.newcapec.campus.quickaccess.boot.aop;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
import net.newcapec.campus.quickaccess.entity.Customer;
import net.newcapec.campus.quickaccess.entity.Student;
import net.newcapec.campus.quickaccess.manager.CustomerManager;
import net.newcapec.campus.quickaccess.manager.StudentManager;
import net.newcapec.campus.quickaccess.utils.*;
import net.newcapec.v3.extend.orm.condition.Conditions;
import org.apache.commons.lang.StringUtils;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * @ClassName: ValidInterceptor
 * @author lhf
 * @date 2015年12月11日 下午2:51:26
 *
 */
public class AuthInterceptor extends AbstractInterceptor {
    /**
     */
    private static final long serialVersionUID = 1L;
    private static final String ajaxRequest = "XMLHttpRequest";
    //private static final String requestHeaderDevice = "device";

    /*
     * @see com.opensymphony.xwork2.interceptor.AbstractInterceptor#intercept(com.opensymphony.xwork2.ActionInvocation)
     */
    @Override
    public String intercept(ActionInvocation invocation) throws NoSuchMethodException, IOException {

        // 获取ActionContext
        ActionContext actionContext = invocation.getInvocationContext();
        HttpServletRequest request = (HttpServletRequest) actionContext.get(ServletActionContext.HTTP_REQUEST);
        //HttpServletResponse response = (HttpServletResponse) actionContext.get(ServletActionContext.HTTP_RESPONSE);
        try {
            /*Object action = invocation.getAction();
			Method method2 = getActionMethod(action.getClass(), invocation.getProxy().getMethod());
			if (method2.isAnnotationPresent(AuthSource.class)) {
				AuthSource as = method2.getAnnotation(AuthSource.class);
				if (!as.check()) {
					return invocation.invoke();
				}
			}*/
            String customerCode = request.getParameter("customerCode");
            String outid = request.getParameter("outid");
            /*
			 * 放入actionContext
			 */
            ActionContext context = invocation.getInvocationContext();
            context.put("outid", outid);
            context.put("customerCode", customerCode);

            //String ecardUserName = request.getParameter("cardUserName");
            //检查参数
            if (StringUtils.isBlank(customerCode) || StringUtils.isBlank(outid)) {
                LoggerUtils.info(outid, customerCode, "请求参数错误,请求IP:" + request.getRemoteAddr());
                return error_gateway(actionContext, Route.ERROR, "参数错误!");
            }

            LoggerUtils.info(outid, customerCode, "请求开始请求,请求方法：" + actionContext.getName() + ",请求来源IP:" + request.getRemoteAddr());

            CustomerManager customerManager = (CustomerManager) ModuleBeanUtils.getBean("customerManager");
            //获取学校信息
            Customer customer = customerManager.getCustomerByCode(customerCode);
            if (customer == null) {
                return error_gateway(actionContext, Route.ERROR, "该校暂未开通玩校快速访问接口!");
            }

            //是否验证IP
           if(!customer.getSourceIps().contains("*")) {
               //route由H5页面发起，不进行ip验证
               if (!"route".equalsIgnoreCase(actionContext.getName())) {
                   //检查来源IP
                   String sourceIp = request.getRemoteAddr();
                   String[] ips = customer.getSourceIp();
                   if (ips.length <= 0) {
                       return error_gateway(actionContext, Route.ERROR, "该校没有设置IP白名单，不能访问该接口!");
                   }

                   boolean checkIpFlag = false;
                   for (String ip : ips) {
                       if (ip.equalsIgnoreCase(sourceIp)) {
                           checkIpFlag = true;
                           break;
                       }
                   }

                   if (!checkIpFlag) {
                       return error_gateway(actionContext, Route.ERROR, "不合法的请求!IP来源错误!");
                   }
               }
           }

            //正在绑卡，则不进行下面的判断
            String method = request.getParameter("method");
            if ("XYK_REG_BIND".equalsIgnoreCase(method)) {
                return invocation.invoke();
            }

            StudentManager studentManager = (StudentManager) ModuleBeanUtils.getBean("studentManager");
            List<Student> students = (List<Student>) studentManager.findByCondition(Conditions.eq("outId", outid),
                    Conditions.eq("customerCode", customerCode));

            if (students.size() <= 0) {
                DESedeCoder desCoder = new DESedeCoder();
                context.put("customerName", Base64SafeURL.encodeUTF8(customer.getCustomerName()));
                context.put("key", desCoder.encrypt("1=1&outid=" + outid + "&customerCode=" + customerCode).getHexString());
                return error_gateway(actionContext, Route.BIND, "没有绑卡，请先进行绑卡操作!(ERR_BIND_001)");
            }

            Student student = students.get(0);
            if (!student.isBindCardState() || StringUtils.isBlank(student.getUserid())) {
                DESedeCoder desCoder = new DESedeCoder();
                context.put("customerName", Base64SafeURL.encodeUTF8(customer.getCustomerName()));
                context.put("key", desCoder.encrypt("1=1&outid=" + outid + "&customerCode=" + customerCode).getHexString());
                return error_gateway(actionContext, Route.BIND, "没有绑卡，请先进行绑卡操作!(ERR_BIND_002)");
            }

            return invocation.invoke();
        }catch (Exception e) {
            LoggerUtils.getLogger().error("出现错误:",e);
            return error_gateway(actionContext, Route.ERROR, "key校验错误!");
        }
    }

    private String error_gateway(ActionContext actionContext, Route route, String... errMsg) throws IOException {
        //获取request域中信息
        HttpServletRequest req = ServletActionContext.getRequest();

        //获得请求类型
        String type = req.getHeader("X-Requested-With");
        String h5Type = req.getHeader("Campus-H5-Request"); //http || ajax

        //ajax请求
        if (ajaxRequest.equalsIgnoreCase(type) || "ajax".equalsIgnoreCase(h5Type)) {
            HttpServletResponse response = ServletActionContext.getResponse();
            response.setContentType("application/json;charset=utf-8");
            PrintWriter printWriter = response.getWriter();
            printWriter.print(ResponseMsg.fail().code("99").message(errMsg).buildJSONMessage());
            printWriter.flush();
            printWriter.close();
            return null;
        } else {
            actionContext.put("errmsg", errMsg[0]);
            return route.action();
        }
    }

	/*@SuppressWarnings({ "rawtypes", "unchecked" })
	protected Method getActionMethod(Class actionClass, String methodName) throws NoSuchMethodException {
		Method method;
		try {
			method = actionClass.getMethod(methodName, new Class[0]);
		} catch (NoSuchMethodException e) {
			try {
				String altMethodName = "do" + methodName.substring(0, 1).toUpperCase() + methodName.substring(1);
				method = actionClass.getMethod(altMethodName, new Class[0]);
			} catch (NoSuchMethodException e1) {
				throw e;
			}
		}
		return method;
	}*/
}
