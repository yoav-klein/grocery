
package com.grocery;

import org.testng.annotations.*;
import static org.testng.Assert.*;

import com.grocery.business.entities.Item;

public class AppTest {
    @Test public void appHasAGreeting() {
        Item item = new Item();
        assertNotNull("HELLO", "app should have a greeting");
    }
}