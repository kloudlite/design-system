import { motion } from 'framer-motion';
import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import useScreenSize from '../hooks/useScreen';

interface IProgressbarContext {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const context = createContext<IProgressbarContext>({
  count: 0,
  setCount: () => {},
});

const PBar = ({ duration }: { duration: number }) => {
  return (
    <motion.div className="kl-fixed kl-top-0 kl-left-0 kl-right-0 kl-z-[999]">
      <motion.div
        className="kl-absolute"
        initial={{
          left: '0%',
        }}
        animate={{
          left: '100%',
        }}
        transition={{
          repeat: Infinity,
          duration,
          ease: 'linear',
        }}
      >
        <motion.div
          className="kl-bg-surface-primary-default kl-h-sm kl-animate-pulse"
          initial={{
            width: '12vw',
          }}
          animate={{
            width: '20vw',
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 1,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const ProgressContainer = ({ children }: { children: ReactNode }) => {
  const { width } = useScreenSize();
  const duration = Math.ceil(width / (2240 / 3));
  const [count, setCount] = useState(0);

  return (
    <context.Provider
      value={useMemo(
        () => ({
          count,
          setCount,
        }),
        [count, setCount],
      )}
    >
      {count > 0 ? <PBar key={duration} duration={duration} /> : null}
      {children}
    </context.Provider>
  );
};

export const useProgress = () => {
  const { setCount, count } = useContext(context);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);
  return {
    show: increment,
    hide: decrement,
    reset,
    visible: count > 0,
  };
};

export default ProgressContainer;
