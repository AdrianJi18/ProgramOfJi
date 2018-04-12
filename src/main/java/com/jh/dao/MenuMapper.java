package com.jh.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.jh.pojo.Menu1;

@Service
public interface MenuMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Menu1 record);

    int insertSelective(Menu1 record);

    Menu1 selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Menu1 record);

    int updateByPrimaryKey(Menu1 record);
    
    /**
	 * 查询所有菜单.
	 * @return 菜单集合.
	 */
	public List<Menu1> selectAllMenu();
	
	/**
	 * 按等级查询菜单.
	 * @return 菜单集合
	 */
	public List<Menu1> selectMenusByLevel(int level);
	
	/**
	 * 按等级1菜单查询子菜单.
	 * @param menuId 等级1菜单编号
	 * @return 菜单集合
	 */
	public List<Menu1> selectMenusByLevel1MenuId(int menuId);
	
	/**
	 * 按权限编号查询菜单.
	 * @param permissionId 权限编号
	 * @return 菜单集合
	 */
	public List<Menu1> selectMenusByPermissionId(int permissionId);
	
	/**
	 * 按权限编号和等级查询菜单.
	 * @param 参数
	 * @return 菜单集合
	 */
	public List<Menu1> selectMenusByPermissionIdLevel(Map<String, Object> params);
}