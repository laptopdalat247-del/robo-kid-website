export const YOUTUBE_CONFIG = {
  // Channel ID for ROBO-KID Academy (UCdqbkKhvUetRuZSgjvsNtGw)
  channelId: 'UCdqbkKhvUetRuZSgjvsNtGw',
  channelUrl: 'https://www.youtube.com/@ROBO-KID-Academy',
  playlistId: 'PLFLUzDTJuxZ-mQ-vP4ajhmwAm2rgWMx27',
  playlistUrl: 'https://www.youtube.com/playlist?list=PLFLUzDTJuxZ-mQ-vP4ajhmwAm2rgWMx27',
  // Hardcoded fallback videos (shown when RSS is empty or fetch fails)
  fallbackVideos: [
    { id: '6BE_5Osr5sU', title: 'Hướng dẫn đăng ký & đăng nhập' },
  ],
};

// rss2json: free CORS proxy that converts YouTube RSS → JSON
// Returns 422 when feed is empty (new channel or no public videos yet)
export const getChannelRssApiUrl = (channelId: string, count = 20) => {
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  return `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=${count}`;
};

export interface PlaylistVideo {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  link: string;
}
