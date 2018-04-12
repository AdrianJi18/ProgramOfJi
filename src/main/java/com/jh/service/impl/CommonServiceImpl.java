package com.jh.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jh.dao.CommonMapper;
import com.jh.service.CommonService;

@Service
public class CommonServiceImpl implements CommonService{
	
	@Autowired
	private CommonMapper commonMapper;
	/**
	 * 查询条目数.
	 * 
	 * @param table
	 *            表名
	 * @return 条目数
	 */
	public int countTotal(String table) {
		Map<String, String> params = new HashMap<String, String>();
		params.put("table", table);
		return commonMapper.countTotal(params);
	}
	
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
	public List<Map<String, Object>> selectPaging(String table, int start, int limit) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("table", table);
		params.put("start", start);
		params.put("limit", limit);
		return commonMapper.selectPaging(params);
	}
	
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
	public int updateObjectByIds(String table, String[] ids, String column, Object value) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("table", table);
		map.put("column", column);
		map.put("value", value);
		List<Long> list = new ArrayList<Long>();
		for (String id : ids) {
			list.add(Long.valueOf(id));
		}
		map.put("list", list);
		return commonMapper.updateObjectByIds(map);
	}

}
