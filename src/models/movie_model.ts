import { Schema, Document, model } from "mongoose"



const MovieSchema = new Schema({
    movie_id: {
        type: Schema.Types.ObjectId,
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

})

export interface MovieI extends Document {
    movie_id: string,
    title: string,
    year: string,
    rated: string,
    runtime: number,
    countries: string[],
    actors: string[],
    writers: string[],
    plot: string[],
    poster: string[],
    imdb: {
        id: string,
        rating: number,
        votes: number,
    },
    tomato: {
        meter: number,
        image: string,
        rating: number,
        reviews: number,
        fresh : number,
        consensus: string,
        userMeter: number,
        userRating: number,
        userReviews: number
    },
    metacritic: number,
    awards: {
        wins: string,
        nominations: string
    }
}

export default model<MovieI>("Movie", MovieSchema)