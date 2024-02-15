export interface CardProps {
  id: number;
  gameType: string;
  gameDuration: string;
  wpm: string;
  createdAt: Date,
  creatorId: string,
  creatorUser: string,
  creatorImage: string,
  className?: string;
  index: number
}
