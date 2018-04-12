package com.jh.service;

import java.util.List;
import java.util.Map;

import com.jh.pojo.User;

public interface UserService {
	
	public int deleteById(int id);
	/**
	 * 插入用户.
	 * 
	 * @param user
	 *            用户
	 * @return 成功条目数
	 */
	public int insertUser(User user);
	
	public User selectUserByUserName(String userName);
	/**
	 * 通过用户名或联系方式查询.
	 * @param userName
	 *            用户名
	 * @param phoneNo
	 *            联系方式
	 **/
	public String queryUserByUnique(String userName,String phone);
	
	/**
	 * 按权限id查询角色.
	 * 
	 * @param permissionId
	 *            权限id
	 * @return 角色
	 */
	public int selectRoleByPermissionId(int permissionId);
	
	/**
	 * 按当前登录用户id查询子用户.
	 * 
	 * @return 用户列表
	 */
	public List<Map<String, Object>> getUserByPidRole(int id, int role);
	
	/**
	 * 重置密码.
	 * 
	 * @param ids
	 *            用户编号数组
	 * @param password
	 *            新密码
	 * @return 修改的条目数
	 */
	public int resetPassword(String[] ids, String password);
	
	/**
	 * 审核用户.
	 * 
	 * @param ids
	 *            用户编号数组
	 * @return 修改的条目数
	 */
	public int auditUser(String[] ids);
	
	/**
	 * 按id更新一条记录多列.
	 * 
	 * @param id
	 *            编号
	 * @param params
	 *            参数
	 * @return 成功条目数
	 */
	public int updateUserById(int id, List<Map<String, Object>> params);

}
