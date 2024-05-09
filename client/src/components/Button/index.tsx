import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'solid' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => {
    const baseStyles = 'block w-full rounded px-6 py-2 text-sm font-medium text-white focus:outline-none focus:ring sm:w-auto';
    const solidStyles = 'bg-primary border border-primary hover:bg-opacity-80 active:text-opacity-75';
    const outlineStyles = 'border border-primary bg-primary bg-opacity-10 hover:bg-opacity-30 text-primary hover:bg-primary hover:text-white active:bg-secondary';

    const styles = `${baseStyles} ${variant === 'solid' ? solidStyles : outlineStyles}`;

    return (
        <button className={styles} {...props}>
            {children}
        </button>

    
    );
};

export {Button};
