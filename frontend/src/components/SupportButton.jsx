import React from 'react';

const SupportButton = () => {
    const phoneNumber = "7488985861";
    const message = encodeURIComponent("Hello! I need support regarding Ground Clash registration.");
    const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-28 right-4 sm:bottom-6 sm:right-6 z-[9999] group flex items-center gap-3"
        >
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all duration-500 animate-pulse"></div>

            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary italic whitespace-nowrap">GET SUPPORT</span>
            </div>

            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border-b-4 border-r-4 border-primary/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-3xl sm:text-4xl filter drop-shadow-md">💬</span>

                {/* Notification Badge */}
                <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full"></div>
            </div>
        </a>
    );
};

export default SupportButton;
