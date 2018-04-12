package com.jh.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.jh.pojo.User;

@Service
public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insertUser(User record);

    User selectUserByUserName(String userName);

    int updateByPrimaryKeySelective(User record);
    
    String selectUserByUnique(Map<String, Object> params);
    
    int selectRoleByPermissionId(int permissionId);
    
    /**
	 * 通过PID和角色获取用户.
	 * 
	 * @param params
	 *            参数
	 * @return 用户集合
	 */
	public List<Map<String, Object>> selectUserByPidRole(Map<String, Object> params);
	
	/**
	 * 批量修改密码.
	 * 
	 * @param params
	 *            参数
	 * @return 成功条目数
	 */
	public int resetPassword(Map<String, Object> params);
	
	/**
	 * 按id更新一条记录多列.
	 * 
	 * @param params
	 *            参数
	 * @return 成功条目数
	 */
	public int updateUserById(Map<String, Object> params);
}