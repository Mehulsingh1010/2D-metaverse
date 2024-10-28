import React, { useEffect } from 'react';
import Phaser from 'phaser';

const Game = () => {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        const game = new Phaser.Game(config);

        function preload() {
            this.load.image('map', '/path/to/map-image.png'); // Add your map image
            this.load.spritesheet('avatar', '/path/to/avatar-sprite.png', { frameWidth: 32, frameHeight: 32 });
        }

        function create() {
            this.add.image(400, 300, 'map'); // Map position on canvas
            this.player = this.physics.add.sprite(100, 100, 'avatar');
            this.cursors = this.input.keyboard.createCursorKeys(); // Movement control using arrow keys
        }

        function update() {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-160);
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(160);
            } else {
                this.player.setVelocityX(0);
            }

            if (this.cursors.up.isDown) {
                this.player.setVelocityY(-160);
            } else if (this.cursors.down.isDown) {
                this.player.setVelocityY(160);
            } else {
                this.player.setVelocityY(0);
            }
        }

        return () => {
            game.destroy(true); // Clean up Phaser game instance on unmount
        };
    }, []);

    return <div id="game-container"></div>;
};

export default Game;
