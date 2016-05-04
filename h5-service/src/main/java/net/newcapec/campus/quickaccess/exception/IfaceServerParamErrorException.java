package net.newcapec.campus.quickaccess.exception;


/**
 * 参数错误异常
 * @author zhaohua
 *
 */
public class IfaceServerParamErrorException  extends Exception{
	private static final long serialVersionUID = 1L;
	private String body;
	public IfaceServerParamErrorException(String msg,String data) {
		super(msg);
		this.setBody(data);
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}	
	
}
