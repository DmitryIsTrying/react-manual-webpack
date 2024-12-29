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

export const Button = ({
    className,
    children,
    theme = ThemeButton.CLEAR,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={classNames(cls.Button, {}, [className, cls[theme]])}
            {...props}
        >
            {children}
        </button>
    )
}
