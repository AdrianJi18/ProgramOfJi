package com.jh.common;

/**
 * 错误码.
 *
 */
public class ErrorCode {

	/**
	 * 私有构造函数.
	 */
	private ErrorCode() {

	}

	/**
	 * 操作成功.
	 */
	public static final String ITF_OPERATE_SUCCESS = "操作成功";

	/**
	 * 操作失败.
	 */
	public static final String ITF_OPERATE_FAIL = "操作失败,失败原因：连接超时或其他错误。";
	/**
	 * 操作失败,失败原因：短信发送失败.
	 */
	public static final String ITF_MSG_FAIL = "操作失败,失败原因：短信发送失败";

	/**
	 * 操作失败,失败原因：参数为空.
	 */
	public static final String ITF_PARAMNULL_ERROR = "操作失败,失败原因：参数为空";

	/**
	 * 操作失败,失败原因：插入数据库失败.
	 */
	public static final String ITF_INSERTDB_ERROR = "操作失败,失败原因：插入数据库失败";

	/**
	 * 操作失败,失败原因：更新数据库失败.
	 */
	public static final String ITF_UPDATEDB_ERROR = "操作失败,失败原因：更新数据库失败";

	/**
	 * 操作失败,失败原因：删除数据失败.
	 */
	public static final String ITF_DELETEDB_ERROR = "操作失败,失败原因：删除数据失败";

	/**
	 * 操作失败,失败原因：查询数据库失败.
	 */
	public static final String ITF_QUERYDB_ERROR = "操作失败,失败原因：查询数据库失败";

	/**
	 * 操作失败,失败原因：旧密码不正确.
	 */
	public static final String ITF_OLDPASSWORD_ERROR = "操作失败,失败原因：旧密码不正确";

	/**
	 * 操作失败,失败原因：没有要导出的数据.
	 */
	public static final String ITF_NODATATOEXPORT_ERROR = "操作失败,失败原因：没有要导出的数据";

	/**
	 * 操作失败,失败原因：导出数据失败.
	 */
	public static final String ITF_EXPORT_ERROR = "操作失败,失败原因：导出数据失败";

	/**
	 * 操作失败,失败原因：导出数据量大.
	 */
	public static final String ITF_EXPORT_LARGE_NUM_ERROR = "操作失败,失败原因：导出数据量超过{0}条";

	/**
	 * 操作失败，失败原因，密码错误
	 */
	public static final String ITF_CHECKPASSWORD_FALSE = "操作失败，失败原因：密码错误";

	/**
	 * 用户相关.
	 */
	public class User {

		/**
		 * 私有构造函数.
		 */
		private User() {

		}

		/**
		 * 操作失败,失败原因：用户名或密码错误.
		 */
		public static final String ITF_USERORPWD_ERROR = "操作失败,失败原因：用户名或密码错误";

		/**
		 * 操作失败,失败原因：用户不存在.
		 */
		public static final String ITF_USERNOTEXISTS_ERROR = "操作失败,失败原因：用户不存在";

		/**
		 * 操作失败,失败原因：用户未审核.
		 */
		public static final String ITF_USERAUDIT_ERROR = "操作失败,失败原因：用户未审核";

		/**
		 * 操作失败,失败原因：插入访问日志失败.
		 */
		public static final String ITF_INSERTVISITLOG_ERROR = "操作失败,失败原因：插入访问日志失败";

		/**
		 * 操作失败,失败原因：用户已存在.
		 */
		public static final String ITF_USEREXISTS_ERROR = "操作失败,失败原因：用户已存在.";

		/**
		 * 操作失败,失败原因：插入用户失败.
		 */
		public static final String ITF_INSERTUSER_ERROR = "操作失败,失败原因：插入用户失败.";

		/**
		 * 操作失败,失败原因：该用户已登录.
		 */
		public static final String ITF_LOGINED_ERROR = "操作失败,失败原因：该用户已登录";
	}
}
