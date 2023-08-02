import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    // userId, prompt, tag
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required!'],
    },
    tag: {
        type: String,
    },
    createdOn: {
        type: String,
    },
    edited: {
        type: String,
    },
    realized: {
        type: Boolean,
        required: true,
    }
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt