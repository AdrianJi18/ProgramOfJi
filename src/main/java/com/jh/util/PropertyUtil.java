package com.jh.util;

import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <pre>
 * Property参数工具
 * </pre>
 * 
 * @page 共通
 * @version 1.0
 */
public final class PropertyUtil {
	
	/**
	 * 实例化日志类.
	 */
	protected static Logger logger = LoggerFactory.getLogger(PropertyUtil.class);
	
	/**
	 * 构造函数
	 * 
	 */
	private PropertyUtil() {

	}

	/** Property map */
	private static Map<String, String> map = new HashMap<String, String>();

	/**
	 * 获取配置参数
	 * 
	 * @param strKey
	 *            key
	 * @return String value
	 */
	public static String getPropertyValue(String strKey) {
		return (String) map.get(strKey);
	}

	/**
	 * 设置参数
	 * 
	 * @param strKey
	 *            strKey
	 * @param value
	 *            value
	 */
	public static void setPropertyValue(String strKey, String value) {
		map.put(strKey, value);
	}

	/**
	 * 读取Property文件
	 * 
	 * @param file
	 *            file
	 * @throws FileNotFoundException
	 *             FileNotFoundException
	 */
	public static void load(InputStream in) throws FileNotFoundException {
		Properties prop = new Properties();
		try {
			prop.load(new InputStreamReader(in, "UTF-8"));
			Enumeration<?> en = prop.propertyNames();
			while (en.hasMoreElements()) {
				String strKey = (String) en.nextElement();
				String strValue = (String) prop.getProperty(strKey);
				PropertyUtil.setPropertyValue(strKey, strValue);
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (IOException e) {
					logger.error(e.getMessage(), e);
				}
			}
		}
	}

	/**
	 * 读取Property文件
	 * 
	 * @param path
	 * @param data
	 */
	public static void load(String path, Map<String, String> data) {
		// 输入字符流
		InputStreamReader ir = null;
		try {
			ir = new InputStreamReader(new FileInputStream(path), "UTF-8");
			Properties prop = new Properties();
			prop.load(ir);
			Enumeration<?> en = prop.propertyNames();
			while (en.hasMoreElements()) {
				String strKey = (String) en.nextElement();
				String strValue = (String) prop.getProperty(strKey);
				data.put(strKey, strValue);
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (ir != null) {
				try {
					ir.close();
				} catch (Exception e) {
					logger.error(e.getMessage(), e);
				}
			}
		}
	}

	/**
	 * 写文件.
	 * 
	 * @param path
	 *            文件路径.
	 * @param data
	 *            文件内容
	 * @return true成功 false失败
	 */
	public static int write(String path, String data) {
		BufferedWriter bw = null;
		try {
			bw = new BufferedWriter(new FileWriter(path));
			bw.write(data);
			return 1;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return 0;
		} finally {
			if (bw != null) {
				try {
					bw.close();
				} catch (Exception e) {
					logger.error(e.getMessage(), e);
				}
			}
		}
	}
}
