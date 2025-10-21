// src/game/GameScene.ts
import Phaser from 'phaser';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Load your assets here (must be in your public/assets folder)
        this.load.image('grass_tile', 'assets/grass.png');
        this.load.image('building_hq', 'assets/hq.png');
        // Ensure you have these files (grass.png, hq.png, etc.)
    }

    create() {
        console.log("Phaser GameScene running.");
        
        // 1. Initial Map Setup (Draw default or empty map)
        this.updateLandMap([]);

        // 2. Set up Interaction Listener
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            const tileX = Math.floor(pointer.worldX / 32); 
            const tileY = Math.floor(pointer.worldY / 32);

            // EMIT TO REACT: This is the bridge back to the App.tsx for transaction logic
            this.events.emit('interaction', { action: 'ClaimLand', x: tileX, y: tileY });
            this.add.text(pointer.worldX, pointer.worldY, 'Tx Sent!', { fontSize: '16px', color: '#ff0000' });
        });
        
        // Signal to the PhaserGame wrapper that the scene is ready
        this.game.events.emit('ready');
    }

    // --- Exposed Methods for React to call ---

    public updateLandMap(tiles: Array<{ x: number, y: number, type: string }>) {
        this.children.removeAll(); // Clear existing objects
        
        tiles.forEach(tile => {
            // Check if the asset exists before adding
            if (this.textures.exists(tile.type)) {
                this.add.image(tile.x * 32, tile.y * 32, tile.type).setOrigin(0);
            } else {
                this.add.rectangle(tile.x * 32, tile.y * 32, 32, 32, 0x00FF00).setOrigin(0); // Fallback box
            }
        });
    }

    public spawnTroopAnimation(x: number, y: number, type: string) {
        // Simple visual feedback for a transaction starting
        const text = this.add.text(x, y, `+${type}!`, { fontSize: '20px', color: '#ffffff' });
        this.tweens.add({
            targets: text,
            y: y - 50,
            alpha: 0,
            duration: 1000,
            ease: 'Power1',
            onComplete: () => { text.destroy(); }
        });
    }
}