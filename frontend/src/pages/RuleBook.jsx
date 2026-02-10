import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

const RuleBook = () => {
    const navigate = useNavigate();
    const [logoError, setLogoError] = useState(false);
    const logo = "/logo.png";

    const badmintonRef = useRef(null);
    const volleyballRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white py-12 px-6 relative overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute inset-0 bg-[#000] opacity-50 -z-20"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <header className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
                    <div className="w-20 h-20 glass-morphism rounded-3xl flex items-center justify-center border-white/20 shadow-2xl overflow-hidden cursor-pointer hover:scale-110 active:scale-95 transition-all duration-500 mb-8" onClick={() => navigate('/')}>
                        {!logoError ? (
                            <img src={logo} alt="Electra" className="w-full h-full object-contain p-3" onError={() => setLogoError(true)} />
                        ) : (
                            <span className="font-black italic text-4xl text-primary">E</span>
                        )}
                    </div>
                    <h1 className="font-accent text-5xl md:text-7xl italic tracking-tighter uppercase mb-2 text-glow-cyan">Rule Book: <span className="text-primary">Ground Clash</span></h1>
                    <p className="text-[12px] font-black uppercase tracking-[0.8em] text-white/30 italic">Outdoor Sports Event Rule Book</p>
                </header>

                {/* Top Actions & Nav */}
                <div className="flex flex-wrap justify-center gap-6 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <button onClick={() => navigate('/')} className="px-8 py-3 glass-morphism rounded-full font-black uppercase text-[10px] tracking-widest hover:text-primary transition-all">Back to Home</button>
                    <button onClick={() => navigate('/register')} className="px-8 py-3 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-all">Register Now</button>
                    <a
                        href="/RuleBook.pdf"
                        download="GroundClash_RuleBook.pdf"
                        className="px-8 py-3 glass-morphism border-primary/40 text-primary rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                    >
                        Download Rule Book (PDF)
                    </a>
                </div>

                {/* Section Navigation */}
                <div className="flex justify-center gap-10 mb-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <button onClick={() => scrollToSection(badmintonRef)} className="flex items-center gap-3 group">
                        <span className="text-3xl group-hover:scale-125 transition-transform duration-500">🏸</span>
                        <span className="font-accent text-xl italic tracking-tighter uppercase group-hover:text-primary transition-colors">Badminton</span>
                    </button>
                    <button onClick={() => scrollToSection(volleyballRef)} className="flex items-center gap-3 group">
                        <span className="text-3xl group-hover:scale-125 transition-transform duration-500">🏐</span>
                        <span className="font-accent text-xl italic tracking-tighter uppercase group-hover:text-secondary transition-colors">Volleyball</span>
                    </button>
                </div>

                {/* BADMINTON SECTION */}
                <section ref={badmintonRef} className="mb-32 space-y-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="flex items-center gap-6 border-b border-primary/20 pb-6">
                        <span className="text-5xl">🏸</span>
                        <h2 className="font-accent text-4xl md:text-5xl italic tracking-tighter uppercase text-primary text-glow-cyan">Badminton Rule Book</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Game Mode Card */}
                        <div className="glass-morphism p-10 rounded-[2.5rem] border-t-4 border-t-primary space-y-8">
                            <h3 className="font-accent text-2xl italic uppercase text-white/40 tracking-widest underline decoration-primary/30 underline-offset-8">Game Mode</h3>
                            <ul className="space-y-4 font-bold uppercase text-[11px] tracking-widest text-white/60">
                                <li className="flex justify-between"><span>Mode</span> <span className="text-white">Singles (Solo)</span></li>
                                <li className="flex justify-between"><span>Scoring System</span> <span className="text-white">Rally point system</span></li>
                                <li className="flex justify-between"><span>Match Type</span> <span className="text-white">Single Elimination</span></li>
                                <li className="flex justify-between"><span>Points per Match</span> <span className="text-white">15 points</span></li>
                                <li className="flex justify-between border-t border-white/5 pt-4"><span>Format</span> <span className="text-primary italic">Knockout / League</span></li>
                            </ul>
                        </div>

                        {/* Rules Card */}
                        <div className="glass-morphism p-10 rounded-[2.5rem] border-t-4 border-t-primary space-y-8">
                            <h3 className="font-accent text-2xl italic uppercase text-white/40 tracking-widest underline decoration-primary/30 underline-offset-8">Rules</h3>
                            <ul className="grid gap-4">
                                {[
                                    "Standard badminton rules will be followed.",
                                    "Player must win by a minimum margin of 2 points.",
                                    "Serve diagonally into opponent’s service court.",
                                    "Shuttle touching net and landing inside is valid.",
                                    "Bring your own rackets; shuttles provided.",
                                    "No coaching allowed during an ongoing match."
                                ].map((rule, i) => (
                                    <li key={i} className="flex gap-4 text-[10px] font-bold uppercase tracking-widest leading-relaxed italic border-b border-white/5 pb-2">
                                        <span className="text-primary italic">#{i + 1}</span>
                                        <span>{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Format Tables */}
                    <div className="space-y-12">
                        <h3 className="font-accent text-3xl italic tracking-tighter uppercase text-center mt-20">Match Format (Single Elimination)</h3>
                        <div className="grid lg:grid-cols-2 gap-10">
                            {/* Singles Table */}
                            <div className="glass-morphism rounded-[2rem] overflow-hidden">
                                <div className="bg-primary/10 p-6 border-b border-primary/20">
                                    <h4 className="font-accent text-xl italic tracking-tighter uppercase">Singles (Solo) Table</h4>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-[11px] font-black uppercase tracking-widest opacity-80 min-w-[400px]">
                                        <thead>
                                            <tr className="bg-white/5">
                                                <th className="px-6 py-4">Round</th>
                                                <th className="px-6 py-4 text-center">Players</th>
                                                <th className="px-6 py-4 text-right">Matches</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            <tr><td className="px-6 py-4">Round 1</td><td className="px-6 py-4 text-center">20</td><td className="px-6 py-4 text-right">10</td></tr>
                                            <tr><td className="px-6 py-4">Quarterfinals</td><td className="px-6 py-4 text-center">10</td><td className="px-6 py-4 text-right">5</td></tr>
                                            <tr><td className="px-6 py-4">Semi-Finals</td><td className="px-6 py-4 text-center">5</td><td className="px-6 py-4 text-right">Byes</td></tr>
                                            <tr><td className="px-6 py-4 text-primary">Final</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4 text-right text-primary">1</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Doubles Table */}
                            <div className="glass-morphism rounded-[2rem] overflow-hidden">
                                <div className="bg-primary/10 p-6 border-b border-primary/20">
                                    <h4 className="font-accent text-xl italic tracking-tighter uppercase">Doubles (Duo) Table</h4>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-[11px] font-black uppercase tracking-widest opacity-80 min-w-[400px]">
                                        <thead>
                                            <tr className="bg-white/5">
                                                <th className="px-6 py-4">Round</th>
                                                <th className="px-6 py-4 text-center">Teams</th>
                                                <th className="px-6 py-4 text-right">Matches</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            <tr><td className="px-6 py-4">Round 1</td><td className="px-6 py-4 text-center">20</td><td className="px-6 py-4 text-right">10</td></tr>
                                            <tr><td className="px-6 py-4">Quarterfinals</td><td className="px-6 py-4 text-center">10</td><td className="px-6 py-4 text-right">5</td></tr>
                                            <tr><td className="px-6 py-4">Semi-Finals</td><td className="px-6 py-4 text-center">5</td><td className="px-6 py-4 text-right">Byes</td></tr>
                                            <tr><td className="px-6 py-4 text-primary">Final</td><td className="px-6 py-4 text-center">2</td><td className="px-6 py-4 text-right text-primary">1</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* VOLLEYBALL SECTION */}
                <section ref={volleyballRef} className="mb-32 space-y-12 animate-fade-in-up">
                    <div className="flex items-center gap-6 border-b border-secondary/20 pb-6">
                        <span className="text-5xl">🏐</span>
                        <h2 className="font-accent text-4xl md:text-5xl italic tracking-tighter uppercase text-secondary text-glow-lime">Volleyball Rule Book</h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* Game Mode Card */}
                        <div className="glass-morphism p-10 rounded-[2.5rem] border-t-4 border-t-secondary space-y-8">
                            <h3 className="font-accent text-2xl italic uppercase text-white/40 tracking-widest underline decoration-secondary/30 underline-offset-8">Game Mode</h3>
                            <ul className="space-y-4 font-bold uppercase text-[11px] tracking-widest text-white/60">
                                <li className="flex justify-between"><span>Mode</span> <span className="text-white">Team Play (6v6)</span></li>
                                <li className="flex justify-between"><span>Match Type</span> <span className="text-white">Single Match</span></li>
                                <li className="flex justify-between"><span>Points per Match</span> <span className="text-white">15 points</span></li>
                                <li className="flex justify-between"><span>Substitute Cap</span> <span className="text-white">Max 2 substitutes</span></li>
                                <li className="flex justify-between border-t border-white/5 pt-4"><span>Tournament</span> <span className="text-secondary italic">Knockout / League</span></li>
                            </ul>
                        </div>

                        {/* Rules Card */}
                        <div className="glass-morphism p-10 rounded-[2.5rem] border-t-4 border-t-secondary space-y-8">
                            <h3 className="font-accent text-2xl italic uppercase text-white/40 tracking-widest underline decoration-secondary/30 underline-offset-8">Regulations</h3>
                            <ul className="grid gap-4">
                                {[
                                    "Rotation is mandatory after winning service.",
                                    "Max 3 touches per side.",
                                    "Touches of net or carriers are fouls.",
                                    "Serve from behind the service line.",
                                    "One timeout allowed per match.",
                                    "Referee decision is final and binding."
                                ].map((rule, i) => (
                                    <li key={i} className="flex gap-4 text-[10px] font-bold uppercase tracking-widest leading-relaxed italic border-b border-white/5 pb-2">
                                        <span className="text-secondary italic">#{i + 1}</span>
                                        <span>{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Squad Diversity Card */}
                        <div className="glass-morphism p-10 rounded-[2.5rem] border-t-4 border-t-secondary space-y-8">
                            <h3 className="font-accent text-2xl italic uppercase text-white/40 tracking-widest underline decoration-secondary/30 underline-offset-8">Squad Diversity</h3>
                            <ul className="grid gap-4">
                                {[
                                    "In Team of 6: Max 2 players from the same Indian State.",
                                    "Foreigners: Max 2 players from the same Country.",
                                    "Substitutes (2): Exempt from specific state/country quotas.",
                                    "Proof of domicile/passport required if contested."
                                ].map((rule, i) => (
                                    <li key={i} className="flex gap-4 text-[10px] font-bold uppercase tracking-widest leading-relaxed italic border-b border-white/5 pb-2">
                                        <span className="text-secondary italic">🌍</span>
                                        <span>{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Stats Tables */}
                    <div className="space-y-12 mt-20">
                        <h3 className="font-accent text-3xl italic tracking-tighter uppercase text-center">Team & Group Logistics</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="glass-morphism p-8 rounded-[2rem] text-center border-b-4 border-b-secondary/20">
                                <p className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-2">Team Formation</p>
                                <h4 className="text-4xl font-accent italic tracking-tighter">60 Players</h4>
                                <p className="text-xs font-bold text-secondary mt-2 tracking-widest">10 TEAMS TOTAL</p>
                            </div>
                            <div className="glass-morphism p-8 rounded-[2rem] text-center border-b-4 border-b-secondary/20">
                                <p className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-2">Distribution</p>
                                <h4 className="text-4xl font-accent italic tracking-tighter">2 Groups</h4>
                                <p className="text-xs font-bold text-secondary mt-2 tracking-widest">5 TEAMS PER GROUP</p>
                            </div>
                            <div className="glass-morphism p-8 rounded-[2rem] text-center border-b-4 border-b-secondary/20">
                                <p className="text-[10px] font-black uppercase text-white/30 tracking-widest mb-2">Qualifiers</p>
                                <h4 className="text-4xl font-accent italic tracking-tighter">Top 2 Teams</h4>
                                <p className="text-xs font-bold text-secondary mt-2 tracking-widest">TO SEMI-FINALS</p>
                            </div>
                        </div>
                    </div>

                    {/* Points Table Illustration */}
                    <div className="glass-morphism rounded-[2.5rem] overflow-hidden mt-10">
                        <div className="bg-secondary/10 p-6 border-b border-secondary/20 flex justify-between items-center">
                            <h4 className="font-accent text-2xl italic tracking-tighter uppercase">Sample Group Table</h4>
                            <div className="text-[10px] font-bold tracking-widest opacity-40">WIN = 2 PTS | LOSS = 0 PTS</div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-[11px] font-black uppercase tracking-widest opacity-80 min-w-[500px]">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/5">
                                        <th className="px-8 py-6">Team</th>
                                        <th className="px-8 py-6">Matches</th>
                                        <th className="px-8 py-6">Wins</th>
                                        <th className="px-8 py-6">Losses</th>
                                        <th className="px-8 py-6 text-secondary">Points</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-8 py-6">Team {letter}</td>
                                            <td className="px-8 py-6 italic">4</td>
                                            <td className="px-8 py-6">{4 - i}</td>
                                            <td className="px-8 py-6">{i}</td>
                                            <td className="px-8 py-6 text-secondary font-black">{(4 - i) * 2}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Footer Disclaimer */}
                <div className="mt-20 text-center opacity-30 pb-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] italic">Referee & Organizer decisions are final and binding in all match matters.</p>
                </div>
            </div>
        </div>
    );
};

export default RuleBook;
