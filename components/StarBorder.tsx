import React from 'react';

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
    as?: T;
    className?: string;
    children?: React.ReactNode;
    color?: string;
    speed?: React.CSSProperties['animationDuration'];
    thickness?: number;
};

const StarBorder = <T extends React.ElementType = 'button'>({
    as,
    className = '',
    color = 'cyan', // Changed default to fit request
    speed = '6s',
    thickness = 1,
    children,
    ...rest
}: StarBorderProps<T>) => {
    const Component = as || 'button';

    return (
        <>
            <style>
                {`
          @keyframes star-movement-bottom {
            0% { transform: translate(0%, 0%); opacity: 1; }
            100% { transform: translate(-100%, 0%); opacity: 0; }
          }
          @keyframes star-movement-top {
            0% { transform: translate(0%, 0%); opacity: 1; }
            100% { transform: translate(100%, 0%); opacity: 0; }
          }
        `}
            </style>
            <Component
                className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
                {...(rest as any)}
                style={{
                    padding: `${thickness}px 0`,
                    ...(rest as any).style
                }}
            >
                <div
                    className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full z-0"
                    style={{
                        background: `radial-gradient(circle, ${color}, transparent 10%)`,
                        animation: `star-movement-bottom ${speed} linear infinite alternate`
                    }}
                ></div>
                <div
                    className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full z-0"
                    style={{
                        background: `radial-gradient(circle, ${color}, transparent 10%)`,
                        animation: `star-movement-top ${speed} linear infinite alternate`
                    }}
                ></div>

                {/* Refined Inner Div for Light/Dark Context */}
                <div className="relative z-1 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 text-black dark:text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px] h-full flex items-center justify-center gap-4 transition-colors">
                    {children}
                </div>
            </Component>
        </>
    );
};

export default StarBorder;
