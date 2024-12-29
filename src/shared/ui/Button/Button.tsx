import { ButtonHTMLAttributes, ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ThemeButton {
    CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children: ReactNode
    theme?: ThemeButton
}

export function Button({
    className,
    children,
    theme = ThemeButton.CLEAR,
    type,
    ...props
}: ButtonProps) {
    return (
        <button
            type="button"
            className={classNames(cls.Button, {}, [className, cls[theme]])}
            {...props}
        >
            {children}
        </button>
    )
}
Button.defaultProps = {
    className: '',
    theme: ThemeButton.CLEAR,
}
