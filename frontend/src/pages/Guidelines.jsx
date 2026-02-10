import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Guidelines = () => {
    const navigate = useNavigate();
    const [logoError, setLogoError] = useState(false);
    const logo = "/logo.png";

    const sections = [
        {
            icon: "👕",
            title: "Team Dress Code",
            items: [
                "All players of a team must wear the same color jersey/dress.",
                "Mixed or mismatched colors within a team are not allowed.",
                "Dress should be appropriate for indoor sports and allow free movement."
            ],
            color: "border-primary"
        },
        {
            icon: "👟",
            title: "Footwear Rules",
            items: [
                "Players must wear non-marking indoor shoes OR play barefoot (commonly allowed for volleyball).",
                "Shoes with hard soles, spikes, or that leave marks on the floor are strictly prohibited.",
                "Footwear must be clean and dry before entering the court."
            ],
            color: "border-secondary"
        },
        {
            icon: "🏸",
            title: "Badminton Specifics",
            items: [
                "Rackets must meet standard badminton regulations.",
                "Shuttlecock type (feather or synthetic) will be decided by the organizers."
            ],
            color: "border-primary"
        },
        {
            icon: "🏐",
            title: "Volleyball Specifics",
            items: [
                "Playing barefoot or with non-marking shoes is allowed.",
                "Knee pads and ankle supports are permitted.",
                "Players must maintain proper rotation and follow official volleyball rules."
            ],
            color: "border-secondary"
        },
        {
            icon: "🛡️",
            title: "Safety & Equipment",
            items: [
                "No watches, rings, chains, bracelets, or sharp accessories are allowed during play.",
                "Nails must be trimmed properly.",
                "Protective gear is allowed if it does not endanger other players."
            ],
            color: "border-primary"
        },
        {
            icon: "🤝",
            title: "Discipline & Conduct",
            items: [
                "Players must respect referees, opponents, and officials at all times.",
                "Abusive language, aggressive behavior, or cheating will result in penalties or disqualification.",
                "Fair play and sportsmanship are mandatory."
            ],
            color: "border-secondary"
        },
        {
            icon: "⏰",
            title: "Reporting & Match Rules",
            items: [
                "Teams must report 15–20 minutes before the scheduled match time.",
                "Late arrival may lead to match forfeiture.",
                "Match rules and scoring format will be announced before the event."
            ],
            color: "border-primary"
        },
        {
            icon: "⚖️",
            title: "Authority",
            items: [
                "The organizing committee’s decision will be final in all matters."
            ],
            color: "border-secondary"
        },
        {
            icon: "🌍",
            title: "Squad Diversity Rules",
            items: [
                "For Team of 6: No more than 2 members can belong to the same state (Example: 2 from JK, 2 from UP, 2 from Kerala).",
                "Foreign Citizens: No more than 2 players can belong to the same country.",
                "Substitute Exception: The 2 substitutes in a squad can belong to any state/country without restrictions."
            ],
            color: "border-primary"
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] text-white py-12 px-6 relative overflow-hidden font-sans">
            {/* Cinematic Backgrounds */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/5 blur-[150px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] bg-secondary/5 blur-[150px] -z-10 animate-pulse"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <header className="flex flex-col items-center text-center mb-20 animate-fade-in-up">
                    <div
                        className="w-20 h-20 glass-morphism rounded-3xl flex items-center justify-center border-white/20 shadow-2xl overflow-hidden cursor-pointer hover:scale-110 active:scale-95 transition-all duration-500 mb-8"
                        onClick={() => navigate('/')}
                    >
                        {!logoError ? (
                            <img src={logo} alt="Electra" className="w-full h-full object-contain p-3" onError={() => setLogoError(true)} />
                        ) : (
                            <span className="font-black italic text-4xl text-primary">E</span>
                        )}
                    </div>
                    <p className="text-[12px] font-black uppercase tracking-[0.8em] text-primary/60 mb-2 italic">Official Protocol</p>
                    <h1 className="font-accent text-5xl md:text-7xl text-white italic tracking-tighter uppercase mb-4 leading-none text-glow-cyan">INDOOR STADIUM <br /> <span className="text-secondary text-glow-lime">GUIDELINES</span></h1>
                    <p className="text-[14px] font-bold uppercase tracking-[0.4em] text-white/30 italic">(For Badminton & Volleyball)</p>
                </header>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap justify-center gap-6 mb-20 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <button onClick={() => navigate('/')} className="px-8 py-4 glass-morphism rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all">← Back to Home</button>
                    <button onClick={() => navigate('/register')} className="btn-premium px-10 py-4 text-[10px]">Register Now →</button>
                </div>

                {/* Guidelines Grid */}
                <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    {sections.map((section, idx) => (
                        <div key={idx} className={`group glass-morphism p-8 rounded-[2rem] border-l-8 ${section.color} hover-card-3d relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 p-8 text-7xl opacity-[0.03] group-hover:opacity-10 transition-opacity rotate-12 group-hover:rotate-0">
                                {section.icon}
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="text-3xl">{section.icon}</span>
                                    <h3 className="font-accent text-2xl italic tracking-tighter uppercase">{section.title}</h3>
                                </div>
                                <ul className="space-y-4">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex gap-4 text-[11px] font-bold uppercase tracking-widest text-white/50 leading-relaxed italic">
                                            <span className="text-primary">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Authority Footer */}
                <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <div className="inline-block glass-morphism px-10 py-6 rounded-full border-primary/20 italic">
                        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 leading-none">The organizing committee’s decision will be final in all matters.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guidelines;
