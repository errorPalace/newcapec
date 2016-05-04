package net.newcapec.campus.quickaccess.action;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import net.newcapec.campus.quickaccess.manager.CustomerManager;
import net.newcapec.campus.quickaccess.utils.PingYinUtil;
import net.newcapec.campus.quickaccess.entity.Customer;
import net.newcapec.v3.core.web.action.AbstractSimpleGridBaseAction;
import net.newcapec.v3.extend.orm.Condition;
import net.newcapec.v3.extend.orm.condition.Conditions;

public class CustomerAction extends AbstractSimpleGridBaseAction<Customer>{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3445485934246412049L;
	
	private CustomerManager customerManager;

	@Override
	protected Serializable getObjectId(Customer c) {
		return c.getId();
	}
	
	@Override
	protected JSONObject dataToJSONObject(Customer data){
		JSONObject jsonObject=(JSONObject) JSONObject.toJSON(data);
		jsonObject.put("customerCode", data.getCustomerCode());
		jsonObject.put("customerName", data.getCustomerName());
		jsonObject.put("sourceIp", data.getSourceIps());
		jsonObject.put("createDate", data.getCreateDate()!=null?DateFormatUtils.format(data.getCreateDate(), "yyyy-MM-dd HH:mm:ss"):"");
		return jsonObject;
		
	}
	
	@Override
	public Collection<Condition> createConditions() throws Exception{
		Collection<Condition> conditions=new ArrayList<Condition>();
		String customerCode=this.getParameter("customerCode");
		if (StringUtils.isNotBlank(customerCode)) {
			conditions.add(Conditions.eq("customerCode", customerCode));
		}
		String customerName=this.getParameter("customerName");
		if (StringUtils.isNotBlank(customerName)) {
			conditions.add(Conditions.eq("customerName", customerName));
		}
		conditions.add(Conditions.desc("createDate"));
		return conditions;
		
	}
	
	@Override
	public void add() throws Exception{
		String customerId=getParameter("customerId");
		String customerCode=getParameter("customerCode");
		String customerName=getParameter("customerName");
		String sourceIp=getParameter("sourceIp");
		String dpcode=getParameter("dpcode");
		String url=getParameter("url");
		Customer customer=new Customer();
		customer.setCustomerCode(customerCode);
		customer.setCustomerName(customerName);
		customer.setCustomerId(customerId);
		customer.setSourceIps(sourceIp);
		customer.setDpcode(dpcode);
		customer.setUrl(url);
		customer.setPinyin(PingYinUtil.getPingYin(customerName));
		customer.setJianpin(PingYinUtil.getFirstSpell(customerName));
		customer.setCreateDate(new Date());
		List<Customer> customers=this.customerManager.findByCondition(Conditions.eq("customerCode", customerCode));
		if (customers.size()>0) {
			ajaxOutPutText("ajax:学校已存在！");
		}else {
			this.customerManager.saveCustomer(customer);
			ajaxOutPutText(SUCCESS);
		}
	}
	
	@Override
	public void delete() throws Exception{
		long id=getLongParameter("id");
		try {
			this.customerManager.deleteCustomer(id);
		} catch (Exception e) {
			log.error(null, e);
			ajaxOutPutText("ajax:删除失败！");
			return;
		}
		ajaxOutPutText(SUCCESS);
	}
	
	@Override
	public void edit() throws Exception{
		long id=getLongParameter("id");
		String customerId=getParameter("customerId");
		String customerCode=getParameter("customerCode");
		String customerName=getParameter("customerName");
		String sourceIp=getParameter("sourceIp");
		String dpcode=getParameter("dpcode");
		String url=getParameter("url");
		Customer customer=this.customerManager.get(id);
		customer.setCustomerCode(customerCode);
		customer.setCustomerName(customerName);
		customer.setCustomerId(customerId);
		customer.setSourceIps(sourceIp);
		customer.setDpcode(dpcode);
		customer.setUrl(url);
		customer.setPinyin(PingYinUtil.getPingYin(customerName));
		customer.setJianpin(PingYinUtil.getFirstSpell(customerName));
		try {
			this.customerManager.updateCustomer(customer);
		} catch (Exception e) {
			log.error("null", e);
			ajaxOutPutText("ajax:更新失败！");
			return;
		}
		ajaxOutPutText(SUCCESS);
	}
	
	@Override
	public String view() throws Exception{
		Long id=getLongParameter("id");
		Customer customer=this.customerManager.findById(id);
		setAttribute("data", customer);
		return SUCCESS;
	}
	/**
	 * 学校选择控件后台数据，返回学校id，学校名称，学校名称简拼，全拼
	 * @throws IOException
	 */
	public void selectCustomer()throws IOException  {
		
		JSONArray re = new JSONArray();
		List<Customer> clist = this.getManager().findAll();
		for (Customer c : clist) {
			JSONObject o = new JSONObject();
			o.put("customerCode", c.getCustomerCode());
			o.put("name", c.getCustomerName());
			o.put("qp", c.getPinyin());
			o.put("jp", c.getJianpin());
			re.add(o);
		}
		this.ajaxOutPutText(re.toJSONString());
	}
	
	/**
	 * 初始化学校的拼音
	 * @throws IOException
	 */
	public void pinyinInit() throws IOException {
		try {
			this.customerManager.pinyinInit();
		} catch (Exception e) {
			log.error(null,e);
			this.ajaxOutPutText("ajax:初始化学校拼音失败！");
			return;
		}
		this.ajaxOutPutText(SUCCESS);
	}
	/**
	 * 初始化学校的简拼
	 * @throws IOException
	 */
	public void jianpinInit() throws IOException{
		try {
			this.customerManager.jianpinInit();
		} catch (Exception e) {
			log.error(null, e);
			ajaxOutPutText("ajax:初始化学校简拼失败！");
			return;
		}
		this.ajaxOutPutText(SUCCESS);
		
	}

	public void setCustomerManager(CustomerManager customerManager) {
		this.customerManager = customerManager;
	}
	

}
