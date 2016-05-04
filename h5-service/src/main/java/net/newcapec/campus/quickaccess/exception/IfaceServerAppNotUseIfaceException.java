package net.newcapec.campus.quickaccess.exception;


/**
 * 应用无权使用该服务
 * @author zhaohua
 *
 */
public class IfaceServerAppNotUseIfaceException  extends Exception{
	private static final long serialVersionUID = 1L;
	public IfaceServerAppNotUseIfaceException(String msg) {
		super(msg);
	}	
}
