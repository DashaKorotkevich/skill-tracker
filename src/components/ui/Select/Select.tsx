// components/ui/Select/Select.tsx
import styles from './Select.module.css';

export type SelectVariant = 'search' | 'default';

interface SelectProps {
  placeholder?: string;
  variant: SelectVariant;
}

export const Select = ({
    placeholder,
    variant
}: SelectProps
) => {
    return (
        variant === 'search' ? 
            <input className={styles.search} type="text" placeholder={placeholder}/>:
            <input type="text" placeholder={placeholder}/>
    )
};