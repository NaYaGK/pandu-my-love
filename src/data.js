/*
  ═══════════════════════════════════════════════════════════
  PLAYLIST — replace `src` with your real audio URLs.

  GitHub raw:
    https://raw.githubusercontent.com/USER/REPO/main/song.mp3

  Google Drive (share → Anyone with link → copy file ID):
    https://drive.google.com/uc?export=download&id=FILE_ID

  AWS S3 (public bucket):
    https://your-bucket.s3.amazonaws.com/song.mp3
  ═══════════════════════════════════════════════════════════
*/
export const PLAYLIST = [
  { id: 1, title: 'Hiwaga',        artist: 'Tatin DC',         emoji: '🌸', src: '' },
  { id: 2, title: 'Wish',          artist: '16',                emoji: '💫', src: '' },
  { id: 3, title: 'Perfect',       artist: 'Ed Sheeran',        emoji: '🎶', src: '' },
  { id: 4, title: 'Add your song', artist: 'Your fav artist',   emoji: '🎵', src: '' },
]

export const GALLERY_IMAGES = [
  {
    src: 'https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/refs/heads/main/pandu/%201.jpg',
    alt: 'Bouquet of delicate pink roses',
  },
  {
    src: 'https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/refs/heads/main/pandu/%209.JPG',
    alt: 'Pink tulips in a glass vase',
  },
  {
    src: 'https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/refs/heads/main/2c81cff0-4b38-4a68-a2be-4b885a68a5f1.jpg',
    alt: 'Fluffy pink peony flowers',
  },
  {
    src: 'https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/refs/heads/main/pandu/%203.JPG',
    alt: 'Pink cherry blossoms against a blue sky',
  },
  {
    src: 'https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/refs/heads/main/pandu/%2015.JPG',
    alt: 'Light pink carnations',
  },
  {
    src: 'https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/refs/heads/main/pandu/%2012.JPG',
    alt: 'Vibrant pink azalea flowers',
  },
]

export const NOTES = [
  { emoji: '💆‍♀️', text: 'Take care of yourself, always. You matter more than anything.' },
  { emoji: '🍱',   text: "Don't skip meals. Eat on time — your health is my priority too." },
  { emoji: '🌙',   text: "Rest when you're tired. You don't have to be strong every day." },
  { emoji: '💕',   text: "You're mine… always. No matter the distance, I'm right here." },
  { emoji: '🌟',   text: 'On hard days, remember — I believe in you even when you don\'t.' },
  { emoji: '📞',   text: "Whenever you miss me, just call. I'm never too busy for you." },
]

export const LETTER = `My love,

Every day with you feels like a beautiful dream I never want to wake up from. Your smile brightens my darkest days, and your laughter is my favourite melody.

I cherish every moment we share — from our silly inside jokes to our deep conversations under the stars. You've shown me what true happiness feels like, and I'm forever grateful to have you in my life.

No matter where life takes us, always remember that my heart belongs to you.

I love you more than words can ever express, and I'll keep showing you every single day.`

export const LOVE_SYMBOLS = ['❤️','💕','🌸','💗','🌺','💖','🌷','✨','💫','🧸','💝','🌹']

// Password: simple — NOT real security. Move verification to a backend for production.
export function checkPassword(val) {
  return val.trim().toLowerCase() === 'pandumylove'
}
