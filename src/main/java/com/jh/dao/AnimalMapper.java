package com.jh.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.jh.pojo.Animal;

@Service
public interface AnimalMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Animal record);

    int insertSelective(Animal record);

    Animal selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Animal record);

    /**
     * 更新牲畜信息
     * @param map
     * @return
     */
    int updateById(Map<String, Object> params);
    
    /**
	 * 分种类按条件查询牲畜数量.
	 * @param params 参数
	 * @return 
	 */
	public List<Map<String, Object>> countAnimalNumByCondition(Map<String, Object> params);
	
	/**
	 * 分区域按条件查询牲畜数量.
	 * @param params 参数
	 * @return 
	 */
	public List<Map<String, Object>> countAnimalNumByArea(Map<String, Object> params);
	
	/**
	 * 分区域按条件查询生产中心牲畜数量.
	 * @param params 参数
	 * @return 
	 */
	public List<Map<String, Object>> queryAnimalByProduce(Map<String, Object> params);
	
	/**
	 * 按条件查询牲畜条目数.
	 * @param params 参数
	 * @return 条目数
	 */
	public int countAnimalByCondition();
	
	/**
	 * 按条件查询牲畜.
	 * @param params 参数
	 * @return 牲畜集合
	 */
	public List<Map<String,Object>> selectAnimalByCondition(Map<String, Object> params);
	
	/**
     * 更新牲畜健康信息
     * @param map
     * @return
     */
    int updateAnimalHealById(Map<String, Object> params);
}