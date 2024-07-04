package com.grocery.business.entities;

public enum ItemCategory {
    VEGETABLES("Vegetables"),
    FRUITS("Fruits"),
    DAIRY("Dairy"),
    PROTEIN("Protein"),
    BEVERAGES("Beverages"),
    CANDY("Candy"),
    DRY_GOODS("Dry Goods"),
    CANNED_GOODS("Canned Goods"),
    FROZEN_FOOD("Frozen Food"),
    SPICES("Spices"),
    COFFEE("Coffee and Tea"),
    ALCOHOL("Alcohol"),
    CLEANING_SUPPLIES("Cleaning Supplies");

    private final String displayName;

    ItemCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return this.displayName;
    }

    
}
