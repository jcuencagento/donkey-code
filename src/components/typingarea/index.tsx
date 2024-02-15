

const TypingArea = ({ wpm }) => {
    return (
        <div className="flex w-full align-center justify-between m-auto mt-24 mb-6">
            <div className="m-auto">
            <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'pre-wrap', margin: 'auto' }}>
                <span style={{ display: 'inline-block'}}>T</span>
                    <span
                        style={{
                            position: 'absolute',
                            left: '-1.1px',
                            height: '100%',
                            width: '0.25vh',
                            background: 'violet',
                            animation: 'blinking 1s infinite'
                        }}
                    />
                </span>
                est area in development...
            </div>
        </div>
    );
};

export default TypingArea;