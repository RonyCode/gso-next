import React from 'react';

const TransparentBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="backdrop-blur-sm fixed top-0 left-0 right-0 bottom-0 z-0 m-auto     h-screen  min-h-screen w-screen min-w-screen">
      <div className="flex h-full w-full justify-center items-center flex-col text-center">
        {children}
      </div>
    </div>
  );
};

export default TransparentBackground;
