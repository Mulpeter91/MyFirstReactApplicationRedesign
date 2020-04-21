import React from 'react';

// const withClass = props => (
//     <div className={props.classes}>{props.children}</div>
// );

const withClass = (WrappedComponent, className) => {
    return props => (
        //the spread operator is taking the props and breaking them apart for their correct consumption. Passing props={props} would turn it into an object of props.
        <div className={className}>            
            <WrappedComponent {...props} />
        </div>
    );
}

export default withClass