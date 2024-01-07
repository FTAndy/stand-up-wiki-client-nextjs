import nodeFetch from 'node-fetch'

export async function generateSpeechStream(text: string, voice_id: string) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "xi-api-key": process.env['XI_API_KEY'] || ''
    },
    body: JSON.stringify({
      "model_id": "eleven_multilingual_v2",
      "text": text,
      "voice_settings": {
        "similarity_boost": 1,
        "stability": 0.65,
        "style": 0.2,
        "use_speaker_boost": true
      }
    })
  };
  
  const response = await nodeFetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}/stream`, options)
  return response.body
}