package com.grocery.business.domain.events;

import com.grocery.common.Constants;
import com.grocery.business.domain.model.CurrentListItem;

public class AddItemEvent extends Event<CurrentListItem> {

    public AddItemEvent(CurrentListItem item) {
        this.data = item;
    }

    @Override
    public String getStreamName() {
        return Constants.ADD_ITEM_STREAM_NAME;
    }
}
