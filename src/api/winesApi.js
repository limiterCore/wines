import * as winesJSON from "../backend.json";

class WinesApi {

	static getAll() {
		return Promise.resolve(winesJSON.default);
	}
}

export default WinesApi;