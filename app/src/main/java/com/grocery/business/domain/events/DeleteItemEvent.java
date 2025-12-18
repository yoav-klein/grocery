package com.grocery.business.domain.events;

import com.grocery.common.Constants;

public class DeleteItemEvent extends Event<String> {

    public DeleteItemEvent(String itemId) {
        this.data = itemId;
    }

    @Override
    public String getStreamName() {
        return Constants.DELETE_ITEM_STREAM_NAME;
    }
}
