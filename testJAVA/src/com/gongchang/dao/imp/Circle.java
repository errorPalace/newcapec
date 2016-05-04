package com.gongchang.dao.imp;

import com.gongchang.dao.Shape;

public class Circle implements Shape {

	@Override
	public void draw() {
		System.out.println("Inside Circle::draw() method.");
	}

}
