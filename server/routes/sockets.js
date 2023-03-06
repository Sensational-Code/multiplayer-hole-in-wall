
import { Server } from 'socket.io';
import { createServer } from "http";

// import PlayerController from '../controllers/PlayerController';
import LobbyController from '../controllers/LobbyController.js';


const httpServer = createServer();
const io = new Server(httpServer, {
	cors: {
		origin: 'http://localhost:3000'
	}
});


// function socketRoute(controller) {
// 	return (function(data, callback) {
// 		callback(controller({ socket: this, data }));
// 	});
// }

io.on('connection', (socket) => {

	// PlayerController.create();

	// socket.player = new Player(socket.id);

	// console.log(`New connection with id ${socket.id}`);
	
	// const socketWrapper = new SocketWrapper(socket);
	// socketWrapper.on('create-lobby-req', LobbyController.createLobby);

	// Lobby
	socket.on('lobby:create', LobbyController.createLobby);

	socket.on('lobby:join', LobbyController.joinLobby);

	// Game
	// socket.on('game:start', GameController.start);
	// socket.on('game:move', GameController.move);


	// Disconnect
	socket.on('disconnect', () => {
		LobbyController.removeMember();
		// GameController.leave();
	});


	// socket.on('join-new-lobby', LobbyController.createLobby);

	// socket.on('create-lobby-req', (data, callback) => {
	// 	let response = LobbyController.createLobby({ data, socket });
	// 	callback(response);
	// });

	// LobbyController.listen(socket);


	// player.lobby.leave();

	// PlayerController needs:
	// Socket id, player name, is host

	// LobbyController needs:
	// Each player on join/exit 
	// 

	// GameController needs:
	// List of players, player inputs

});
httpServer.listen(7777);



// socket connect
// join lobby