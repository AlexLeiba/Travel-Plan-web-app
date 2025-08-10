"use client";
import { Heart } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function FavoriteTrip() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const favoriteState = params.get("favorite");

  function handleFavoriteTrip() {
    if (favoriteState === `true`) {
      params.delete("favorite");
    } else {
      params.set("favorite", `true`);
    }

    router.replace(`?${params.toString()}`);
  }
  return (
    <div
      role="button"
      onKeyDown={(e) => e.key === "Enter" && handleFavoriteTrip()}
      onClick={handleFavoriteTrip}
      className="border border-white rounded-md p-2 cursor-pointer"
    >
      {favoriteState === `true` ? (
        <Heart size={20} className="text-red-500" />
      ) : (
        <Heart size={20} className="text-white" />
      )}
    </div>
  );
}
