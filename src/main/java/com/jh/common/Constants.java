package com.jh.common;

/**
 * 公共常量类.
 * 
 * 
 */
public class Constants {

	/**
	 * 私有构造函数.
	 */
	private Constants() {

	}

	/**
	 * 用户已审核.
	 */
	public static final int ITF_AUDIT = 1;

	

	/**
	 * 备份目录.
	 * 
	 */
	public class BackUp {
		/**
		 * 私有构造函数.
		 */
		private BackUp() {

		}

		/**
		 * 日志备份目录.
		 */
		public static final String ITF_QUERY_DIR = "/backup/log";
	}

	/**
	 * 导出excel条目数限制.
	 */
	public static final String ITF_EXPORT_MAX_NUM = "EXPORT_MAX_NUM";

	

	/**
	 * 操作日志类型.
	 *
	 */
	public class OperateLogType {
		/**
		 * 私有构造函数.
		 */
		private OperateLogType() {

		}

		/**
		 * 增加.
		 */
		public static final int ADD = 1;
		/**
		 * 删除.
		 */
		public static final int DELETE = 2;
		/**
		 * 修改.
		 */
		public static final int UPDATE = 3;
		/**
		 * 查询.
		 */
		public static final int QUERY = 4;
		/**
		 * 导出.
		 */
		public static final int EXPORT = 5;
		/**
		 * 备份.
		 */
		public static final int BACKUP = 6;
		/**
		 * 恢复.
		 */
		public static final int RESTORE = 7;
		/**
		 * 查看.
		 */
		public static final int LOOK = 8;
	}

	/**
	 * 角色.
	 */
	public class Role {

		/**
		 * 私有构造函数.
		 */
		private Role() {

		}

		/**
		 * 超级管理员.
		 */
		public static final int SUPER_ADMIN = 0;
		/**
		 * 管理员.
		 */
		public static final int ADMIN = 1;

		/**
		 * 普通用户.
		 */
		public static final int CONSUMER = 2;
	}

	

	/**
	 * 超级管理员
	 * 
	 */
	public class SuperAdmin {

		/**
		 * 私有构造函数.
		 */
		private SuperAdmin() {

		}

		/**
		 * 超级管理员用户名.
		 */
		public static final String USERNAME = "admin";
		/**
		 * 超级管理员.
		 */
		public static final int PERMISSION = 0;
	}
}