import { FC } from "react";

interface FeedInfoScoreboardProps {
  label: string;
  total: number;
}

export const FeedInfoScoreboard: FC<FeedInfoScoreboardProps> = ({label, total}) => {
  return (
    <div>
      <p className="text text_type_main-medium">{label}</p>
      <p className="text text_type_digits-large">{total}</p>
    </div>
  );
}
