package com.jh.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface CommonMapper {
	
	/**
	 * 查询条目数.
	 * 
	 * @param params
	 *            参数
	 * @return 条目数
	 */
	public int countTotal(Map<String, String> params);
	
	/**
	 * 查询所有.
	 * 
	 * @param params
	 *            参数
	 * @return 数据
	 */
	public List<Map<String, Object>> selectAll(Map<String, String> params);
	
	/**
	 * 分页查询.
	 * 
	 * @param params
	 *            分页参数
	 * @return 数据
	 */
	public List<Map<String, Object>> selectPaging(Map<String, Object> params);
	
	/**
	 * 按id批量更新多条数据一列.
	 * @param params 参数
	 * @return 成功条目数
	 */
	public int updateObjectByIds(Map<String, Object> params);
	
	/**
	 * 按编号删除.
	 * 
	 * @param params
	 *            参数
	 * @return 删除条目数
	 */
	public int deleteById(Map<String, Object> params);
	
	/**
	 * 按编号批量删除.
	 * 
	 * @param params
	 *            参数
	 * @return 删除成功条目数
	 */
	public int deleteByIds(Map<String, Object> params);
	
	/**
	 * 按条件删除.
	 * 
	 * @param params
	 *            参数
	 * @return 删除成功条目数
	 */
	public int deleteByOneColumn(Map<String, Object> params);
	
	/**
	 * 按多个条件删除.
	 * 
	 * @param params
	 *            参数
	 * @return 删除成功条目数
	 */
	public int deleteByConditions(Map<String, Object> params);
	
	/**
	 * 联表查询所有设备编号名称.
	 * @return 数据
	 */
	public List<Map<String, Object>> selectAllDevIdName();

}
