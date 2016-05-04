/**
 * @Title: AuthSource.java
 * @Package net.newcapec.campus.quickaccess.boot.aop
 * Copyright: Copyright (c) 2015
 * Company:新开普电子股份有限公司
 * 
 * @author lhf
 * @date 2015年12月14日 下午1:55:08
 * @version V1.0
 */
package net.newcapec.campus.quickaccess.boot.aop;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @ClassName: AuthSource
 * @author lhf
 * @date 2015年12月14日 下午1:55:08
 *
 */

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AuthSource {
	public boolean check() default true;
}
