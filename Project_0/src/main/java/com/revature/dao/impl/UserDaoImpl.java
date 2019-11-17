package com.revature.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.revature.dao.UserDao;
import com.revature.model.User;
import com.revature.util.ConnectionUtil;

public class UserDaoImpl implements UserDao {

	@Override
	public int createUserTable() {
		
		String sql = "create table Users (username varchar(50), "
				+ "password varchar(50),"
				+ "first_name varchar(50),"
				+ "last_name varchar(50),"
				+ "user_balance numeric (7,2))";
		
		
		try(Connection c = ConnectionUtil.getConnection();
				Statement s = c.createStatement()){
				s.executeUpdate(sql);
				System.out.println("User Table Created!");
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return 0;
	}

	@Override
	public int createUser(User u) {
		
		String sql = "insert into Users (username, password, first_name, last_name, user_balance) values (?, ?, ?, ?, ?)";
		int usersCreated = 0;
		
		try(Connection c = ConnectionUtil.getConnection();
				PreparedStatement ps = c.prepareStatement(sql)){
			
			ps.setString(1, u.getUsername());
			ps.setString(2, u.getPassword());
			ps.setString(3, u.getFirstName());
			ps.setString(4, u.getLastName());
			ps.setDouble(5, u.getBalance());
			
			usersCreated = ps.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return usersCreated;
	}

	@Override
	public int updateUser(String username, double newBalance) {
		
		String sql = "update users set user_balance = ? where username = ?";
		int userUpdated = 0;
		
		try(Connection c = ConnectionUtil.getConnection();
				PreparedStatement ps = c.prepareStatement(sql)){
			
			ps.setDouble(1, newBalance);
			ps.setString(2, username);
			userUpdated = ps.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return userUpdated;
	}

	@Override
	public int deleteUser(String username) {
		
		String sql = "delete from users u where u.username = ?";
		int userDeleted = 0;
		
		try(Connection c = ConnectionUtil.getConnection();
				PreparedStatement ps = c.prepareStatement(sql)){
			
			ps.setString(1, username);
			userDeleted = ps.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return userDeleted;
	}

	@Override
	public User getUser(String username) {
		
		String sql = "select * from Users u where u.username = ?";
		User u = new User();
		
		try(Connection c = ConnectionUtil.getConnection();
				PreparedStatement ps = c.prepareStatement(sql)){
			
			ps.setString(1, username);
			//ps.setString(2, password);
			ResultSet rs = ps.executeQuery();
			
			// if there is a result then set everything and return it.
			if (rs.next()) {
				u.setUsername(rs.getString("username"));
				u.setPassword(rs.getString("password"));
				u.setFirstName(rs.getString("first_name"));
				u.setLastName(rs.getString("last_name"));
				u.setBalance(rs.getDouble("user_balance"));
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return u;
	}

}
