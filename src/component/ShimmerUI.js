import React from "react";

const ShimmerUI = () => {
  return (
   
    <div className="bg-[#000] w-[150px] h-[250px] mt-[20%] absolute top-[10%] left-[50%] translate-x-[-50%] translate-y-[-50%] after:content-[' '] after:w-[120%] after:h-[20px] after:rounded-[50%] after:bg-[#000] after:absolute after:left-[-10%] after:bottom-[-10px] after:z-10">
      <span className="h-[0] w-[50px] bg-[#db0001] absolute left-0 bottom-0 animate-[anim_1s_forwards_1s]"></span>
      <span className="h-[0] w-[50px] bg-[#db0001] absolute top-0 left-0 skew-x-[22deg] origin-top-left shadow-[0_0_50px_#000] z-[2] animate-[anim_1s_forwards_2s]"></span>
      <span className="h-[0] w-[50px] bg-[#db0001] absolute right-0 bottom-0 animate-[anim_1s_forwards_3s] "></span>
    </div>
    
  );
};

export default ShimmerUI;
