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

}
