import React from 'react';

export default React.memo(({inputRef, ...props}) => (
    <div ref={inputRef} {...props}/>
));
