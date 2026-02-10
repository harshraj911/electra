import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const logo = "/logo.png";
    const [logoError, setLogoError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const { uniqueId, game, teamType } = location.state || { uniqueId: 'ERR_ID', game: 'Unknown', teamType: 'Unknown' };

    useEffect(() => {
        if (!location.state?.uniqueId) {
            navigate('/');
        }
        setIsVisible(true);
    }, [location, navigate]);

    return (
        <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-500/10 blur-[200px] -z-10 animate-pulse"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(190,242,100,0.05)_0%,transparent_70%)]"></div>
            </div>

            <div className={`w-full max-w-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>

                <div className="text-center mb-12">
                    <div className="flex justify-center mb-8">
                        <div className="w-20 h-20 glass-morphism rounded-3xl flex items-center justify-center border-white/20 shadow-2xl relative z-10">
                            {!logoError ? (
                                <img src={logo} alt="Electra" className="w-full h-full object-contain p-4" onError={() => setLogoError(true)} />
                            ) : (
                                <span className="font-black italic text-4xl text-primary">E</span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4 animate-fade-in-up">
                        <div className="inline-block px-6 py-2 bg-lime-500/10 border border-lime-500/30 rounded-full mb-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-lime-400 italic">Registration Verified</p>
                        </div>
                        <h2 className="font-accent text-5xl md:text-6xl italic tracking-tighter uppercase leading-none">SYSTEM <span className="text-secondary text-glow-lime">ACTIVE</span></h2>
                    </div>
                </div>

                <div className="glass-morphism p-6 sm:p-10 rounded-[2rem] sm:rounded-[3rem] border border-white/10 relative overflow-hidden text-center space-y-8 sm:space-y-10 group">
                    {/* Security Scanner Line */}
                    <div className="absolute inset-x-0 h-1 bg-secondary/20 top-0 animate-scanner"></div>

                    <div className="space-y-2 relative z-10">
                        <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-white/30 italic">Target Identification ID</p>
                        <h3 className="font-accent text-3xl sm:text-4xl md:text-5xl italic text-white tracking-widest break-all select-all cursor-copy leading-tight">
                            {uniqueId}
                        </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-6 sm:py-8 border-y border-white/5 relative z-10">
                        <div className="text-left">
                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Combat Arena</p>
                            <p className="font-bold italic text-white text-xs sm:text-base">{game.toUpperCase()}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">Squad Logic</p>
                            <p className="font-bold italic text-white text-xs sm:text-base">{teamType.toUpperCase()}</p>
                        </div>
                    </div>

                    <div className="bg-secondary/5 p-4 sm:p-6 rounded-2xl border border-secondary/20 space-y-3 sm:space-y-4 relative z-10">
                        <div className="flex items-center justify-center gap-3 sm:gap-4 text-secondary">
                            <span className="text-xl sm:text-2xl animate-bounce">📸</span>
                            <p className="text-[10px] sm:text-[12px] font-black uppercase tracking-widest">ACTION REQUIRED</p>
                        </div>
                        <p className="text-[10px] sm:text-[11px] font-bold text-white/60 italic leading-relaxed">
                            TAKE A SCREENSHOT OF THIS PROTOCOL SLIP. <br className="hidden sm:block" />
                            THIS UNIQUE ID IS YOUR DEPLOYMENT CATEGORY. <br className="hidden sm:block" />
                            LOST IDS CANNOT BE RECOVERED.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-4 sm:py-6 btn-premium text-lg sm:text-xl mt-4"
                    >
                        <span className="relative z-10 font-black italic">RETURN TO BASE →</span>
                    </button>
                </div>

                <p className="text-center mt-12 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic animate-pulse">
                    Ground Clash Digital Ledger System v2.0
                </p>
            </div>
        </div>
    );
};

export default Success;
