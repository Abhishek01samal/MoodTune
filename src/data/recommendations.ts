export type Mood = "happy" | "sad" | "angry" | "surprised" | "neutral" | "fearful" | "disgusted";

export interface Recommendation {
  title: string;
  image: string;
  link: string;
  rating: number;
  platform?: string; // Where to watch/play/read/listen
}

export const moodEmojis: Record<Mood, string> = {
  happy: "😊",
  sad: "😢",
  angry: "😠",
  surprised: "😲",
  neutral: "😐",
  fearful: "😨",
  disgusted: "🤢"
};

export const musicRecommendations: Record<Mood, Recommendation[]> = {
  happy: [
    { title: "Happy Hits!", image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC", rating: 4.5, platform: "Spotify" },
    { title: "Feel Good Piano", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0", rating: 4.8, platform: "Spotify" },
    { title: "Mood Booster", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX3rxVfibe1L0", rating: 4.6, platform: "Spotify" },
    { title: "Good Vibes", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy", rating: 4.7, platform: "Spotify" },
    { title: "Sing-Along", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DXcF6B6QPhFDv", rating: 4.4, platform: "Spotify" }
  ],
  sad: [
    { title: "Life Sucks", image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634", rating: 4.3, platform: "Spotify" },
    { title: "Sad Hour", image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1", rating: 4.7, platform: "Spotify" },
    { title: "Sad Indie", image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX2UgsUIg75Vg", rating: 4.5, platform: "Spotify" },
    { title: "Melancholy", image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DWVrtsSlLKzro", rating: 4.6, platform: "Spotify" },
    { title: "Sad Songs", image: "https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1", rating: 4.4, platform: "Spotify" }
  ],
  angry: [
    { title: "Beast Mode", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX76Wlfdnj7AP", rating: 4.9, platform: "Spotify" },
    { title: "Rage Beats", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX1tyCD9QhIWF", rating: 4.6, platform: "Spotify" },
    { title: "Metal Workout", image: "https://images.unsplash.com/photo-1574267432644-f610a4ab698a?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DWWOaP4H0w5b0", rating: 4.8, platform: "Spotify" },
    { title: "Aggressive Rock", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DWWJOmJ7nRx0C", rating: 4.7, platform: "Spotify" },
    { title: "Power Hour", image: "https://images.unsplash.com/photo-1524650359799-842906ca1c06?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX32NsLKyzScr", rating: 4.5, platform: "Spotify" }
  ],
  surprised: [
    { title: "WTF!", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd", rating: 4.4, platform: "Spotify" },
    { title: "Mind Blown", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DXdwmD5Q7Gxah", rating: 4.5, platform: "Spotify" },
    { title: "Unexpected Hits", image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX4o1oenSJRJd", rating: 4.7, platform: "Spotify" },
    { title: "Pop Rising", image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DWUa8ZRTfalHk", rating: 4.6, platform: "Spotify" },
    { title: "Viral Hits", image: "https://images.unsplash.com/photo-1483412468200-72182dbbc544?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX2L0iB23Enbq", rating: 4.8, platform: "Spotify" }
  ],
  neutral: [
    { title: "Peaceful Piano", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO", rating: 4.7, platform: "Spotify" },
    { title: "Lofi Beats", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn", rating: 4.9, platform: "Spotify" },
    { title: "Chill Vibes", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6", rating: 4.6, platform: "Spotify" },
    { title: "Study Focus", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX8NTLI2TtZa6", rating: 4.8, platform: "Spotify" },
    { title: "Background Chill", image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DWUvQoIOFMvMz", rating: 4.5, platform: "Spotify" }
  ],
  fearful: [
    { title: "Calming Acoustic", image: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX1s9knjP51Oa", rating: 4.6, platform: "Spotify" },
    { title: "Comfort Zone", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX0XUsuxWHRQd", rating: 4.7, platform: "Spotify" },
    { title: "Peaceful Morning", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX9RwfGbeGQwP", rating: 4.8, platform: "Spotify" },
    { title: "Anxiety Relief", image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DWYcDQ1hSjOpY", rating: 4.5, platform: "Spotify" },
    { title: "Safe & Sound", image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY", rating: 4.4, platform: "Spotify" }
  ],
  disgusted: [
    { title: "Dark & Stormy", image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX4pUKG1kS0Ac", rating: 4.3, platform: "Spotify" },
    { title: "Gothic", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX1n9whBbVlCM", rating: 4.5, platform: "Spotify" },
    { title: "Industrial Metal", image: "https://images.unsplash.com/photo-1574267432644-f610a4ab698a?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DWTcqUzwhNmKv", rating: 4.6, platform: "Spotify" },
    { title: "Dark Alternative", image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DWWEJlAGA9gs0", rating: 4.4, platform: "Spotify" },
    { title: "Heavy Grunge", image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop", link: "https://open.spotify.com/playlist/37i9dQZF1DX1HCSfq0nSal", rating: 4.7, platform: "Spotify" }
  ]
};

export const movieRecommendations: Record<Mood, Recommendation[]> = {
  happy: [
    { title: "The Grand Budapest Hotel", image: "https://m.media-amazon.com/images/M/MV5BMzM5NjUxOTEyMl5BMl5BanBnXkFtZTgwNjEyMDM0MDE@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt2278388/", rating: 8.1, platform: "Netflix" },
    { title: "Paddington 2", image: "https://m.media-amazon.com/images/M/MV5BMmYwNWZlNzEtNjE4Zi00NzQ4LWI2YmUtOWZhNzZhZDYyNmVmXkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt4468740/", rating: 7.8, platform: "Prime Video" },
    { title: "La La Land", image: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt3783958/", rating: 8.0, platform: "Netflix" },
    { title: "Amélie", image: "https://m.media-amazon.com/images/M/MV5BNDg4NjM1YjMtYmNhZC00MjM0LWFiZmYtNGY1YjA3MzZmODc5XkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0211915/", rating: 8.3, platform: "Hulu" },
    { title: "Sing Street", image: "https://m.media-amazon.com/images/M/MV5BMjEzODAzNDM4M15BMl5BanBnXkFtZTgwNjAxMDUxODE@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt3544112/", rating: 7.9, platform: "Netflix" }
  ],
  sad: [
    { title: "The Green Mile", image: "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0120689/", rating: 8.6, platform: "Netflix" },
    { title: "Schindler's List", image: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0108052/", rating: 9.0, platform: "Netflix" },
    { title: "Eternal Sunshine", image: "https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0338013/", rating: 8.3, platform: "Prime Video" },
    { title: "Manchester by the Sea", image: "https://m.media-amazon.com/images/M/MV5BMjA5NTQzNTQzM15BMl5BanBnXkFtZTgwOTY1NTY3OTE@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt4034228/", rating: 7.8, platform: "Prime Video" },
    { title: "Her", image: "https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt1798709/", rating: 8.0, platform: "Max" }
  ],
  angry: [
    { title: "Mad Max: Fury Road", image: "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt1392190/", rating: 8.1, platform: "Max" },
    { title: "John Wick", image: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt2911666/", rating: 7.4, platform: "Peacock" },
    { title: "Whiplash", image: "https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiNjEzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt2582802/", rating: 8.5, platform: "Netflix" },
    { title: "Kill Bill", image: "https://m.media-amazon.com/images/M/MV5BNzM3NDFhYTAtYmU5Mi00NGRmLTljYjgtMDkyODQ4MjNkMGY2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0266697/", rating: 8.2, platform: "Paramount+" },
    { title: "The Raid", image: "https://m.media-amazon.com/images/M/MV5BMTYzNjY4NjY3Ml5BMl5BanBnXkFtZTcwNjY1NjU0Nw@@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt1899353/", rating: 7.6, platform: "Netflix" }
  ],
  surprised: [
    { title: "Inception", image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt1375666/", rating: 8.8, platform: "Netflix" },
    { title: "The Sixth Sense", image: "https://m.media-amazon.com/images/M/MV5BMWM4NTFhYjctNzUyNi00NGMwLTk3NTYtMDIyNTZmMzRlYmQyXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0167404/", rating: 8.2, platform: "Paramount+" },
    { title: "Shutter Island", image: "https://m.media-amazon.com/images/M/MV5BYzhiNDkyNzktNTZmYS00ZTBkLTk2MDAtM2U0YjU1MzgxZjgzXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt1130884/", rating: 8.2, platform: "Netflix" },
    { title: "The Prestige", image: "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0482571/", rating: 8.5, platform: "Prime Video" },
    { title: "Arrival", image: "https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_SX300.jpg", link: "https://www.imdb.com/title/tt2543164/", rating: 7.9, platform: "Paramount+" }
  ],
  neutral: [
    { title: "Lost in Translation", image: "https://m.media-amazon.com/images/M/MV5BMTUxMzk0NDg1MV5BMl5BanBnXkFtZTgwNDg0NjkxMDE@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0335266/", rating: 7.7, platform: "Max" },
    { title: "Paterson", image: "https://m.media-amazon.com/images/M/MV5BMjIyMjgxNjM3M15BMl5BanBnXkFtZTgwMzE0OTUxMDI@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt5247022/", rating: 7.4, platform: "Prime Video" },
    { title: "Before Sunrise", image: "https://m.media-amazon.com/images/M/MV5BZDdiZTAwYzAtMDI3Ni00OTRjLTkzN2UtMGE3MDMyZmU4NTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0112471/", rating: 8.1, platform: "Max" },
    { title: "The Secret Life of Walter Mitty", image: "https://m.media-amazon.com/images/M/MV5BODYwNDYxNDMxNl5BMl5BanBnXkFtZTgwOTAwMTk2MDE@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0359950/", rating: 7.3, platform: "Hulu" },
    { title: "Moonlight", image: "https://m.media-amazon.com/images/M/MV5BNzQxNTIyODAxMV5BMl5BanBnXkFtZTgwNzQyMDA3OTE@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt4975722/", rating: 7.4, platform: "Netflix" }
  ],
  fearful: [
    { title: "A Quiet Place", image: "https://m.media-amazon.com/images/M/MV5BMjI0MDMzNTQ0M15BMl5BanBnXkFtZTgwMTM5NzM3NDM@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt6644200/", rating: 7.5, platform: "Paramount+" },
    { title: "Get Out", image: "https://m.media-amazon.com/images/M/MV5BMjUxMDQwNjcyNl5BMl5BanBnXkFtZTgwNzcwMzc0MTI@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt5052448/", rating: 7.7, platform: "Netflix" },
    { title: "The Conjuring", image: "https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt1457767/", rating: 7.5, platform: "Max" },
    { title: "Hereditary", image: "https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt7784604/", rating: 7.3, platform: "Prime Video" },
    { title: "It Follows", image: "https://m.media-amazon.com/images/M/MV5BMTg0MjU4Nzc4NF5BMl5BanBnXkFtZTgwNjA4MDU4NDE@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt3235888/", rating: 6.8, platform: "Netflix" }
  ],
  disgusted: [
    { title: "Joker", image: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt7286456/", rating: 8.4, platform: "Max" },
    { title: "Trainspotting", image: "https://m.media-amazon.com/images/M/MV5BMzA5Zjc3ZTMtMmU5YS00YTMwLWI4MWUtYTU0YTVmNjVmODZhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0117951/", rating: 8.1, platform: "Netflix" },
    { title: "Nightcrawler", image: "https://m.media-amazon.com/images/M/MV5BN2U1YzdhYWMtZWUzMi00OWI1LWFkM2ItNWVjM2YxMGQ2MmNhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt2872718/", rating: 7.8, platform: "Netflix" },
    { title: "American Psycho", image: "https://m.media-amazon.com/images/M/MV5BZTM2ZGJmNjQtN2UyOS00NjcxLWFjMDktMDE2NzMyNTZlZTBiXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0144084/", rating: 7.6, platform: "Peacock" },
    { title: "Requiem for a Dream", image: "https://m.media-amazon.com/images/M/MV5BOTdiNzJlOWUtNWMwNS00NmFlLWI0YTEtZmI3YjIzZWUyY2Y3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", link: "https://www.imdb.com/title/tt0180093/", rating: 8.3, platform: "Hulu" }
  ]
};

export const animeRecommendations: Record<Mood, Recommendation[]> = {
  happy: [
    { title: "K-On!", image: "https://cdn.myanimelist.net/images/anime/1467/111714.jpg", link: "https://myanimelist.net/anime/5680/K-On", rating: 8.0 },
    { title: "Nichijou", image: "https://cdn.myanimelist.net/images/anime/3/75617.jpg", link: "https://myanimelist.net/anime/10165/Nichijou", rating: 8.4 },
    { title: "Barakamon", image: "https://cdn.myanimelist.net/images/anime/5/64621.jpg", link: "https://myanimelist.net/anime/22789/Barakamon", rating: 8.2 },
    { title: "Yuru Camp", image: "https://cdn.myanimelist.net/images/anime/1274/90888.jpg", link: "https://myanimelist.net/anime/34798/Yuru_Camp", rating: 7.8 },
    { title: "Shirokuma Cafe", image: "https://cdn.myanimelist.net/images/anime/11/34159.jpg", link: "https://myanimelist.net/anime/12815/Shirokuma_Cafe", rating: 7.9 }
  ],
  sad: [
    { title: "Your Lie in April", image: "https://cdn.myanimelist.net/images/anime/3/67177.jpg", link: "https://myanimelist.net/anime/23273/Shigatsu_wa_Kimi_no_Uso", rating: 8.7 },
    { title: "Clannad After Story", image: "https://cdn.myanimelist.net/images/anime/1299/110774.jpg", link: "https://myanimelist.net/anime/4181/Clannad__After_Story", rating: 9.0 },
    { title: "Anohana", image: "https://cdn.myanimelist.net/images/anime/5/79697.jpg", link: "https://myanimelist.net/anime/9989/Ano_Hi_Mita_Hana_no_Namae_wo_Bokutachi_wa_Mada_Shiranai", rating: 8.3 },
    { title: "Violet Evergarden", image: "https://cdn.myanimelist.net/images/anime/1795/95088.jpg", link: "https://myanimelist.net/anime/33352/Violet_Evergarden", rating: 8.7 },
    { title: "A Silent Voice", image: "https://cdn.myanimelist.net/images/anime/1122/96435.jpg", link: "https://myanimelist.net/anime/28851/Koe_no_Katachi", rating: 8.9 }
  ],
  angry: [
    { title: "Attack on Titan", image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg", link: "https://myanimelist.net/anime/16498/Shingeki_no_Kyojin", rating: 8.5 },
    { title: "Vinland Saga", image: "https://cdn.myanimelist.net/images/anime/1500/103005.jpg", link: "https://myanimelist.net/anime/37521/Vinland_Saga", rating: 8.7 },
    { title: "Berserk", image: "https://cdn.myanimelist.net/images/anime/10/19981.jpg", link: "https://myanimelist.net/anime/33/Kenpuu_Denki_Berserk", rating: 8.6 },
    { title: "Devilman Crybaby", image: "https://cdn.myanimelist.net/images/anime/1127/92064.jpg", link: "https://myanimelist.net/anime/35120/Devilman__Crybaby", rating: 7.6 },
    { title: "Megalo Box", image: "https://cdn.myanimelist.net/images/anime/1997/93479.jpg", link: "https://myanimelist.net/anime/36563/Megalo_Box", rating: 7.9 }
  ],
  surprised: [
    { title: "Steins;Gate", image: "https://cdn.myanimelist.net/images/anime/5/73199.jpg", link: "https://myanimelist.net/anime/9253/Steins_Gate", rating: 9.1 },
    { title: "Death Note", image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg", link: "https://myanimelist.net/anime/1535/Death_Note", rating: 8.6 },
    { title: "The Promised Neverland", image: "https://cdn.myanimelist.net/images/anime/1125/96929.jpg", link: "https://myanimelist.net/anime/37779/Yakusoku_no_Neverland", rating: 8.5 },
    { title: "Made in Abyss", image: "https://cdn.myanimelist.net/images/anime/6/86733.jpg", link: "https://myanimelist.net/anime/34599/Made_in_Abyss", rating: 8.3 },
    { title: "Erased", image: "https://cdn.myanimelist.net/images/anime/10/77957.jpg", link: "https://myanimelist.net/anime/31043/Boku_dake_ga_Inai_Machi", rating: 8.3 }
  ],
  neutral: [
    { title: "Mushishi", image: "https://cdn.myanimelist.net/images/anime/2/73862.jpg", link: "https://myanimelist.net/anime/457/Mushishi", rating: 8.7 },
    { title: "Natsume Yuujinchou", image: "https://cdn.myanimelist.net/images/anime/4/75466.jpg", link: "https://myanimelist.net/anime/4081/Natsume_Yuujinchou", rating: 8.3 },
    { title: "Space Brothers", image: "https://cdn.myanimelist.net/images/anime/9/37869.jpg", link: "https://myanimelist.net/anime/12431/Uchuu_Kyoudai", rating: 8.5 },
    { title: "March Comes in Like a Lion", image: "https://cdn.myanimelist.net/images/anime/3/81315.jpg", link: "https://myanimelist.net/anime/31646/3-gatsu_no_Lion", rating: 8.4 },
    { title: "Kino's Journey", image: "https://cdn.myanimelist.net/images/anime/7/75464.jpg", link: "https://myanimelist.net/anime/486/Kino_no_Tabi__The_Beautiful_World", rating: 8.3 }
  ],
  fearful: [
    { title: "Monster", image: "https://cdn.myanimelist.net/images/anime/10/18793.jpg", link: "https://myanimelist.net/anime/19/Monster", rating: 8.9 },
    { title: "Parasyte", image: "https://cdn.myanimelist.net/images/anime/3/73178.jpg", link: "https://myanimelist.net/anime/22535/Kiseijuu__Sei_no_Kakuritsu", rating: 8.3 },
    { title: "Another", image: "https://cdn.myanimelist.net/images/anime/7/36729.jpg", link: "https://myanimelist.net/anime/11111/Another", rating: 7.5 },
    { title: "Higurashi", image: "https://cdn.myanimelist.net/images/anime/9/72078.jpg", link: "https://myanimelist.net/anime/934/Higurashi_no_Naku_Koro_ni", rating: 7.9 },
    { title: "Shiki", image: "https://cdn.myanimelist.net/images/anime/5/74898.jpg", link: "https://myanimelist.net/anime/7724/Shiki", rating: 7.7 }
  ],
  disgusted: [
    { title: "Elfen Lied", image: "https://cdn.myanimelist.net/images/anime/10/21434.jpg", link: "https://myanimelist.net/anime/226/Elfen_Lied", rating: 7.5 },
    { title: "Tokyo Ghoul", image: "https://cdn.myanimelist.net/images/anime/5/64449.jpg", link: "https://myanimelist.net/anime/22319/Tokyo_Ghoul", rating: 7.8 },
    { title: "Psycho-Pass", image: "https://cdn.myanimelist.net/images/anime/5/43399.jpg", link: "https://myanimelist.net/anime/13601/Psycho-Pass", rating: 8.3 },
    { title: "Gantz", image: "https://cdn.myanimelist.net/images/anime/5/55524.jpg", link: "https://myanimelist.net/anime/384/Gantz", rating: 7.2 },
    { title: "Texhnolyze", image: "https://cdn.myanimelist.net/images/anime/11/15969.jpg", link: "https://myanimelist.net/anime/26/Texhnolyze", rating: 7.5 }
  ]
};

export const bookRecommendations: Record<Mood, Recommendation[]> = {
  happy: [
    { title: "The House in the Cerulean Sea", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1595348251i/45047384.jpg", link: "https://www.goodreads.com/book/show/45047384", rating: 4.5 },
    { title: "Project Hail Mary", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg", link: "https://www.goodreads.com/book/show/54493401", rating: 4.7 },
    { title: "Eleanor Oliphant Is Completely Fine", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490181612i/31434883.jpg", link: "https://www.goodreads.com/book/show/31434883", rating: 4.3 },
    { title: "The Midnight Library", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg", link: "https://www.goodreads.com/book/show/52578297", rating: 4.2 },
    { title: "Gideon the Ninth", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1559305393i/42036538.jpg", link: "https://www.goodreads.com/book/show/42036538", rating: 4.2 },
  ],
  sad: [
    { title: "The Midnight Library", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg", link: "https://www.goodreads.com/book/show/52578297", rating: 4.2 },
    { title: "A Little Life", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1446469353i/22822858.jpg", link: "https://www.goodreads.com/book/show/22822858", rating: 4.3 },
    { title: "The Book Thief", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1522157426i/19063.jpg", link: "https://www.goodreads.com/book/show/19063", rating: 4.4 },
    { title: "The Kite Runner", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg", link: "https://www.goodreads.com/book/show/77203", rating: 4.3 },
    { title: "The Fault in Our Stars", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1360206420i/11870085.jpg", link: "https://www.goodreads.com/book/show/11870085", rating: 4.2 },
  ],
  angry: [
    { title: "Gone Girl", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554086139i/19288043.jpg", link: "https://www.goodreads.com/book/show/19288043", rating: 4.0 },
    { title: "The Count of Monte Cristo", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1611834134i/7126.jpg", link: "https://www.goodreads.com/book/show/7126", rating: 4.3 },
    { title: "Fight Club", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1386925310i/36236124.jpg", link: "https://www.goodreads.com/book/show/36236124", rating: 4.2 },
    { title: "The Girl with the Dragon Tattoo", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684638853i/2429135.jpg", link: "https://www.goodreads.com/book/show/2429135", rating: 4.1 },
    { title: "American Psycho", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436934349i/28676.jpg", link: "https://www.goodreads.com/book/show/28676", rating: 3.8 },
  ],
  surprised: [
    { title: "The Silent Patient", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1582759969i/40097951.jpg", link: "https://www.goodreads.com/book/show/40097951", rating: 4.1 },
    { title: "Dark Matter", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1493340530i/27833670.jpg", link: "https://www.goodreads.com/book/show/27833670", rating: 4.1 },
    { title: "Recursion", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543687940i/42046112.jpg", link: "https://www.goodreads.com/book/show/42046112", rating: 4.2 },
    { title: "The Seven Deaths of Evelyn Hardcastle", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1520426248i/36337550.jpg", link: "https://www.goodreads.com/book/show/36337550", rating: 4.0 },
    { title: "Blake Crouch Bundle", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1584553900i/52879679.jpg", link: "https://www.goodreads.com/book/show/52879679", rating: 4.3 },
  ],
  neutral: [
    { title: "Educated", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1506026635i/35133922.jpg", link: "https://www.goodreads.com/book/show/35133922", rating: 4.5 },
    { title: "Sapiens", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1595674533i/23692271.jpg", link: "https://www.goodreads.com/book/show/23692271", rating: 4.4 },
    { title: "Atomic Habits", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg", link: "https://www.goodreads.com/book/show/40121378", rating: 4.4 },
    { title: "Thinking, Fast and Slow", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1317793965i/11468377.jpg", link: "https://www.goodreads.com/book/show/11468377", rating: 4.1 },
    { title: "The Alchemist", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg", link: "https://www.goodreads.com/book/show/18144590", rating: 3.9 },
  ],
  fearful: [
    { title: "The Shining", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg", link: "https://www.goodreads.com/book/show/11588", rating: 4.2 },
    { title: "Pet Sematary", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1551425219i/33124137.jpg", link: "https://www.goodreads.com/book/show/33124137", rating: 4.0 },
    { title: "The Haunting of Hill House", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327871336i/89717.jpg", link: "https://www.goodreads.com/book/show/89717", rating: 4.0 },
    { title: "It", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1334416842i/830502.jpg", link: "https://www.goodreads.com/book/show/830502", rating: 4.2 },
    { title: "Misery", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546274703i/10614.jpg", link: "https://www.goodreads.com/book/show/10614", rating: 4.1 },
  ],
  disgusted: [
    { title: "American Psycho", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436934349i/28676.jpg", link: "https://www.goodreads.com/book/show/28676", rating: 3.8 },
    { title: "The Wasp Factory", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320552609i/567678.jpg", link: "https://www.goodreads.com/book/show/567678", rating: 3.9 },
    { title: "Blood Meridian", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1453637821i/394535.jpg", link: "https://www.goodreads.com/book/show/394535", rating: 4.0 },
    { title: "The Road", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1600241424i/6288.jpg", link: "https://www.goodreads.com/book/show/6288", rating: 4.0 },
    { title: "A Clockwork Orange", image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575306410i/227463.jpg", link: "https://www.goodreads.com/book/show/227463", rating: 3.9 },
  ],
};

export const gameRecommendations: Record<Mood, Recommendation[]> = {
  happy: [
    { title: "Animal Crossing", image: "https://assets-prd.ignimgs.com/2021/11/19/animal-crossing-new-horizons-button-2020-1637353443311.jpg", link: "https://www.ign.com/games/animal-crossing-new-horizons", rating: 9.0 },
    { title: "Stardew Valley", image: "https://assets-prd.ignimgs.com/2022/02/04/stardew-valley-button-2020-1643943801464.jpg", link: "https://www.ign.com/games/stardew-valley", rating: 9.5 },
    { title: "It Takes Two", image: "https://assets-prd.ignimgs.com/2022/09/05/it-takes-two-button-2021-1662394993091.jpg", link: "https://www.ign.com/games/it-takes-two", rating: 9.0 },
    { title: "Celeste", image: "https://assets-prd.ignimgs.com/2022/02/08/celeste-1644282455612.jpg", link: "https://www.ign.com/games/celeste", rating: 9.5 },
    { title: "A Short Hike", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop", link: "https://ashorthike.com/", rating: 8.5 },
  ],
  sad: [
    { title: "The Last of Us", image: "https://assets-prd.ignimgs.com/2022/08/29/tlou-1661797362453.jpg", link: "https://www.ign.com/games/the-last-of-us", rating: 10.0 },
    { title: "Life is Strange", image: "https://assets-prd.ignimgs.com/2021/12/06/lifeisstrange-1638826221576.jpg", link: "https://www.ign.com/games/life-is-strange", rating: 7.8 },
    { title: "What Remains of Edith Finch", image: "https://assets-prd.ignimgs.com/2022/02/16/whatremainsofedithfinch-1645040976654.jpg", link: "https://www.ign.com/games/what-remains-of-edith-finch", rating: 9.0 },
    { title: "To The Moon", image: "https://images.unsplash.com/photo-1472457974886-0ebcd59440cc?w=400&h=400&fit=crop", link: "https://freebirdgames.com/games/to-the-moon/", rating: 9.5 },
    { title: "Spiritfarer", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop", link: "https://thunderlotusgames.com/spiritfarer/", rating: 8.8 },
  ],
  angry: [
    { title: "DOOM Eternal", image: "https://assets-prd.ignimgs.com/2021/11/17/doom-eternal-button-2020-1637179958929.jpg", link: "https://www.ign.com/games/doom-eternal", rating: 9.0 },
    { title: "God of War", image: "https://assets-prd.ignimgs.com/2022/01/10/godofwar-1641846069803.jpg", link: "https://www.ign.com/games/god-of-war-2018", rating: 10.0 },
    { title: "Dark Souls III", image: "https://assets-prd.ignimgs.com/2022/05/20/darksouls3-1653069988873.jpg", link: "https://www.ign.com/games/dark-souls-iii", rating: 9.5 },
    { title: "Sekiro", image: "https://assets-prd.ignimgs.com/2022/01/10/sekiro-1641845655238.jpg", link: "https://www.ign.com/games/sekiro-shadows-die-twice", rating: 9.5 },
    { title: "Hades", image: "https://assets-prd.ignimgs.com/2021/11/19/hades-button-2020-1637353440832.jpg", link: "https://www.ign.com/games/hades", rating: 10.0 },
  ],
  surprised: [
    { title: "Portal 2", image: "https://assets-prd.ignimgs.com/2022/01/27/portal2-1643313669249.jpg", link: "https://www.ign.com/games/portal-2", rating: 9.5 },
    { title: "The Stanley Parable", image: "https://assets-prd.ignimgs.com/2022/02/04/stanley-parable-button-2021-1643943805081.jpg", link: "https://www.ign.com/games/the-stanley-parable-ultra-deluxe", rating: 9.0 },
    { title: "Control", image: "https://assets-prd.ignimgs.com/2021/11/23/control-button-2019-1637692734730.jpg", link: "https://www.ign.com/games/control", rating: 8.8 },
    { title: "Outer Wilds", image: "https://assets-prd.ignimgs.com/2022/02/08/outer-wilds-1644340030818.jpg", link: "https://www.ign.com/games/outer-wilds", rating: 9.5 },
    { title: "Bioshock Infinite", image: "https://assets-prd.ignimgs.com/2022/01/20/bioshock-infinite-1642714458657.jpg", link: "https://www.ign.com/games/bioshock-infinite", rating: 9.4 },
  ],
  neutral: [
    { title: "The Witness", image: "https://assets-prd.ignimgs.com/2022/02/08/the-witness-button-2021-1644340033930.jpg", link: "https://www.ign.com/games/the-witness", rating: 10.0 },
    { title: "Journey", image: "https://assets-prd.ignimgs.com/2022/01/26/journey-1643242677804.jpg", link: "https://www.ign.com/games/journey", rating: 9.5 },
    { title: "Firewatch", image: "https://assets-prd.ignimgs.com/2021/11/19/firewatch-button-2020-1637354148088.jpg", link: "https://www.ign.com/games/firewatch", rating: 7.0 },
    { title: "Abzu", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop", link: "https://www.giantssquid.com/#abzu", rating: 8.5 },
    { title: "Gris", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", link: "https://nomada.studio/", rating: 8.8 },
  ],
  fearful: [
    { title: "Resident Evil Village", image: "https://assets-prd.ignimgs.com/2021/11/17/re-village-button-2021-1637179955997.jpg", link: "https://www.ign.com/games/resident-evil-village", rating: 9.0 },
    { title: "Alien: Isolation", image: "https://assets-prd.ignimgs.com/2022/01/18/alien-isolation-button-2020-1642530766653.jpg", link: "https://www.ign.com/games/alien-isolation", rating: 9.3 },
    { title: "Little Nightmares", image: "https://assets-prd.ignimgs.com/2022/01/19/little-nightmares-button-2020-1642624302098.jpg", link: "https://www.ign.com/games/little-nightmares", rating: 7.5 },
    { title: "Amnesia", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=400&fit=crop", link: "https://www.amnesiagame.com/", rating: 8.2 },
    { title: "Outlast", image: "https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=400&h=400&fit=crop", link: "https://redbarrelsgames.com/games/outlast/", rating: 7.8 },
  ],
  disgusted: [
    { title: "Dead Space", image: "https://assets-prd.ignimgs.com/2022/01/24/deadspace-button-2020-1643048533644.jpg", link: "https://www.ign.com/games/dead-space", rating: 9.0 },
    { title: "The Binding of Isaac", image: "https://assets-prd.ignimgs.com/2021/12/07/thebindingofisaac-1638892796063.jpg", link: "https://www.ign.com/games/the-binding-of-isaac-rebirth", rating: 9.0 },
    { title: "Bloodborne", image: "https://assets-prd.ignimgs.com/2022/01/10/bloodborne-1641843501409.jpg", link: "https://www.ign.com/games/bloodborne", rating: 9.1 },
    { title: "Resident Evil 7", image: "https://assets-prd.ignimgs.com/2022/01/20/resident-evil-7-1642714462369.jpg", link: "https://www.ign.com/games/resident-evil-7-biohazard", rating: 9.0 },
    { title: "Soma", image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop", link: "https://store.steampowered.com/app/282140/SOMA/", rating: 8.5 },
  ],
};

export const podcastRecommendations: Record<Mood, Recommendation[]> = {
  happy: [
    { title: "Conan O'Brien Needs A Friend", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop", link: "https://www.earwolf.com/show/conan-obrien/", rating: 4.8 },
    { title: "SmartLess", image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=400&fit=crop", link: "https://www.smartless.com/", rating: 4.7 },
    { title: "The Daily Show", image: "https://images.unsplash.com/photo-1561189798-bea0b67e5cda?w=400&h=400&fit=crop", link: "https://www.thedailyshow.com/podcast", rating: 4.5 },
    { title: "Office Ladies", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop", link: "https://officeladies.com/", rating: 4.7 },
    { title: "How Did This Get Made?", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", link: "https://www.earwolf.com/show/how-did-this-get-made/", rating: 4.6 },
  ],
  sad: [
    { title: "On Being", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop", link: "https://onbeing.org/series/podcast/", rating: 4.6 },
    { title: "The Moth", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop", link: "https://themoth.org/podcast", rating: 4.7 },
    { title: "This American Life", image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=400&fit=crop", link: "https://www.thisamericanlife.org/", rating: 4.8 },
    { title: "Dear Sugars", image: "https://images.unsplash.com/photo-1472457974886-0ebcd59440cc?w=400&h=400&fit=crop", link: "https://www.wbur.org/dearsugars", rating: 4.5 },
    { title: "The Heart", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop", link: "https://www.theheartradio.org/", rating: 4.4 },
  ],
  angry: [
    { title: "The Joe Rogan Experience", image: "https://images.unsplash.com/photo-1561189798-bea0b67e5cda?w=400&h=400&fit=crop", link: "https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk", rating: 4.4 },
    { title: "Hardcore History", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop", link: "https://www.dancarlin.com/hardcore-history-series/", rating: 4.9 },
    { title: "Behind the Bastards", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop", link: "https://www.iheart.com/podcast/105-behind-the-bastards-29236323/", rating: 4.6 },
    { title: "The Daily", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=400&fit=crop", link: "https://www.nytimes.com/column/the-daily", rating: 4.7 },
    { title: "RevisionistHistory", image: "https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=400&h=400&fit=crop", link: "https://www.pushkin.fm/podcasts/revisionist-history", rating: 4.5 },
  ],
  surprised: [
    { title: "Radiolab", image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=400&fit=crop", link: "https://radiolab.org/", rating: 4.7 },
    { title: "99% Invisible", image: "https://images.unsplash.com/photo-1561189798-bea0b67e5cda?w=400&h=400&fit=crop", link: "https://99percentinvisible.org/", rating: 4.8 },
    { title: "Reply All", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop", link: "https://gimletmedia.com/shows/reply-all", rating: 4.6 },
    { title: "Stuff You Should Know", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop", link: "https://www.iheart.com/podcast/105-stuff-you-should-know-26940277/", rating: 4.6 },
    { title: "Planet Money", image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop", link: "https://www.npr.org/sections/money/", rating: 4.5 },
  ],
  neutral: [
    { title: "Philosophize This!", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop", link: "https://www.philosophizethis.org/", rating: 4.8 },
    { title: "Hidden Brain", image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=400&fit=crop", link: "https://hiddenbrain.org/", rating: 4.7 },
    { title: "How I Built This", image: "https://images.unsplash.com/photo-1561189798-bea0b67e5cda?w=400&h=400&fit=crop", link: "https://www.npr.org/podcasts/510313/how-i-built-this", rating: 4.6 },
    { title: "Freakonomics", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop", link: "https://freakonomics.com/series/freakonomics-radio/", rating: 4.5 },
    { title: "TED Radio Hour", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop", link: "https://www.npr.org/programs/ted-radio-hour/", rating: 4.6 },
  ],
  fearful: [
    { title: "Lore", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop", link: "https://www.lorepodcast.com/", rating: 4.5 },
    { title: "The NoSleep Podcast", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop", link: "https://www.thenosleeppodcast.com/", rating: 4.6 },
    { title: "Limetown", image: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=400&h=400&fit=crop", link: "https://www.twoupproductions.com/limetown", rating: 4.4 },
    { title: "Welcome to Night Vale", image: "https://images.unsplash.com/photo-1472457974886-0ebcd59440cc?w=400&h=400&fit=crop", link: "https://www.welcometonightvale.com/", rating: 4.7 },
    { title: "The Magnus Archives", image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=400&fit=crop", link: "https://rustyquill.com/the-magnus-archives/", rating: 4.8 },
  ],
  disgusted: [
    { title: "Crime Junkie", image: "https://images.unsplash.com/photo-1561189798-bea0b67e5cda?w=400&h=400&fit=crop", link: "https://crimejunkiepodcast.com/", rating: 4.6 },
    { title: "My Favorite Murder", image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop", link: "https://myfavoritemurder.com/", rating: 4.5 },
    { title: "Casefile True Crime", image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop", link: "https://casefilepodcast.com/", rating: 4.8 },
    { title: "Serial", image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=400&fit=crop", link: "https://serialpodcast.org/", rating: 4.7 },
    { title: "Dirty John", image: "https://images.unsplash.com/photo-1551415923-a2297c7fda79?w=400&h=400&fit=crop", link: "https://wondery.com/shows/dirty-john/", rating: 4.4 },
  ],
};
