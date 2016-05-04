package net.newcapec.campus.quickaccess.utils;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import java.io.*;
import java.security.InvalidKeyException;
import java.util.Properties;
import java.util.Scanner;

/**
 * Created by skyline on 2015/12/17.
 */
public class EncryptDBproperties {
    public static void main(String[] args) throws IOException, BadPaddingException, InvalidKeyException, IllegalBlockSizeException {
        Scanner s = new Scanner(System.in);
        System.out.println("请输入数据库文件地址：");
        while (true) {
            String line = s.nextLine();
            if(!line.equals("exit")){
                encrypt(line);
                System.out.println(">>>加密完成，继续加密其他数据库配置文件请输入文件路径，退出请输入exit");
                continue;
            }
            if (line.equals("exit")){
                s.close();
                break;
            }
            System.out.println(">>>" + line);
        }
    }

    private  static void encrypt(String fileName) throws IOException, BadPaddingException, InvalidKeyException, IllegalBlockSizeException {
        DESedeCoder des = new DESedeCoder();

        Properties prop = new Properties();
        InputStream in = new FileInputStream(new File(fileName));
        prop.load(in);

        String dbUrl = prop.getProperty("db.url");
        if (dbUrl != null) {
            dbUrl = des.encrypt(dbUrl).getHexString();
            prop.setProperty("db.url", dbUrl);
        }

        String username = prop.getProperty("db.username");
        if (username != null) {
            username = des.encrypt(username).getHexString();
            prop.setProperty("db.username", username);
        }

        String password = prop.getProperty("db.password");
        if (password != null) {
            password = des.encrypt(password).getHexString();
            prop.setProperty("db.password", password);
        }

        OutputStream outputFile = new FileOutputStream(fileName);
        prop.store(outputFile, "");
        outputFile.close();
    }
}
