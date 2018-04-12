package com.jh.dao;

import com.jh.pojo.OperateLog;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface OperateLogMapper {
    int deleteByPrimaryKey(Integer id);

    int insertOperateLog(OperateLog record);

    OperateLog selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(OperateLog record);

    int updateByPrimaryKey(OperateLog record);
    
    /**
	 * 查询操作日志条目数.
	 * @param 参数
	 * @return 条目数
	 */
	public int countOperateLogByCondition(Map<String, Object> params);
	
	/**
	 * 查询操作日志.
	 * @param params 参数
	 * @return 操作日志集合
	 */
	public List<OperateLog> selectOperateLogByCondition(Map<String, Object> params);
}