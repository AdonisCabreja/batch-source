package com.revature.shapes;


import com.revature.exceptions.NegativeSidesException;

public abstract class Shape implements Drawable, Calculatable {
	
public int numOfSides;

public Shape() {
	super();
}

public int getNumOfSides() {
	return numOfSides;
}

public void setNumOfSides(int numOfSides) {
	//this.numOfSides=numOfSIdes;
	if(numOfSides>0) {
		this.numOfSides = numOfSides;
		} else {
			throw new NegativeSidesException("Cannot have a shape with negative sides: "+numOfSides+" is invalid");
		}
}
}
