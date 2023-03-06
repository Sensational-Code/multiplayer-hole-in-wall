
// import test from 'node:test';
// import assert from 'node:assert';

import LobbyModel from '../models/LobbyModel';
import PlayerModel from '../models/PlayerModel';

test('find member lobby', () => {
	const player = PlayerModel.create({ id: Math.random() });
	const lobby = LobbyModel.create();
	lobby.addMember(player);

	expect(LobbyModel.findWithMember(player)).toBe(lobby);
});



// lobby.id = 21;
// lobby.memberIds = [1, 2, 3];

// player.id = 1;
// player.lobbyId = 21;

