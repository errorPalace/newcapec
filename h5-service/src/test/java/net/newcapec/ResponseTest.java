/**
 * @Title: ResponseTest.java
 * @Package net.newcapec
 * Copyright: Copyright (c) 2015
 * Company:新开普电子股份有限公司
 * 
 * @author lhf
 * @date 2015年11月11日 下午4:58:53
 * @version V1.0
 */
package net.newcapec;

import net.newcapec.campus.quickaccess.utils.ResponseMsg;

import org.junit.Test;

/**
 * @ClassName: ResponseTest
 * @Description: TODO
 * @author lhf
 * @date 2015年11月11日 下午4:58:53
 *
 */
public class ResponseTest {

	@Test
	public void testRun() {
		System.out.println(ResponseMsg.fail().code("1").message("2").buildJSONMessage());
	}
}
