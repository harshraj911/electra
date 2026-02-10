import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const Home = () => {
    const logo = "/logo.png";
    const navigate = useNavigate();
    const [sliderPos, setSliderPos] = useState(0);
    const [isSwiped, setIsSwiped] = useState(false);
    const [logoError, setLogoError] = useState(false);
    const containerRef = useRef(null);
    const sliderRef = useRef(null);
    const isDragging = useRef(false);

    // Particle Background State
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate random particles for cinematic effect
        const p = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 5 + 2,
            delay: Math.random() * 5
        }));
        setParticles(p);
    }, []);

    const handleStart = () => { isDragging.current = true; };

    const handleMove = (e) => {
        if (!isDragging.current || isSwiped) return;
        const container = containerRef.current;
        const slider = sliderRef.current;
        if (!container || !slider) return;

        const rect = container.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        let pos = clientX - rect.left - 40;

        const maxPos = rect.width - slider.offsetWidth - 12;
        if (pos < 0) pos = 0;
        if (pos > maxPos) pos = maxPos;

        setSliderPos(pos);

        if (pos >= maxPos - 2) {
            isDragging.current = false;
            setIsSwiped(true);
            setTimeout(() => navigate('/register'), 600);
        }
    };

    const handleEnd = () => {
        if (isDragging.current && !isSwiped) {
            isDragging.current = false;
            setSliderPos(0);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);
        window.addEventListener('touchmove', handleMove);
        window.addEventListener('touchend', handleEnd);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [isSwiped]);

    return (
        <div className="min-h-screen relative bg-[#020617] text-white font-sans selection:bg-cyan-500/30 selection:text-white">

            {/* ENHANCED CINEMATIC BACKGROUND */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Smooth Gradient Mesh */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.15)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(190,242,100,0.1)_0%,transparent_50%)]"></div>

                {/* Moving Particles */}
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute bg-white/20 rounded-full blur-[1px] animate-float"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            animationDuration: `${p.speed}s`,
                            animationDelay: `${p.delay}s`
                        }}
                    />
                ))}

                {/* Subtle Moving Orbs */}
                <div className="absolute top-[20%] left-[10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-cyan-500/10 blur-[100px] md:blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-lime-500/10 blur-[100px] md:blur-[150px] animate-pulse" style={{ animationDelay: '-3s' }}></div>

                {/* Vertical Speed Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_80px]"></div>
            </div>

            {/* CONTENT LAYER */}
            <div className="relative z-10 min-h-screen flex flex-col justify-between p-6 md:p-12 max-w-[1600px] mx-auto">

                {/* Header Section */}
                <nav className="flex flex-col sm:flex-row justify-between items-center gap-8 py-4 sm:py-0 animate-fade-in-up">
                    <div className="flex items-center gap-4 sm:gap-6 group cursor-pointer" onClick={() => navigate('/')}>
                        <div className="relative">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 glass-morphism rounded-3xl flex items-center justify-center border-white/20 group-hover:border-primary transition-all duration-700 overflow-hidden active:scale-95">
                                {!logoError ? (
                                    <img
                                        src={logo}
                                        alt="Electra"
                                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                        onError={() => setLogoError(true)}
                                    />
                                ) : (
                                    <span className="font-black italic text-4xl sm:text-5xl text-primary animate-glitch select-none">E</span>
                                )}
                            </div>
                            <div className="absolute -inset-2 bg-primary/20 rounded-3xl animate-pulse-ring -z-10"></div>
                        </div>
                        <div>
                            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] sm:tracking-[0.7em] text-primary leading-none mb-1">Student Arena</p>
                            <h2 className="text-2xl sm:text-3xl font-black italic uppercase leading-none text-white tracking-tighter group-hover:text-primary transition-colors duration-500">ELECTRA</h2>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/admin/login')}
                        className="hidden lg:block group relative px-6 py-3 overflow-hidden rounded-full border border-white/10 hover:border-primary/50 transition-all duration-500"
                    >
                        <span className="relative z-10 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/40 group-hover:text-white transition-colors">Personnel Entrance</span>
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </button>
                </nav>

                {/* Hero Title Section */}
                <main className="flex flex-col items-center text-center">
                    <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center gap-4 justify-center">
                            <div className="h-[2px] w-12 bg-gradient-to-l from-primary to-transparent"></div>
                            <h3 className="font-heading text-xl md:text-2xl uppercase tracking-[1.5em] text-white/30 italic ml-4">College Arena League</h3>
                            <div className="h-[2px] w-12 bg-gradient-to-r from-primary to-transparent"></div>
                        </div>

                        <div className="relative inline-block py-10 group">
                            <h1 className="poster-title text-[15vw] md:text-[9rem] text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] animate-float">
                                GROUND
                            </h1>
                            <h1 className="poster-title text-[15vw] md:text-[9rem] bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-lime-400 mt-[-3vw] text-glow-cyan animate-glitch" style={{ animationDelay: '1s' }}>
                                CLASH
                            </h1>

                            {/* Decorative Corner Accents */}
                            <div className="absolute top-0 right-[-20%] w-32 h-32 border-t-2 border-r-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-[-20px] translate-y-[-20px]"></div>
                            <div className="absolute bottom-0 left-[-20%] w-32 h-32 border-b-2 border-l-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-[20px] translate-y-[20px]"></div>
                        </div>
                    </div>

                    {/* Sports Preview - ENHANCED CARDS */}
                    <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>

                        <div className="group relative glass-morphism p-10 text-left hover-card-3d overflow-hidden border-l-4 border-l-primary/50 hover:border-l-primary bg-gradient-to-br from-primary/5 to-transparent">
                            <div className="absolute top-0 right-0 p-6 text-7xl opacity-5 group-hover:opacity-20 transition-all duration-700 -rotate-12 group-hover:rotate-0 group-hover:scale-125">🏐</div>
                            <div className="relative z-10">
                                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-2 italic">Elite Division</p>
                                <h4 className="font-accent text-3xl italic text-white tracking-tighter text-glow-cyan group-hover:scale-105 transition-transform duration-500 origin-left">VOLLEYBALL</h4>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="h-[2px] w-12 bg-primary"></div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">6 v 6 Full Arena Battle</p>
                                </div>
                            </div>
                        </div>

                        <div className="group relative glass-morphism p-10 text-right hover-card-3d overflow-hidden border-r-4 border-r-secondary/50 hover:border-r-secondary bg-gradient-to-bl from-secondary/5 to-transparent">
                            <div className="absolute top-0 left-0 p-6 text-7xl opacity-5 group-hover:opacity-20 transition-all duration-700 rotate-12 group-hover:rotate-0 group-hover:scale-125">🏸</div>
                            <div className="relative z-10">
                                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-secondary mb-2 italic">Master Series</p>
                                <h4 className="font-accent text-3xl italic text-white tracking-tighter text-glow-lime group-hover:scale-105 transition-transform duration-500 origin-right">BADMINTON</h4>
                                <div className="mt-6 flex items-center gap-4 justify-end">
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Smash Battle • Solo / Duo</p>
                                    <div className="h-[2px] w-12 bg-secondary"></div>
                                </div>
                            </div>
                        </div>

                    </div>                    {/* QUICK ACCESS LINKS */}
                    <div className="flex gap-10 mt-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                        <button onClick={() => navigate('/guidelines')} className="group flex flex-col items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-primary transition-colors italic leading-none">Stadium</span>
                            <span className="font-accent text-xl italic tracking-tighter uppercase group-hover:text-glow-cyan transition-all">Protocol</span>
                        </button>
                        <div className="w-[1px] h-10 bg-white/10"></div>
                        <button onClick={() => navigate('/rulebook')} className="group flex flex-col items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 group-hover:text-secondary transition-colors italic leading-none">Official</span>
                            <span className="font-accent text-xl italic tracking-tighter uppercase group-hover:text-glow-lime transition-all">Rule Book</span>
                        </button>
                    </div>


                    {/* THE SLIDER - ULTRA PREMIUM */}
                    <div className="mt-24 w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                        <div className="relative group">
                            <div
                                ref={containerRef}
                                className={`h-28 bg-white/[0.02] border border-white/10 rounded-full p-3 relative flex items-center transition-all duration-1000 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isSwiped ? 'scale-110 opacity-0 blur-3xl' : 'hover:border-primary/30 group-hover:shadow-[0_0_60px_rgba(6,182,212,0.1)]'}`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-[14px] font-black uppercase tracking-[0.8em] text-white/10 italic group-hover:text-primary/30 group-hover:tracking-[1em] transition-all duration-700">
                                        Release the Clash
                                    </p>
                                </div>

                                {/* Energy Path */}
                                <div
                                    className="absolute left-3 h-22 bg-gradient-to-r from-primary via-white to-secondary rounded-full transition-all shadow-[0_0_40px_rgba(6,182,212,0.4)]"
                                    style={{ width: `${sliderPos + 80}px`, opacity: sliderPos > 2 ? 1 : 0 }}
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/40 blur-md"></div>
                                </div>

                                {/* Premium Handle */}
                                <div
                                    ref={sliderRef}
                                    onMouseDown={handleStart}
                                    onTouchStart={handleStart}
                                    style={{ transform: `translateX(${sliderPos}px)` }}
                                    className="w-22 h-22 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.8)] flex items-center justify-center cursor-grab active:cursor-grabbing z-20 transition-transform active:scale-95 group-hover:scale-105"
                                >
                                    <span className="text-black text-4xl font-black italic group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                            {/* Decorative Outer Ring */}
                            <div className="absolute -inset-4 border border-white/5 rounded-[60px] -z-10 group-hover:scale-105 group-hover:opacity-100 opacity-0 transition-all duration-700"></div>
                        </div>
                    </div>
                </main>

                {/* Footer Section */}
                <footer className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10 animate-fade-in-up mt-20 text-center md:text-left" style={{ animationDelay: '0.8s' }}>
                    <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10 group cursor-default">
                        <div className="md:text-right md:border-r-2 border-white/10 md:pr-10 group-hover:border-primary transition-colors duration-500">
                            <p className="font-heading text-3xl italic leading-none group-hover:text-primary transition-colors">FEB 20-21</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-white transition-colors mt-2">Arena Entry</p>
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="font-heading text-3xl italic leading-none group-hover:text-secondary transition-colors">SMD ARENA</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 group-hover:text-white transition-colors mt-2">Shanti Devi Mittal Indoor Sports Complex</p>
                        </div>
                    </div>

                    <div className="md:text-right space-y-4 max-w-md">
                        <div className="flex gap-4 items-center justify-center md:justify-end">
                            <div className="h-1 w-20 bg-gradient-to-l from-primary to-transparent"></div>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 italic">Legacy Production</p>
                        </div>
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 italic leading-relaxed">
                            Engineered for high-intensity athletic engagement. All rights reserved by Electra Organization 2026.
                        </p>
                    </div>
                </footer>

            </div>

            {/* Scanlines Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.05] mix-blend-overlay bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
        </div>
    );
};

export default Home;
