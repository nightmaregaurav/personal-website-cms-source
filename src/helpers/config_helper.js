const get_config = async () => {
    const response = await fetch('/config.json', {method: 'GET'});
    return await response.json();
}

module.exports.get_config = get_config;
