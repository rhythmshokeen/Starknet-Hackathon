// src/components/PhaserGame.tsx

import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

interface PhaserGameProps {
  onTileSelect: (tokenId: number) => void;
}

const PhaserGame: React.FC<PhaserGameProps> = ({ onTileSelect }) => {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current || 'phaser-container',
      scene: {
        preload: function () {
          // Load game assets (textures, sprites, etc.)
          this.load.image('grass', 'path/to/grass.png');
          this.load.image('hq', 'path/to/hq.png');
        },
        create: function () {
          // Basic grid creation and click listener
          for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
              const tile = this.add.image(x * 80 + 40, y * 60 + 30, 'grass');
              tile.setInteractive();
              
              // Set a unique token ID for each tile (e.g., based on x/y)
              const tokenId = y * 10 + x + 1; 
              
              tile.on('pointerdown', () => {
                // When a tile is clicked, call the React handler
                onTileSelect(tokenId); 
                console.log(`Tile clicked: ${tokenId}`);
              });
            }
          }
        },
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true); // Clean up game instance on component unmount
    };
  }, [onTileSelect]);

  return <div id="phaser-container" ref={gameRef} className="game-canvas-wrapper" />;
};

export default PhaserGame;