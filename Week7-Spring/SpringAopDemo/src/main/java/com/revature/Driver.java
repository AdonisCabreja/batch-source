package com.revature;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.revature.beans.Bear;

public class Driver {

	public static void main(String[] args) {
		ApplicationContext ac = new ClassPathXmlApplicationContext("beans.xml");
		Bear b = (Bear) ac.getBean("bear");
		b.isFull();
//		b.bearHibernates();
		b.setFull(false);
		b.setAwake(false);

	}

}
