const RPC = require('discord-rpc');
const clientId = '1402012581887082527';

RPC.register(clientId);
const rpc = new RPC.Client({ transport: 'ipc' });

// List frame sesuai dengan nama di Developer Portal
const frames = ['tetris1', 'tetris2', 'tetris3', 'tetris4', 'tetris5', 'tetris6', 'tetris7', 'tetris8','tetris9','tetris10',];
let currentFrame = 0;

// Simpan waktu mulai (biar timer tidak reset)
const startTime = new Date();

rpc.on('ready', () => {
    console.log("✅ Tetris Rich Presence Aktif!");

    setInterval(() => {
        rpc.setActivity({
            details: 'Playing Tetris 🎮',
            state: 'Stacking blocks...',
            startTimestamp: startTime, // tidak direset, biar elapsed terus jalan
            largeImageKey: frames[currentFrame],
            largeImageText: 'Tetris Classic',
            instance: false
        });

        currentFrame = (currentFrame + 1) % frames.length;
    }, 1500); // Ganti frame tiap 1,5 detik
});

rpc.login({ clientId }).catch(console.error);
