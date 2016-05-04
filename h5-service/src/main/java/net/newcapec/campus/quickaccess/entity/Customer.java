package net.newcapec.campus.quickaccess.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 学校 表
 * @author zhangpeng
 *
 */
@Table(name = "QUICKACCESS_CUSTOMER")
@Entity
public class Customer implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="ID_")
	private long id;
	/**
	 * 学校代码
	 */
	@Column(name="CUSTOMERCODE_",length=150)
	private String customerCode;

	/**
	 * 学校名称
	 */
	@Column(name="CUSTOMERNAME_",length=150)
	private String customerName;

	@Column(name = "CUSTOMERID_")
	private String customerId;

	/**
	 * 名字拼音
	 */
	@Column(name="PINYIN_")
	private String pinyin;

	/**
	 * 名字简拼
	 */
	@Column(name="JIANPIN_")
	private String jianpin;

	/**
	 * dpcode
	 */
	@Column(name="DPCODE_",length=150)
	private String dpcode;
	/**
	 * url
	 */
	@Column(name="URL_",length=200)
	private String url;
	/**
	 * 创建时间
	 */
	@Column(name="CREATEDATE_")
	private Date createDate;


	@Column(name = "SOURCEIPS_")
	private String sourceIps;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Customer other = (Customer) obj;
		if (id != other.id)
			return false;
		return true;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getCustomerCode() {
		return customerCode;
	}
	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getPinyin() {
		return pinyin;
	}
	public void setPinyin(String pinyin) {
		this.pinyin = pinyin;
	}
	public String getJianpin() {
		return jianpin;
	}
	public void setJianpin(String jianpin) {
		this.jianpin = jianpin;
	}
	public String getDpcode() {
		return dpcode;
	}
	public void setDpcode(String dpcode) {
		this.dpcode = dpcode;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getSourceIps() {
		return sourceIps;
	}

	public String[] getSourceIp() {
		if (sourceIps == null) {
			return new String[] {};
		}
		String[] ips = sourceIps.split(",");
		return ips;
	}

	public void SetSourceIp(String[] sourceIps) {
		if (sourceIps != null) {
			this.sourceIps = null;
			for (int i = 0; i < sourceIps.length; i++) {
				this.sourceIps += sourceIps[i] + ",";
			}
		}
	}

	public void setSourceIps(String sourceIps) {
		this.sourceIps = sourceIps;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}


}
