package com.jh.service.impl;

import com.jh.dao.OperateLogMapper;
import com.jh.pojo.OperateLog;
import com.jh.service.OperateLogService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OperateLogServiceImpl implements OperateLogService{
	
	@Autowired
	private OperateLogMapper operateLogMapper;
	/**
	 * 保存操作日志到数据库.
	 * 
	 * @param userName
	 *            操作用户
	 * @param type
	 *            操作类型
	 * @param object
	 *            操作对象
	 * @param result
	 *            操作结果
	 */
	public void saveToDB(String userName, int type, String description, String result) {
		OperateLog operateLog = new OperateLog();
		operateLog.setUserName(userName);
		operateLog.setType(type);
		operateLog.setDescription(description);
		operateLog.setResult(result);
		operateLogMapper.insertOperateLog(operateLog);
	}
	
	/**
	 * 查询访问日志条目数.
	 * 
	 * @param userName
	 *            用户名
	 * @param type
	 *            操作类型
	 * @param fromDate
	 *            开始时间
	 * @param toDate
	 *            结束时间
	 * @param start
	 *            起始下标
	 * @param limit
	 *            查询个数
	 * @return 条目数
	 */
	public int countOperateLogByCondition(String userName, int type, String fromDate, String toDate) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (StringUtils.isNotBlank(userName)) {
			userName = userName.trim();
			params.put("userName", userName);
		}
		if (type > 0) {
			params.put("type", type);
		}
		if (StringUtils.isNotBlank(fromDate)) {
			params.put("fromDate", fromDate);
		}
		if (StringUtils.isNotBlank(toDate)) {
			params.put("toDate", toDate);
		}
		return operateLogMapper.countOperateLogByCondition(params);
	}
	
	/**
	 * 分页查询操作日志.
	 * 
	 * @param userName
	 *            用户名
	 * @param type
	 *            操作类型
	 * @param fromDate
	 *            开始时间
	 * @param toDate
	 *            结束时间
	 * @param start
	 *            起始下标
	 * @param limit
	 *            查询个数
	 * @return 操作日志集合
	 */
	public List<OperateLog> queryOperateLogByCondition(String userName, int type, String fromDate, String toDate,
			int start, int limit) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (StringUtils.isNotBlank(userName)) {
			userName = userName.trim();
			params.put("userName", userName);
		}
		if (type > 0) {
			params.put("type", type);
		}
		if (StringUtils.isNotBlank(fromDate)) {
			params.put("fromDate", fromDate);
		}
		if (StringUtils.isNotBlank(toDate)) {
			params.put("toDate", toDate);
		}
		params.put("start", start);
		params.put("limit", limit);
		return operateLogMapper.selectOperateLogByCondition(params);
	}
}
