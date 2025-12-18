
package com.grocery.business.domain.events;

import com.grocery.common.Constants;

public class ListRefreshEvent extends Event<Object> {

    public ListRefreshEvent() {
        // dummy object
        this.data = "DUMMY";
    }

    @Override
    public String getStreamName() {
        return Constants.REFRESH_LIST_STREAM_NAME;
    }
}