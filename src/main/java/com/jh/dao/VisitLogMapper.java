package com.jh.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.jh.pojo.VisitLog;

@Service
public interface VisitLogMapper {
    /**
	 * 插入访问日志.
	 * 
	 * @param userName
	 *            访问用户名
	 * @return 0失败 1成功
	 */
	int insertVisitlog(String userName);

	/**
	 * 更新访问日志退出时间.
	 * 
	 * @param params
	 *            参数
	 * @return 条目数
	 */
	int updateVisitlogExitTime(Map<String, Object> params);

	/**
	 * 查询最后插入的主键ID.
	 * @return 最后插入的主键ID
	 */
	public long selectId();
	
	/**
	 * 按条件查询活动告警条目数.
	 * 
	 * @param params
	 *            参数
	 * @return 条目数
	 */
	public int countVisitlogByCondition(Map<String, Object> params);
	
	/**
	 * 按条件查询访问日志不分页.
	 * 
	 * @param params
	 *            参数
	 * @return 访问日志集合
	 */
	public List<VisitLog> selectVisitlogByConditionNoPaging(Map<String, Object> params);
	
	/**
	 * 按条件查询访问日志.
	 * 
	 * @param params
	 *            参数
	 * @return 访问日志集合
	 */
	public List<Map<String, Object>> selectVisitlogByCondition(Map<String, Object> params);
}