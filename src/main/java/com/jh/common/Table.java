package com.jh.common;

import java.util.HashMap;
import java.util.Map;

/**
 * 表名.
 * 
 */
public class Table {

	/**
	 * 存放表对应名称.
	 */
	public static final Map<String, String> tableMap = new HashMap<String, String>();

	/**
	 * 创建对象.
	 */
	private static Table table;

	/**
	 * 私有构造函数.
	 */
	public Table() {
		tableMap.put("animal", "牲畜信息");
		tableMap.put("menu1", "菜单信息");
		tableMap.put("operatelog", "操作日志");
		tableMap.put("orders", "订单信息");
		tableMap.put("permission", "权限信息");
		tableMap.put("permission_menu", "权限-菜单");
		tableMap.put("product", "产品信息");
		tableMap.put("user", "用户信息");
		tableMap.put("visitlog", "访问日志");
	}

	/**
	 * 获取表名.
	 * 
	 * @param key
	 * @return 表名
	 */
	public static String getTableName(String key) {
		if (table == null) {
			table = new Table();
		}
		return tableMap.get(key.toLowerCase());
	}
}
