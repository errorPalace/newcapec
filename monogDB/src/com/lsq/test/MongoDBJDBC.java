package com.lsq.test;

import java.util.Set;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.mongodb.WriteConcern;

public class MongoDBJDBC{
   public static void main( String args[] ){
      try{   
    	  String myUserName = "admin";  
    	  String myPassword = "admin";  
    	  MongoClient mongoClient = new MongoClient("localhost", 27017);  
    	    
    	  // 1.数据库列表  
    	  for (String s : mongoClient.getDatabaseNames()) {  
    	      System.out.println("DatabaseName=" + s);  
    	  }  
    	    
    	  // 2.链接student数据库  
    	  DB db = mongoClient.getDB("student");  
    	  mongoClient.setWriteConcern(WriteConcern.JOURNALED);  
    	    
    	  // 3.用户验证  
    	  boolean auth = db.authenticate(myUserName, myPassword.toCharArray());  
    	  System.out.println("auth=" + auth);  
    	    
    	  // 4.集合列表  
    	  Set<String> colls = db.getCollectionNames();  
    	  for (String s : colls) {  
    	      System.out.println("CollectionName=" + s);  
    	  }  
    	    
    	  // 5.获取摸个集合对象  
    	  DBCollection coll = db.getCollection("user");  
      }catch(Exception e){
	     System.err.println( e.getClass().getName() + ": " + e.getMessage() );
	  }
   }
}