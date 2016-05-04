package net.newcapec.campus.quickaccess.utils;

import java.util.Properties;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;

/**
 * 解析properties文件 并对系统进行配置
 *
 * @author dwb
 */
public class EncryptablePropertyPlaceholderConfigurer extends
        PropertyPlaceholderConfigurer {

    protected void processProperties(ConfigurableListableBeanFactory beanFactory, Properties props)
            throws BeansException {
       /* System.out.println("正在解密系统文件...");*/
        try {
            DESedeCoder des = new DESedeCoder();
            // rk----------------------
            String dbUrl = props.getProperty("db.url");
            if (dbUrl != null) {
                String usernameVal = des.decryptByHexString(dbUrl).getString();
                props.setProperty("db.url", usernameVal);
            }
            String rkUserName = props.getProperty("db.username");
            if (rkUserName != null) {
                String usernameVal = des.decryptByHexString(rkUserName).getString();
                props.setProperty("db.username", usernameVal);
            }
            String rkPassword = props.getProperty("db.password");
            if (rkPassword != null) {
                String passwordVal = des.decryptByHexString(rkPassword).getString();
                props.setProperty("db.password", passwordVal);
            }
            super.processProperties(beanFactory, props);
        } catch (Exception e) {
            e.printStackTrace();
            throw new BeanInitializationException(e.getMessage());
        }
    }
}