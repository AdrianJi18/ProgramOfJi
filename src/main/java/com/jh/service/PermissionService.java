package com.jh.service;

import java.util.List;
import java.util.Map;

public interface PermissionService {
	
	/**
	 * 查询所有权限.
	 * 
	 * @return 权限
	 */
	public List<Map<String, Object>> getAllPermission();
	
	/**
	 * 插入权限.
	 * 
	 * @return
	 */
	public int insertPermission(String name, int role, String[] menuIds);
	
	/**
	 * 按编号批量删除.
	 * 
	 * @param table
	 *            表名
	 * @param ids
	 *            编号集合
	 * @return 删除条目数
	 */
	public int deleteByIds(String table, List<Integer> ids);
	
	/**
	 * 按键更新一列.
	 * 
	 * @param table
	 *            表名
	 * @param key
	 *            键
	 * @param kValue
	 *            键值
	 * @param column
	 *            列名
	 * @param value
	 *            列值
	 * @return 成功条目数
	 */
	public int updateOneColumnByKey(String table, String key, Object kValue, String column, Object value);
	
	/**
	 * 更新权限.
	 * 
	 * @param id
	 *            编号
	 * @param name
	 *            名称
	 * @param role
	 *            角色
	 * @param menuIds
	 *            菜单编号数组
	 * @return 成功条目数
	 */
	public int updatePermission(int id, String name, int role, String[] menuIds);

}
