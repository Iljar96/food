const postData = async (url, data) => {
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});

	return await res.json();
};

const getResource = async (url) => {
	const res = await fetch(url);

	//Избежание ошибок при fetch
	//свойство ok - говорит о том, что мы что-то получили(ok), или не получили
	//свойство status - там мы попадаем на тот статус, который вернул нам сервер (200-ok, 404- not found, 500...)
	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`); //Выкидываем новую ошибку
	}

	return await res.json();
};

export { postData };
export { getResource };