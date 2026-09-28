"use client";

import React from "react";

export function ShaderFallback() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
      aria-hidden="true"
    >
      {/* Dynamic ambient gradients mimicking the shader */}
      <div className="absolute top-[-10%] left-[-10%] w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-[#3D5AFE]/25 to-transparent blur-[120px] transform -translate-x-1/4 -translate-y-1/4 animate-pulse" />
      <div className="absolute top-[30%] right-[-10%] w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-bl from-[#FF5A3C]/18 to-transparent blur-[130px] transform translate-x-1/4" />
      <div className="absolute bottom-[-15%] left-[25%] w-[60vw] h-[60vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-tr from-[#3D5AFE]/15 via-[#536DFE]/10 to-transparent blur-[140px]" />
    </div>
  );
}
