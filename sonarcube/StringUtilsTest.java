package com.example;

import org.junit.Test;
import static org.junit.Assert.*;

public class StringUtilsTest {
    private StringUtils utils = new StringUtils();

    @Test
    public void testConcatenateStrings() {
        assertEquals("HelloWorld", utils.concatenateStrings("Hello", "World"));
        assertEquals("Hello", utils.concatenateStrings("Hello", null));
        assertEquals("World", utils.concatenateStrings(null, "World"));
        assertEquals("", utils.concatenateStrings(null, null));
    }

    @Test
    public void testGetLength() {
        assertEquals(5, utils.getLength("Hello"));
        // Missing test for null input (intentional for SonarCloud to detect)
    }

    @Test
    public void testIsAdmin() {
        assertTrue(utils.isAdmin("admin"));
        assertFalse(utils.isAdmin("user"));
        // Missing test for case sensitivity or null input (intentional)
    }
}