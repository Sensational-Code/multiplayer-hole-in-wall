
// function LobbyModel(id) {
// 	this.id = id;
// 	this.players = [];
// }

// LobbyModel.addPlayer = function(player) {
// 	// this = instance of LobbyModel
// 	this.players.push(player);
// }

// LobbyModel.prototype = {
// 	lobbies: [],

// 	create() {
// 		// this = LobbyModel.prototype
// 	}
// };

import LobbyModelInterface from "./LobbyModel.interface";

export default class LobbyModel implements LobbyModelInterface {

	static lobbies : LobbyModel[] = [];

	public readonly id;
	public memberIds : number[] = [];
	public hostId = null;

	constructor(id : number) {
		this.id = id;
		// this.hostId = null;
		// this.memberIds = [];
	}

	addMember(memberId : number) : void {
		// member.setLobby(this);

		if (this.memberIds.length === 0) {
			// member.setHost();
			// this.host = member;
		}

		this.memberIds.push(memberId);
	}

	removeMember(memberId : number) : void {
		let playerIndex = this.memberIds.findIndex(id => id == memberId);
		this.memberIds.splice(playerIndex, 1);

		// let nextPlayer = this.memberIds[0];
		// if (nextPlayer) {
			// nextPlayer.makeHost();
		// }
	}

	hasMember(memberId : number) : boolean {
		for (let i = 0; i < this.memberIds.length; ++i) {
			if (this.memberIds[i] === memberId) {
				return true;
			}
		}

		return false;
	}

	isEmpty() : boolean {
		return this.memberIds.length === 0;
	}

	static create() : LobbyModel {
		let lobby : any = new LobbyModel(Math.random());
		LobbyModel.lobbies.push(lobby);

		return lobby;
	}

	static findWithMember(memberId : number) : LobbyModel | undefined {
		for (let i = 0; i < LobbyModel.lobbies.length; ++i) {
			let lobby = LobbyModel.lobbies[i];

			if (lobby.hasMember(memberId)) {
				return lobby;
			}
		}
	}

	static destroy(id : number) : void {
		let lobbyIndex = LobbyModel.lobbies.findIndex(lobby => lobby.id == id);
		LobbyModel.lobbies.splice(lobbyIndex, 1);
	}

	static find(id : number) : LobbyModel | undefined {
		return LobbyModel.lobbies.find(lobby => lobby.id == id);
	}

	static all() : LobbyModel[] {
		return LobbyModel.lobbies;
	}
}
