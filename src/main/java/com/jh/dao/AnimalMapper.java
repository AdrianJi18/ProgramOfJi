package com.jh.dao;

import org.springframework.stereotype.Service;

import com.jh.pojo.Animal;

@Service
public interface AnimalMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Animal record);

    int insertSelective(Animal record);

    Animal selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Animal record);

    int updateByPrimaryKey(Animal record);
}