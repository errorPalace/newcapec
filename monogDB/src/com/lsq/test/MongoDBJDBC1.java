package com.lsq.test;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

public class MongoDBJDBC1{
   public static void main( String args[] ){
//	   try{   
//			 // 连接到 mongodb 服务
//	         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
//	         // 连接到数据库
//	         DB db = mongoClient.getDB( "test" );
//			 System.out.println("Connect to database successfully");
////	         boolean auth = db.authenticate(myUserName, myPassword);
////			 System.out.println("Authentication: "+auth);
//	      }catch(Exception e){
//		     System.err.println( e.getClass().getName() + ": " + e.getMessage() );
//		  }
//	   try{   
//		     // 连接到 mongodb 服务
//	         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
//	         // 连接到数据库
//	         DB db = mongoClient.getDB( "test" );
//		 System.out.println("Connect to database successfully");
//	         boolean auth = db.authenticate(myUserName, myPassword);
//		 System.out.println("Authentication: "+auth);
//	         DBCollection coll = db.createCollection("mycol", null);
//	         System.out.println("Collection created successfully");
//	      }catch(Exception e){
//		     System.err.println( e.getClass().getName() + ": " + e.getMessage() );
//		  }
	   
	   try{   
		     // 连接到 mongodb 服务
	         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
	         // 连接到数据库
	         DB db = mongoClient.getDB( "test" );
		 System.out.println("Connect to database successfully");
//	         boolean auth = db.authenticate(myUserName, myPassword);
//		 System.out.println("Authentication: "+auth);
//	         DBCollection coll = db.createCollection("mycol", null);
//	         System.out.println("Collection created successfully");
	         DBCollection coll = db.getCollection("mycol");
	         System.out.println("Collection mycol selected successfully");
	         
//	         BasicDBObject doc = new BasicDBObject("title", "MongoDB").
//	                 append("description", "database").
//	                 append("likes", 100).
//	                 append("url", "http://www.w3cschool.cc/mongodb/").
//	                 append("by", "w3cschool.cc");
//	              coll.insert(doc);
//	              System.out.println("Document inserted successfully");
	         
//	         DBCursor cursor = coll.find();
//	         int i=1;
//	         while (cursor.hasNext()) { 
//	            System.out.println("Inserted Document: "+i); 
//	            System.out.println(cursor.next()); 
//	            i++;
//	         } 
	         DBCursor cursor = coll.find();
	         while (cursor.hasNext()) { 
	            DBObject updateDocument = cursor.next();
	            updateDocument.put("likes","200");
	            coll.update(updateDocument, updateDocument);
	         }
	         System.out.println("Document updated successfully");
	         cursor = coll.find();
	         int i=1;
	         while (cursor.hasNext()) { 
	            System.out.println("Updated Document: "+i); 
	            System.out.println(cursor.next()); 
	            i++;
	         } 
	         
	      }catch(Exception e){
		     System.err.println( e.getClass().getName() + ": " + e.getMessage() );
		  }
	   
	   }
   
}