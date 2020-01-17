const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../util/parseStringAsArray");

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({github_username});

        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: "Point", 
                coordinates: [longitude, latitude]
            };

            dev = await Dev.create({
                github_username, name, avatar_url, bio, techs: techsArray, 
                location
            });
        }
        return response.send(dev);
    },
    async update(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.findOne({github_username});

        if(dev) {
            const techsArray = parseStringAsArray(techs);
            const location = {type: "Point", coordinates: [longitude, latitude]};
            const newDev = {avatar_url: dev.avatar_url, bio: dev.bio, techs: techsArray, location};

            dev = await Dev.updateOne({github_username}, newDev);
        }

        return response.send(dev);
    },
    async destroy(request, response) {
        const { github_username } = request.query;
        
        const dev = await Dev.deleteOne({github_username});

        return response.send(dev);
    }
};