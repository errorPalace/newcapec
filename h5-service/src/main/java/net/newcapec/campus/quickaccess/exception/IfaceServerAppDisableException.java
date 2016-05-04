package net.newcapec.campus.quickaccess.exception;


/**
 * 应用被禁用
 * @author zhaohua
 *
 */
public class IfaceServerAppDisableException  extends Exception{
	private static final long serialVersionUID = 1L;
	public IfaceServerAppDisableException(String msg) {
		super(msg);
	}
}
