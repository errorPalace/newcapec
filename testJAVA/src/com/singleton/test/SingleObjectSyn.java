package com.singleton.test;

//线程安全
public class SingleObjectSyn {
	// static
	private static SingleObjectSyn instance = new SingleObjectSyn();

	// private
	private SingleObjectSyn() {
	}

	// 获取唯一可用的对象
	public static synchronized SingleObjectSyn getInstance() {
		if (instance == null) {
			instance = new SingleObjectSyn();
		}
		return instance;
	}
}
