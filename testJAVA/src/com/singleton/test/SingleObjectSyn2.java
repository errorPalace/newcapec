package com.singleton.test;

//线程安全
public class SingleObjectSyn2 {
	private static class SingletonHolder {
		// static
		private static final SingleObjectSyn2 INSTANCE = new SingleObjectSyn2();
	}

	// private
	private SingleObjectSyn2() {

	}

	// 获取唯一可用的对象
	public static final SingleObjectSyn2 getInstance() {
		return SingletonHolder.INSTANCE;
	}
}
