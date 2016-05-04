package net.newcapec.campus.quickaccess.exception;


/**
 * 处理玩校返回错误是的所有情况，将返回的错误数据，记录反馈给前端，并记录日志
 * @author zhaohua
 *
 */
public class IfaceServerExecuteErrorException  extends Exception{
	private static final long serialVersionUID = 1L;
	private String body;
	public IfaceServerExecuteErrorException(String msg) {
		super(msg);
	}
	public IfaceServerExecuteErrorException(String msg,String data) {
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
