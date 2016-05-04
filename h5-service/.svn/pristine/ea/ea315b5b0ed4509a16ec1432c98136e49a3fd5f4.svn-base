package net.newcapec.campus.quickaccess.action;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSONObject;

import net.newcapec.campus.quickaccess.entity.Customer;
import net.newcapec.campus.quickaccess.entity.Student;
import net.newcapec.campus.quickaccess.manager.CustomerManager;
import net.newcapec.campus.quickaccess.manager.StudentManager;
import net.newcapec.v3.core.web.action.AbstractSimpleGridBaseAction;
import net.newcapec.v3.extend.orm.Condition;
import net.newcapec.v3.extend.orm.condition.Conditions;

public class StudentAction extends AbstractSimpleGridBaseAction<Student>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 805592616961210123L;
	private StudentManager studentManager;
	private CustomerManager customerManager;

	@Override
	protected Serializable getObjectId(Student s) {
		return s.getId();
	}
	
	@Override
	protected JSONObject dataToJSONObject(Student data){
		JSONObject jsonObject=(JSONObject) JSONObject.toJSON(data);
		Customer customer = this.customerManager.getCustomerByCode(data.getCustomerCode());
		String customerName=customer.getCustomerName();
		jsonObject.put("customerName", customerName);
		jsonObject.put("date", data.getDate()!=null?DateFormatUtils.format(data.getDate(), "yyyy-MM-dd HH:mm:ss"):"");
		jsonObject.put("state", Student.stateMap.get(data.isBindCardState()));
		return jsonObject;
	}
	
	@Override
	protected Collection<Condition> createConditions() throws Exception{
		Collection<Condition> conditions=new ArrayList<Condition>();
		String outId=this.getParameter("outId");
		if (StringUtils.isNotBlank(outId)) {
			conditions.add(Conditions.eq("outId", outId));
		}
		String customerCode=this.getParameter("customerCode");
		if (StringUtils.isNotBlank(customerCode)) {
			conditions.add(Conditions.eq("customerCode", customerCode));
		}
		conditions.add(Conditions.desc("date"));
		return conditions;
	}
	
	@Override
	public String view() throws Exception{
		String id=getParameter("id");
		Student student =getManager().findById(Long.valueOf(Long.parseLong(id)));
		JSONObject json = dataToJSONObject(student);
		setAttribute("data", json);
		return SUCCESS;
		
	}
	
	@Override
	public void delete() throws Exception{
		long id=getLongParameter("id");
		try {
			this.studentManager.deleteById(id);
			ajaxOutPutText(SUCCESS);
		} catch (Exception e) {
			log.error(null, e);
			ajaxOutPutText("ajax:删除失败！");
		}
	}

	public StudentManager getStudentManager() {
		return studentManager;
	}

	public void setStudentManager(StudentManager studentManager) {
		this.studentManager = studentManager;
	}

	public void setCustomerManager(CustomerManager customerManager) {
		this.customerManager = customerManager;
	}
	
}
