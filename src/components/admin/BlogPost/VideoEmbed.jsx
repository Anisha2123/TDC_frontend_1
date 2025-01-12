import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

function VideoEmbed({ value, onChange }) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (value) {
      const videoId = value.split('/').pop();
      setUrl(`https://www.youtube.com/watch?v=${videoId}`);
    }
  }, [value]);

  const getYouTubeVideoId = (inputUrl) => {
    try {
      // Handle youtube.com URLs
      if (inputUrl.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(inputUrl).search);
        return urlParams.get('v');
      }
      // Handle youtu.be URLs
      if (inputUrl.includes('youtu.be')) {
        return inputUrl.split('youtu.be/')[1]?.split('?')[0];
      }
      // Handle youtube.com/embed URLs
      if (inputUrl.includes('youtube.com/embed/')) {
        return inputUrl.split('embed/')[1]?.split('?')[0];
      }
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return null;
    }
    return null;
  };

  const handleEmbed = () => {
    console.log('Embed button clicked');
    setError('');

    if (!url.trim()) {
      console.log('Empty URL');
      setError('Please enter a YouTube URL');
      return;
    }

    try {
      const videoId = getYouTubeVideoId(url);
      console.log('Attempting to parse URL:', url);
      console.log('Extracted Video ID:', videoId);

      if (!videoId) {
        console.log('Invalid video ID');
        setError('Please enter a valid YouTube URL');
        return;
      }

      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      console.log('Generated embed URL:', embedUrl);
      onChange(embedUrl);
      console.log('Embed URL set successfully');
    } catch (error) {
      console.error('Error in handleEmbed:', error);
      setError('An error occurred while processing the URL');
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError('');
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Paste YouTube video URL here... (e.g., https://www.youtube.com/watch?v=xxxxx)"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
          {error && (
            <div className="mt-2 flex items-center text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {error}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleEmbed}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Embed Video
          </button>
        </div>
      </div>

      {value && (
        <div className="relative pt-[56.25%] rounded-lg overflow-hidden bg-gray-100">
          <iframe
            src={value}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full border-0"
          />
        </div>
      )}
    </div>
  );
}

export default VideoEmbed; 