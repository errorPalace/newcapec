package net.newcapec.campus.quickaccess.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.newcapec.v3.core.common.Operator;
import net.newcapec.v3.extend.security.V3SecurityContext;
import net.newcapec.v3.security.entity.MenuItem;
import net.newcapec.v3.security.service.SecurityPageExtend;

public class CampusTSecurityPageExtendImpl implements SecurityPageExtend {

	@Override
	public void onEnterMainPage(HttpServletRequest request, HttpServletResponse response) {
		request.setAttribute("rootMenuID", MenuItem.ROOT_MENU_ID);
		request.setAttribute("childrenMenuItems", V3SecurityContext.getTreeMenuItems());
		
		Operator currOperator = V3SecurityContext.getCurrentOperator();
		
		request.setAttribute("currUserName", currOperator.getName());
		request.setAttribute("isAdmin", currOperator.isAdministrator());
	}

	@Override
	public void onEnterLoginPage(HttpServletRequest request, HttpServletResponse response) {
	}

}
