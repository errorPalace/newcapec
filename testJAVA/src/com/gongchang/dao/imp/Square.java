package com.gongchang.dao.imp;

import com.gongchang.dao.Shape;

public class Square implements Shape {

	@Override
	public void draw() {
		  System.out.println("Inside Square::draw() method.");
	}

}
