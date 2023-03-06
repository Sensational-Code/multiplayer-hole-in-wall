
import MemberModelInterface from './MemberModel.interface';

type PlayerModelType = {
	id: number;
	name?: string;
}

export default class PlayerModel implements MemberModelInterface {
	/**
	 * [players description]
	 * @type {Array}
	 */
	static players : PlayerModel[] = [];

	public id;
	public name;
	public lobbyId = null;

	/**
	 * [constructor description]
	 * @param  {[type]} options.id   [description]
	 * @param  {String} options.name [description]
	 * @return {[type]}              [description]
	 */
	constructor({ id , name = 'Player' } : { id : number, name? : string}) {
		this.id = id;
		this.name = name;
	}

	/**
	 * [create description]
	 * @return {[type]} [description]
	 */
	static create(properties : PlayerModelType) {
		let player : PlayerModel = new PlayerModel(properties);
		this.players.push(player);

		return player;
	}

	/**
	 * [get description]
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	static find(id: number) : PlayerModel | undefined {
		return this.players.find(player  => player.id === id);
	}

	/**
	 * [findOrCreate description]
	 * @param  {[type]} properties [description]
	 * @return {[type]}            [description]
	 */
	static findOrCreate(properties : PlayerModelType) : PlayerModel {
		let player = this.players.find(player => player.id === properties.id);
		if (player) {
			return player;
		}

		return this.create(properties);
	}
}
