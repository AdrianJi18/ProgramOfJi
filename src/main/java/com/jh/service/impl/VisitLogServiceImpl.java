package com.jh.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jh.dao.VisitLogMapper;
import com.jh.pojo.VisitLog;
import com.jh.service.VisitLogService;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VisitLogServiceImpl implements VisitLogService{

	@Autowired
	private VisitLogMapper visitLogMapper;
	/**
	 * 插入访问日志.
	 * 
	 * @param userName
	 *            访问用户名
	 * @return 插入id
	 */
	public int insertVisitlog(String userName) {
		int result = visitLogMapper.insertVisitlog(userName);
		if (result == 1) {
			return (int) visitLogMapper.selectId();
		}
		return 0;
	}

	/**
	 * 更新访问日志退出时间.
	 * 
	 * @param id
	 *            访问日志id
	 * @return 成功条目数
	 */
	public int userExit(int id) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", id);
		params.put("exitime", new Date());
		return visitLogMapper.updateVisitlogExitTime(params);
	}	
	
	/**
	 * 查询访问日志条目数.
	 * 
	 * @param key
	 * @param value
	 * @param type查询类型 1模糊查询 2按时间查询
	 * @return 条目数
	 */
	public int countVisitlogByCondition(String key, String value, int type) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (StringUtils.isBlank(key) || StringUtils.isBlank(value)) {
			// 查询全部
		} else {
			value = value.trim();
			params.put("key", key);
			if (type == 1) {
				params.put("value", value);
			} else {
				// 按时间查询
				String[] dates = value.split("#1&");
				params.put("fromDate", dates[0]);
				params.put("toDate", dates[1]);
			}
		}
		return visitLogMapper.countVisitlogByCondition(params);
	}
	
	/**
	 * 查询访问日志不分页.
	 * 
	 * @param key
	 * @param value
	 * @return 访问日志
	 */
	public List<VisitLog> queryVisitlogByCondition(String key, String value, int type) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (StringUtils.isBlank(key) || StringUtils.isBlank(value)) {
			// 查询全部
		} else {
			value = value.trim();
			params.put("key", key);
			if (type == 1) {
				params.put("value", value);
			} else {
				// 按时间查询
				String[] dates = value.split("#1&");
				params.put("fromDate", dates[0]);
				params.put("toDate", dates[1]);
			}
		}
		return visitLogMapper.selectVisitlogByConditionNoPaging(params);
	}
	
	/**
	 * 查询访问日志.
	 * 
	 * @param key
	 * @param value
	 * @param start
	 *            开始下标
	 * @param limit
	 *            个数
	 * @return 访问日志
	 */
	public List<Map<String, Object>> queryVisitlogByCondition(String key, String value, int type,int start, int limit) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("start", start);
		params.put("limit", limit);
		if (StringUtils.isBlank(key) || StringUtils.isBlank(value)) {
			// 查询全部
		} else {
			value = value.trim();
			params.put("key", key);
			if (type == 1) {
				params.put("value", value);
			} else {
				// 按时间查询
				String[] dates = value.split("#1&");
				params.put("fromDate", dates[0]);
				params.put("toDate", dates[1]);
			}
		}
		return visitLogMapper.selectVisitlogByCondition(params);
	}
}
