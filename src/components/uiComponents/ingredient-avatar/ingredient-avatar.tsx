import { FC, ImgHTMLAttributes } from "react"
import cn from 'classnames';

import styles from './ingredient-avatar.module.css';

interface IngredientAvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  zIndex?: number;
  count?: number;
  isLast?: boolean;
}

export const IngredientAvatar: FC<IngredientAvatarProps> = ({className, zIndex, count, isLast, ...props}) => {
  return (
    <div className={cn(styles.avatar, className)} style={{zIndex}}>
      <div className={styles.background}>
        <img className={cn(styles.image, {
          [styles.last]: isLast,
        })} alt="Аватар" {...props} />
      </div>
      {!!count && (
        <p className={cn(styles.count, "text text_type_main-default")}>
          +{count}
        </p>
      )}
    </div>
  )
}
