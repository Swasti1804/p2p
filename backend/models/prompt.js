import mongoose from 'mongoose';

const promptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  promptText: {
    type: String,
    required: true,
  },
  generatedCode: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

// ✅ Fix: Use existing model if already compiled
const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', promptSchema);

export default Prompt;
