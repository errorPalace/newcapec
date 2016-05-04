package com.singleton.test;

//线程不安全
public class SingleObject {
	// static
	private static SingleObject instance = new SingleObject();

	// private
	private SingleObject() {
	}

	// 获取唯一可用的对象
	public static SingleObject getInstance() {
		if (instance == null) {
			instance = new SingleObject();
		}
		return instance;
	}
}
