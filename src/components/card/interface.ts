export interface CardProps {
  id: number;
  gameType: string;
  gameDuration: string;
  wpm: string;
  mobile: boolean,
  createdAt: Date,
  creatorId: string,
  creatorUser: string,
  creatorImage: string,
  className?: string;
  index: number
}
