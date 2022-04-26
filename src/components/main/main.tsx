import { FC } from 'react';
import styles from './main.module.css';

interface MainProps {
  title: string;
}

export const Main: FC<MainProps> = ({title, children}) => {
  return (
    <main className={styles.main}>
      <h2 className="text text_type_main-large mt-10 mb-5">{title}</h2>
      <section className={styles.middle}>
        {children}
      </section>
    </main>
  );
};
