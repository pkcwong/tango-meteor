export const Browser = {

	/**
	 * Fetches a raw HTML for given url.
	 * @param json {url}
	 */
	get: (json) => {
		return new Promise((resolve, reject) => {
			fetch(json['url']).then((response) => {
				response.text().then((res) => {
					resolve(res);
				}).catch((err) => {
					reject(err);
				})
			}).catch((err) => {
				reject(err);
			});
		});
	}

};
