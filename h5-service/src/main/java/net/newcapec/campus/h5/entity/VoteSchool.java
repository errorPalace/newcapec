package net.newcapec.campus.h5.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "VOTE_SCHOOL_")
@Entity
public class VoteSchool implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID_")
	private long id;

	@Column(name = "CUSTOMERCODE_")
	private String customerCode;

	@Column(name = "CUSTOMERNAME_")
	private String customerName;

	@Column(name = "POLL_")
	private long poll;

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

	public long getPoll() {
		return poll;
	}

	public void setPoll(long poll) {
		this.poll = poll;
	}

}
