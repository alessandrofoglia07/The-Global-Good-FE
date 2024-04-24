interface Props {
    className?: string;
}

const Spinner: React.FC<Props> = ({ className }: Props) => (
    <div
        className={`h-12 w-12
                    animate-spin rounded-full border-2 border-solid border-darktan border-t-transparent ${className}`}></div>
);

export default Spinner;
