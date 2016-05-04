package net.newcapec.campus.h5.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

/**
 * 图书馆用户喜欢类别 产品确定手输入 不是选！
 * 
 */
@Table(name = "LIBRARY_USER_LIKE_TYPE_")
@Entity
public class LibraryUserLikeType extends BaseEntity implements Serializable {

	/**
     *
     */
	private static final long serialVersionUID = 1L;

	/**
	 * outId
	 */
	@Column(name = "OUTID_")
	private String outId;

	/**
	 * customercode
	 */
	@Column(name = "CUSTOMERCODE_")
	private String customercode;
	/**
	 * 喜欢的类型
	 */
	@Column(name = "LIKETYPE_")
	private String likeType;

	public String getOutId() {
		return outId;
	}

	public void setOutId(String outId) {
		this.outId = outId;
	}

	public String getLikeType() {
		return likeType;
	}

	public void setLikeType(String likeType) {
		this.likeType = likeType;
	}

	public String getCustomercode() {
		return customercode;
	}

	public void setCustomercode(String customercode) {
		this.customercode = customercode;
	}

}
