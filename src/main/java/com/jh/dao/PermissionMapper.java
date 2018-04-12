package com.jh.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.jh.pojo.Permission;

@Service
public interface PermissionMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Permission record);

    int insertSelective(Permission record);

    Permission selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Permission record);

    int updateByPrimaryKey(Permission record);
    
    /**
	 * 查询所有权限.
	 *
	 * @return 权限列表
	 */
	public List<Permission> selectAllPermission();
	
	/**
	 * 权限配置.
	 * 
	 * @param permission
	 *            权限
	 * @return 成功条目数
	 */
	public int insertPermission(Permission permission);
	
	/**
	 * 查询最后插入的主键ID.
	 * @return 最后插入的主键ID
	 */
	public int selectId();
	
	/**
	 * 插入权限菜单.
	 * 
	 * @param params
	 *            参数
	 * @return 成功条目数
	 */
	public int insertPermissionMenus(List<Map<String, Object>> list);
	
	/**
	 * 按编号批量删除.
	 * 
	 * @param params
	 *            参数
	 * @return 删除成功条目数
	 */
	public int deleteByIds(Map<String, Object> params);
	
	/**
	 * 按键更新一列.
	 * @param params 参数
	 * @return 成功条目数
	 */
	public int updateOneColumnByKey(Map<String, Object> params);
	
	/**
	 * 更新权限配置.
	 * 
	 * @param permission
	 *            权限
	 * @return 成功条目数
	 */
	public int updatePermission(Permission permission);
	
	/**
	 * 按权限编号删除权限菜单.
	 * 
	 * @param permissionId
	 *            权限编号
	 * @return 成功条目数
	 */
	public int deletePermissionMenusByPermissionId(int permissionId);
}