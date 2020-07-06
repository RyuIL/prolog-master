package com.ssafy.api.advice.exception;

public class CUserCommunityIdMatchException extends RuntimeException{
    public CUserCommunityIdMatchException(String msg, Throwable t){
        super(msg, t);
    }
    public CUserCommunityIdMatchException(String msg){
        super(msg);
    }
    public CUserCommunityIdMatchException(){
        super();
    }
}
