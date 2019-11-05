package com.revature.shapes;

public abstract class Shape {
	
	private int numOfSides;
	
	public Shape() {
		super();
	}
	
	public int getNumOfSides() {
		return numOfSides;
	}
	
	public void setNumOfSides(int numOfSides) {
		this.numOfSides = numOfSides;
	}

}
