'use client'

import  InlineEmbed  from "@calcom/embed-react";

export default function Booking() {
  return (
    <div className="h-screen">
    <InlineEmbed calLink="https://cal.com/sharon-di-salvo" style={{ height: "600px", width: "100%" }} />
    </div>
  );
}