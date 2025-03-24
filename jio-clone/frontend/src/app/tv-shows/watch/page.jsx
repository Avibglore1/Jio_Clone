"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TvShowWatchPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [videoKey, setVideoKey] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchVideo = async () => {
      try {
        // Fetch videos for the TV show
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await response.json();

        // Get TV show details to display title
        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const detailsData = await detailsResponse.json();
        
        setTitle(detailsData.name);

        // Find trailer or teaser
        const trailer = data.results.find(
          (video) => 
            video.type === "Trailer" || 
            video.type === "Teaser" ||
            video.site === "YouTube"
        );

        if (trailer) {
          setVideoKey(trailer.key);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching video:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (error || !videoKey) {
    return (
      <div className="h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl mb-4">Video not available</h1>
        <p className="mb-6">Sorry, we couldn't find a trailer for this TV show.</p>
        <Link 
          href="/tv-shows" 
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition"
        >
          <ArrowLeft size={16} />
          Back to TV Shows
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back button */}
      <div className="p-4">
        <Link 
          href="/tv-shows" 
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft size={16} />
          Back to TV Shows
        </Link>
      </div>
      
      <div className="container mx-auto px-4 pb-10">
        <h1 className="text-2xl md:text-3xl mb-6">{title}</h1>
        
        {/* Video player */}
        <div className="relative pt-[56.25%] w-full">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}