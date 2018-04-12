package com.jh.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jh.dao.UserMapper;
import com.jh.pojo.User;
import com.jh.service.CommonService;
import com.jh.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

	/**
	 * 用户操作.
	 */
	
	@Autowired
	private UserMapper userMapper;
	
	@Autowired
	private CommonService commonService;

	/**
	 * 插入用户.
	 * 
	 * @param user
	 *            用户
	 * @return 成功条目数
	 */
	public int insertUser(User user) {
		return userMapper.insertUser(user);
	}
	
	/**
	 * 通过用户名或联系方式查询.
	 * 
	 * @param userName
	 *            用户名
	 * @return 用户名
	 */
	public String queryUserByUnique(String userName, String phone) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (userName != null) {
			params.put("userName", userName);
		}
		if (phone != null) {
			params.put("phone", phone);
		}
		if (params.isEmpty()) {
			return null;
		}
		return userMapper.selectUserByUnique(params);
	}
	
	public User selectUserByUserName(String userName) {
		return userMapper.selectUserByUserName(userName);
	}
	/**
	 * 按权限id查询角色.
	 * 
	 * @param permissionId
	 *            权限id
	 * @return 角色
	 */
	public int selectRoleByPermissionId(int permissionId) {
		return userMapper.selectRoleByPermissionId(permissionId);
	}
	
	/**
	 * 按当前登录用户id查询子用户.
	 * 
	 * @return 用户列表
	 */
	public List<Map<String, Object>> getUserByPidRole(int id, int role) {
		Map<String, Object> params = new HashMap<String, Object>();
		// 角色是管理员
		if (role != 0) {
			params.put("id", id);
			params.put("role", role);
		}
		return userMapper.selectUserByPidRole(params);
	}

	public int deleteById(int id) {
		return userMapper.deleteByPrimaryKey(id);
	}
	
	/**
	 * 重置密码.
	 * 
	 * @param ids
	 *            用户编号数组
	 * @param password
	 *            新密码
	 * @return 修改的条目数
	 */
	public int resetPassword(String[] ids, String password) {
		List<Long> idList = new ArrayList<Long>(ids.length);
		for (String id : ids) {
			idList.add(Long.valueOf(id));
		}
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("password", password);
		params.put("list", idList);
		return userMapper.resetPassword(params);
	}
	
	/**
	 * 审核用户.
	 * 
	 * @param ids
	 *            用户编号数组
	 * @return 修改的条目数
	 */
	public int auditUser(String[] ids) {
		return commonService.updateObjectByIds("user", ids, "audit", 1);
	}

	/**
	 * 按id更新一条记录多列.
	 * 
	 * @param id
	 *            编号
	 * @param params
	 *            参数
	 * @return 成功条目数
	 */
	public int updateUserById(int id, List<Map<String, Object>> params) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("list", params);
		map.put("id", id);
		return userMapper.updateUserById(map);
	}

}
