package com.grocery.business.domain.model;

public class AddItemResult {
    
    private Result result;
    private CurrentListItem item;
    
    public AddItemResult(Result result, CurrentListItem item) {
        this.result = result;
        this.item = item;
    }

    public Result getResult() {
        return result;
    }

    public void setResult(Result result) {
        this.result = result;
    }

    public CurrentListItem getItem() {
        return item;
    }

    public void setItem(CurrentListItem item) {
        this.item = item;
    }
    
    
    public enum Result {
        CREATED,
        UPDATED
    }
}
