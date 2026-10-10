const tinyCore = extend(CoreBlock, "tiny-core", {
    // 1. Allows placement anywhere
    canPlaceOn(tile, team, rotation) {
        return tile != null;
    },

    // 2. set up the core to actively consume power
    setBars() {
        this.super$setBars();
        // Adds a power bar to the block UI so you can see if it's connected (might not work)
        this.addBar("power", func(build => new Bar("bar.power", Color.amber, prov(() => build.power != null ? build.power.status : 0))));
    }
});

// Create the custom Building  behavior for the core
tinyCore.buildType = () => extend(CoreBlock.CoreBuild, tinyCore, {
    // Runs 60 times a second for THIS specific placed block instance
    updateTile() {
        this.super$updateTile();

        // If the core is hooked to a node AND receiving electricity
        if (this.power != null && this.power.status > 0) {
            this.tile.setAir(); // Overloads and deletes instantly!
        }
    }
});

// Power settings (Must be at the bottom, don't forger)
tinyCore.hasPower = true;
tinyCore.consumesPower = true;
tinyCore.connectedPower = true;

// Define a tiny power requirement so nodes actually feed it energy
tinyCore.consume(new ConsumePower(0.1, 0, false)); 

// Stats & Metadata
tinyCore.breakable = true;
tinyCore.playerClear = true;
tinyCore.localizedName = "Micro Core";
tinyCore.description = "Upgradeable 1x1 core. Connect a power node to it to instantly delete it.";
tinyCore.size = 1;
tinyCore.health = 50;
tinyCore.itemCapacity = 100;
tinyCore.unitCapModifier = 0;
tinyCore.isFirstTier = false;

// Requirements & Menu Placement
tinyCore.requirements = ItemStack.with(
    Items.copper, 150,
    Items.lead, 100,
    Items.graphite, 50
);
tinyCore.category = Category.effect;
tinyCore.buildVisibility = BuildVisibility.shown;
tinyCore.alwaysUnlocked = true;

