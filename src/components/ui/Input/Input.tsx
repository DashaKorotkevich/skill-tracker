// components/ui/Search/Search.tsx
import styles from './Input.module.css';

export type InputVariant = 'search' | 'default';

interface InputProps {
  placeholder?: string;
  variant: InputVariant;
}

export const Input = ({
    placeholder,
    variant
}: InputProps
) => {
    return (
        variant === 'search' ? 
            <input className={styles.search} type="text" placeholder={placeholder}/>:
            <input type="text" placeholder={placeholder}/>
    )
};