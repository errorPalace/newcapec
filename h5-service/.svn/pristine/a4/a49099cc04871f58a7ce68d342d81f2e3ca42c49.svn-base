package net.newcapec.campus.quickaccess.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * 人员表
 * @author zhangpeng
 *
 */
@Table(name = "QUICKACCESS_STUDENT")
@Entity
public class Student implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public static final boolean bind =true; //已绑卡

	public static final boolean unbind = false;//未绑卡
	
	public static final Map<Boolean, String> stateMap = new HashMap<Boolean, String>();
	{
		stateMap.put(bind, "已绑定");
		stateMap.put(unbind, "未绑定");
	}

	@Id
	@Column(name="ID_")
	private long id;

	/**
	 * 学号
	 */
	@Column(name="OUTID_",length=200)
	private String outId;

	@Column(name = "NAME_")
	private String name;

	/**
	 * APPID
	 */
	@Column(name="APPID_",length=200)
	private String appId;

	/**
	 * APPNAME(新增)
	 */
	@Column(name="APPNAME_",length=200)
	private String appName;

	/**
	 * userid(新增)
	 */
	@Column(name="USERID_",length=200)
	private String userid;

	/**
	 * 学校Code
	 */
	@Column(name="CUSTOMERCODE_")
	private String customerCode;

	/**
	 * 学校Id
	 */
	@Column(name = "CUSTOMERID_")
	private String customerId;

	/**
	 * 个人值
	 */
	@Column(name="PARAM_",length=2000)
	private String param;

	@Column(name = "BINDCARDSTATE_")
	private boolean bindCardState;

	/**
	 * 时间
	 */
	@Column(name="DATE_")
	private Date date;

	/*@Column(name = "BINDECARDSTATE_")
	private boolean bindEcardState;*/

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getOutId() {
		return outId;
	}
	public void setOutId(String outId) {
		this.outId = outId;
	}
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getCustomerCode() {
		return customerCode;
	}
	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}
	public String getParam() {
		return param;
	}
	public void setParam(String param) {
		this.param = param;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}
	public String getUserid() {
		return userid;
	}
	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public boolean isBindCardState() {
		return bindCardState;
	}

	public void setBindCardState(boolean bindCardState) {
		this.bindCardState = bindCardState;
	}

}
