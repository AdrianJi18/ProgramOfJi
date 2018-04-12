package com.jh.service;

import java.util.List;
import java.util.Map;

import com.jh.pojo.VisitLog;

public interface VisitLogService {
	
	/**
	 * 插入访问日志.
	 * 
	 * @param userName
	 *            访问用户名
	 * @return 插入id
	 */
	public int insertVisitlog(String userName);

	/**
	 * 更新访问日志退出时间.
	 * 
	 * @param id
	 *            访问日志id
	 * @return 成功条目数
	 */
	public int userExit(int id);
	
	/**
	 * 查询访问日志条目数.
	 * 
	 * @param key
	 * @param value
	 * @param type查询类型 1模糊查询 2按时间查询
	 * @return 条目数
	 */
	public int countVisitlogByCondition(String key, String value, int type);
	
	/**
	 * 查询访问日志不分页.
	 * 
	 * @param key
	 * @param value
	 * @return 访问日志
	 */
	public List<VisitLog> queryVisitlogByCondition(String key, String value, int type);
	
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
	public List<Map<String, Object>> queryVisitlogByCondition(String key, String value, int type,int start, int limit);

}
