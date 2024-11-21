// Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ページロード時にキャッシュされたURLを取得
  useEffect(() => {
    const cachedUrl = localStorage.getItem('playlistUrl');
    if (cachedUrl) {
      setUrl(cachedUrl);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // エラーメッセージをリセット

    if (url) {
      try {
        // URLをローカルストレージに保存
        localStorage.setItem('playlistUrl', url);

        const response = await fetch('http://localhost:8080/post_url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }), // 入力されたURLを送信
        });

        if (response.ok) {
          const data = await response.json();
          console.log('サーバーからのレスポンス:', data);
          navigate('/playlist', { state: { url, response: data } });
        } else {
          setError('URL送信に失敗しました。もう一度お試しください。');
        }
      } catch (error) {
        console.error('エラーが発生しました', error);
        setError('エラーが発生しました。サーバーを確認してください。');
      }
    } else {
      setError('URLを入力してください');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          プレイリスト URL を入力
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Spotify プレイリストの URL を入力してください
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="https://spotify.com/playlist/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            送信
          </button>
        </form>
        {error && (
          <div className="mt-4 text-red-500 text-center font-semibold">{error}</div>
        )}
      </div>
    </div>
  );
}

export default Home;
