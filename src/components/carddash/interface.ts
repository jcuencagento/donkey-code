export interface CardDashProps {
  id: number;
  gameType: string;
  gameDuration: string;
  wpm: string;
  createdAt: Date,
  creatorId: string,
  creatorUser: string,
  className?: string;
  index: number
}
