import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
}

export const StarRating = ({ rating }: StarRatingProps) => {
  const fullStars = Math.floor(rating / 2);
  const hasHalfStar = rating % 2 >= 1;
  
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i < fullStars
              ? "fill-accent text-accent"
              : i === fullStars && hasHalfStar
              ? "fill-accent/50 text-accent"
              : "fill-none text-muted"
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};
