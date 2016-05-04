/**
 * 
 */
package net.newcapec.campus.h5.util;

import net.newcapec.v3.core.context.module.ModuleContext;
import net.newcapec.v3.core.context.module.ModuleContextAware;
import org.springframework.beans.BeansException;


public class BeanUtils implements ModuleContextAware {
	
	private static ModuleContext moduleContext;

	/* (non-Javadoc)
	 * @see net.newcapec.v3.core.context.module.ModuleContextAware#setModuleContext(net.newcapec.v3.core.context.module.ModuleContext)
	 */
	@Override
	public void setModuleContext(ModuleContext moduleContext)
			throws BeansException {
		BeanUtils.moduleContext=moduleContext;
	}

	
	public static Object getBean(String beanId){
		return moduleContext.getBean(beanId);
	}
	
}
