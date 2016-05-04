package net.newcapec.campus.quickaccess.utils;

import net.newcapec.v3.core.adapter.ModuleInfo;
import net.newcapec.v3.core.context.module.ModuleContext;
import net.newcapec.v3.core.context.module.ModuleContextAware;

import org.springframework.beans.BeansException;

public class ModuleBeanUtils implements ModuleContextAware {

	private static ModuleContext moduleContext;

	@Override
	public void setModuleContext(ModuleContext moduleContext)
			throws BeansException {
		ModuleBeanUtils.moduleContext = moduleContext;
	}

	public static Object getBean(String beanId) {
		return moduleContext.getBean(beanId);
	}
	public static ModuleInfo getModuleInfo(){
		return moduleContext.getModuleInfo();
	}
}
