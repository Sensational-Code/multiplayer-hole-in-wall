
import LobbyModel from '../models/LobbyModel.js';
import PlayerModel from '../models/PlayerModel.js';

export default class LobbyController {

	constructor() {}

	/**
	 * Creates a new lobby with the player, or returns the existing lobby the player is in
	 */
	static createLobby(request: any, response: any) {
		let socket = this;
		
		let player = PlayerModel.findOrCreate({
			id: socket.id,
			name: request.playerName
		});

		let existingLobby = LobbyModel.findWithMember(player.id);
		if (existingLobby) {
			return response({ message: 'You have already created a lobby', player, lobby: existingLobby });
		}

		let lobby = LobbyModel.create();
		lobby.addMember(player.id);

		return response({ player, lobby });
	}

	/**
	 * Adds a member to an existing lobby
	 * Hard Reject cases:
	 * 	Member already in lobby
	 * 	Lobby does not exist
	 *
	 * Soft Reject cases:
	 * 	Member does not exist - create member and proceed
	 */
	static joinLobby(request: any, response: any) {
		let socket = this;
		
		let player = PlayerModel.findOrCreate({
			id: socket.id
		});

		let existingLobby = LobbyModel.findWithMember(player.id);
		if (existingLobby) {
			return response({ message: 'You must leave your current lobby to join a new one' });
		}

		let lobby = LobbyModel.find(request.lobbyId);

		if (!lobby) {
			return response({ message: 'No lobby found with that ID' });
		}

		lobby.addMember(player.id);

		return response({ player, lobby });
	}

	/**
	 * [leaveLobby description]
	 * @return {[type]} [description]
	 */
	static leaveLobby() {
		// 
	}

	/**
	 * [leaveLobby description]
	 * @return {[type]} [description]
	 */
	static startLobby() {
		// GameController.startGame();
	}

	/**
	 * Remove a member from a lobby
	 */
	static removeMember(request: any, response: any) {
		let socket = this;
		
		let player = PlayerModel.find(socket.id);

		if (!player) {
			return;
		}

		let lobby = LobbyModel.findWithMember(player.id);

		if (!lobby) {
			return;
		}

		lobby.removeMember(player.id);

		if (lobby.isEmpty()) {
			LobbyModel.destroy(lobby.id);
		}
		
	}
}



