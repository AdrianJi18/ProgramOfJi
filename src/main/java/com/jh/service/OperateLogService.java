package com.jh.service;

import java.util.List;

import com.jh.pojo.OperateLog;

public interface OperateLogService {
	
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
	public void saveToDB(String userName, int type, String description, String result);
	
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
	public int countOperateLogByCondition(String userName, int type, String fromDate, String toDate);
	
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
			int start, int limit);

}
