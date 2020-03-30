"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MovieSchema = new mongoose_1.Schema({
    movie_id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    title: {
        type: String,
    },
    year: {
        type: String
    },
    rated: {
        type: String,
    },
    runtime: {
        type: Number
    },
    countries: [{
            type: String,
        }],
    genres: [{
            type: String,
        }],
    actors: [{
            type: String,
        }],
    writers: [{
            type: String,
        }],
    plot: {
        type: String,
    },
    poster: {
        type: String,
    },
    imdb: {
        id: {
            type: String,
        },
        rating: {
            type: String,
        },
        votes: {
            type: String
        }
    },
    tomato: {
        meter: {
            type: Number,
        },
        image: {
            type: String,
        },
        rating: {
            type: Number
        },
        reviews: {
            type: Number
        },
        fresh: {
            type: Number,
        },
        consensus: {
            type: String
        },
        userMeter: {
            type: Number,
        },
        userRating: {
            type: Number
        },
        userReviews: {
            type: Number
        },
    },
    metacritic: {
        type: Number,
    },
    awards: {
        wins: {
            type: String
        },
        nominations: {
            type: String
        }
    },
});
exports.default = mongoose_1.model("Movie", MovieSchema);
//# sourceMappingURL=movie_model.js.map