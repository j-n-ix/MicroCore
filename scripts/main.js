// Core code version 1.3
//Comment tags: Fixed (numbered), Info (for debug), Issue (for future revision)

const tinyCore = extend(CoreBlock, "tiny-core", {
    // 1. Allows placement anywhere
    canPlaceOn(tile, team, rotation) {
        return tile != null;
    }
});



// create the custom Building behavior for the core
tinyCore.buildType = () => extend(CoreBlock.CoreBuild, tinyCore, {
    // Runs 60 times a second for THIS specific placed block instance.
    updateTile() {
        this.super$updateTile();

        // If the core is hooked to a node AND receiving electricity, Fix N°1, reworked crash on click bug and added vanilla kill effect
        if (this.power != null && this.power.status > 0) {
            this.kill(); // Triggers core destruction safely
        }
    }
});



// Power settings
tinyCore.hasPower = true;
tinyCore.consumesPower = true;
tinyCore.connectedPower = true;

// Define a tiny power requirement so nodes feed it energy 
// Fix N°2, fixed vanilla power ui
tinyCore.consume(new ConsumePower(0.1, 0, false)); 



// Stats & Metadata
tinyCore.breakable = true;
tinyCore.playerClear = true;
tinyCore.localizedName = "Micro Core";
tinyCore.description = "Upgradeable 1x1 core. Connect a power node to it to instantly delete it.";
tinyCore.size = 1;
tinyCore.health = 50;
tinyCore.itemCapacity = 100;
tinyCore.unitCapModifier = 2; // Ensure this is not 0 for a baseline core, fix N°3
tinyCore.isFirstTier = true;

// Core Unit Assignment, fix N°4
tinyCore.unitType = UnitTypes.alpha; 

// Requirements & Menu Placement
tinyCore.requirements = ItemStack.with(
    Items.copper, 150,
    Items.lead, 100,
    Items.graphite, 50
);
tinyCore.category = Category.effect;
tinyCore.buildVisibility = BuildVisibility.shown;
tinyCore.alwaysUnlocked = true;

