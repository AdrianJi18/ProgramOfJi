package com.jh.service;

import java.util.List;
import java.util.Map;

public interface CommonService {
	
	/**
	 * 查询条目数.
	 * 
	 * @param table
	 *            表名
	 * @return 条目数
	 */
	public int countTotal(String table);
	
	/**
	 * 分页查询.
	 * 
	 * @param table
	 *            表名
	 * @param start
	 *            起始下标
	 * @param limit
	 *            查询个数
	 * @return 数据
	 */
	public List<Map<String, Object>> selectPaging(String table, int start, int limit);
	
	/**
	 * 按id批量更新多条数据.
	 * 
	 * @param table
	 *            表名
	 * @param ids
	 *            id数组
	 * @param column
	 *            列名
	 * @param value
	 *            值
	 * @return 成功条目数
	 */
	public int updateObjectByIds(String table, String[] ids, String column, Object value);
	
	/**
	 * 查询表所有数据.
	 * 
	 * @param table
	 *            表名
	 * @return 数据集合
	 */
	public List<Map<String, Object>> queryAll(String table);

}
