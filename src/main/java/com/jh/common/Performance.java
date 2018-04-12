package com.jh.common;

import java.util.Date;

/**
 * 服务器性能.
 * 
 */
public class Performance {
	/**
	 * CPU使用率.
	 */
	private int cpu;

	/**
	 * 内存使用率.
	 */
	private int memory;

	/**
	 * 硬盘使用率.
	 */
	private int disk;

	/**
	 * 录入时间.
	 */
	private Date time;

	/**
	 * 获取CPU使用率.
	 * 
	 * @return CPU使用率
	 */
	public int getCpu() {
		return cpu;
	}

	/**
	 * 设置CPU使用率.
	 * 
	 * @param cpu
	 *            CPU使用率
	 */
	public void setCpu(int cpu) {
		this.cpu = cpu;
	}

	/**
	 * 获取内存使用率.
	 * 
	 * @return 内存使用率
	 */
	public int getMemory() {
		return memory;
	}

	/**
	 * 设置内存使用率.
	 * 
	 * @param memory
	 *            内存使用率
	 */
	public void setMemory(int memory) {
		this.memory = memory;
	}

	/**
	 * 获取硬盘使用率.
	 * 
	 * @return 硬盘使用率
	 */
	public int getDisk() {
		return disk;
	}

	/**
	 * 设置硬盘使用率.
	 * 
	 * @param disk
	 *            硬盘使用率
	 */
	public void setDisk(int disk) {
		this.disk = disk;
	}

	/**
	 * 获取录入时间.
	 * 
	 * @return 录入时间
	 */
	public Date getTime() {
		return time;
	}

	/**
	 * 设置录入时间.
	 * 
	 * @param time
	 *            录入时间
	 */
	public void setTime(Date time) {
		this.time = time;
	}

	/**
	 * 
	 */
	@Override
	public String toString() {
		return "cpu="+this.cpu+" memory="+this.memory+" disk="+this.disk;
	}
}
