import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true}
},
{ timestamps: true},
);

export default mongoose.model("Activity", activitySchema);
