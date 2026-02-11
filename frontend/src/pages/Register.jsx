import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const logo = "/logo.png";
    const navigate = useNavigate();
    const GAMES = ['Badminton', 'Volleyball'];
    const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
    const GENDERS = ['Male', 'Female', 'Other'];

    const [loading, setLoading] = useState(false);
    const [logoError, setLogoError] = useState(false);
    const [formData, setFormData] = useState({ game: '', teamType: '', teamName: '', players: [] });
    const [errors, setErrors] = useState({});
    const [step, setStep] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleGameChange = (e) => {
        setFormData({ ...formData, game: e.target.value, teamType: '', players: [] });
        setErrors({});
        setStep(2);
    };

    const handleTeamTypeChange = (e) => {
        const type = e.target.value;
        let count = 0;
        if (type === 'Single') count = 1;
        else if (formData.game === 'Badminton' && type === 'Duo') count = 2;
        else if (formData.game === 'Volleyball' && type === 'Team of 6') count = 8;

        const players = Array.from({ length: count }, () => ({ name: '', regNo: '', year: '', whatsapp: '', gender: '' }));
        setFormData({ ...formData, teamType: type, players });
        setStep(3);
    };

    const handlePlayerChange = (index, field, value) => {
        const players = [...formData.players];
        players[index][field] = value;
        setFormData({ ...formData, players });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.game) newErrors.game = 'Required';
        if (!formData.teamType) newErrors.teamType = 'Required';
        if (formData.teamType !== 'Single' && !formData.teamName.trim()) newErrors.teamName = 'Required';

        formData.players.forEach((p, i) => {
            if (!p.name.trim()) newErrors[`p${i}n`] = true;
            if (!p.regNo.trim()) newErrors[`p${i}r`] = true;
            if (!p.year) newErrors[`p${i}y`] = true;
            if (!p.gender) newErrors[`p${i}g`] = true;
            if (!p.whatsapp || !/^\d{10}$/.test(p.whatsapp)) newErrors[`p${i}w`] = true;
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            alert('Please check all input fields. All player data is mandatory.');
            return;
        }
        navigate('/payment', { state: { regData: formData } });
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white py-10 px-6 relative overflow-hidden selection:bg-primary selection:text-black font-sans">

            {/* Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[200px] -z-10 animate-morph opacity-40"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[180px] -z-10 animate-morph opacity-30" style={{ animationDelay: '-5s' }}></div>

            <div className={`max-w-5xl mx-auto relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                <header className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
                    <div className="relative mb-10 group">
                        <div className="absolute inset-0 scale-150 bg-primary/20 rounded-full animate-pulse-ring"></div>
                        <div
                            className="w-20 h-20 glass-morphism rounded-[1.8rem] flex items-center justify-center border-white/20 shadow-2xl overflow-hidden cursor-pointer hover:scale-110 active:scale-95 transition-all duration-500 relative z-10"
                            onClick={() => navigate('/')}
                        >
                            {!logoError ? (
                                <img src={logo} alt="Electra" className="w-full h-full object-contain p-4 group-hover:rotate-[360deg] transition-transform duration-1000" onError={() => setLogoError(true)} />
                            ) : (
                                <span className="font-black italic text-3xl text-primary animate-glitch">E</span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.8em] text-primary/60 mb-1 italic animate-shimmer bg-clip-text">System Enrollment Protocol</p>
                        <h1 className="font-accent text-4xl md:text-5xl text-white italic tracking-tighter leading-none relative drop-shadow-[0_0_15px_rgba(6,182,212,0.3)] uppercase">
                            Entry <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-shimmer bg-[length:200%_auto]">Manifest</span>
                            <div className="h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2 overflow-hidden relative">
                                <div className="absolute inset-0 bg-white/50 w-20 animate-scanner"></div>
                            </div>
                        </h1>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-12">

                    {/* Section 01: Event Formation */}
                    <div className={`glass-morphism p-8 md:p-10 rounded-[2.5rem] border-l-[8px] border-l-primary transition-all duration-700 shadow-2xl group/card relative overflow-hidden ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-20 blur-sm translate-y-10'}`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>

                        <div className="flex items-center gap-6 mb-10 relative z-10">
                            <div className="text-4xl font-black italic opacity-10 text-white leading-none">01</div>
                            <div>
                                <h3 className="font-accent text-2xl md:text-3xl italic tracking-tighter uppercase leading-none">Formation <span className="text-primary text-glow-cyan">System</span></h3>
                                <div className="w-12 h-1 bg-primary mt-2 group-hover/card:w-24 transition-all duration-700"></div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            <div className="group/input space-y-3">
                                <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 group-hover/input:text-primary transition-colors">Combat Discipline</label>
                                <div className="relative">
                                    <select value={formData.game} onChange={handleGameChange} className="input-field text-lg font-black italic h-16 pl-6 appearance-none bg-black/40 hover:bg-black/60 cursor-pointer">
                                        <option value="" className="bg-[#020617] text-white">SELECT ARENA</option>
                                        {GAMES.map(g => <option key={g} value={g} className="bg-[#020617] text-white">{g.toUpperCase()}</option>)}
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50 text-xs">▼</div>
                                </div>
                            </div>

                            {formData.game && (
                                <div className="group/input space-y-3 animate-fade-in-up">
                                    <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 group-hover/input:text-primary transition-colors">Squad Formation</label>
                                    <div className="relative">
                                        <select value={formData.teamType} onChange={handleTeamTypeChange} className="input-field text-lg font-black italic h-16 pl-6 appearance-none bg-black/40 hover:bg-black/60 cursor-pointer">
                                            <option value="" className="bg-[#020617] text-white">SELECT TYPE</option>
                                            <option value="Single" className="bg-[#020617] text-white">SOLO (Agent)</option>
                                            {formData.game === 'Badminton' && <option value="Duo" className="bg-[#020617] text-white">DUO (Tag-Team)</option>}
                                            {formData.game === 'Volleyball' && <option value="Team of 6" className="bg-[#020617] text-white">6-MAN SQUAD (+2 SUBS)</option>}
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-primary/50 text-xs">▼</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {formData.teamType && formData.teamType !== 'Single' && (
                            <div className="mt-8 group/input space-y-3 animate-fade-in-up relative z-10">
                                <label className="text-[9px] font-black uppercase tracking-[0.5em] text-white/30 group-hover/input:text-primary transition-colors">Squad Identification (Team Name)</label>
                                <input type="text" value={formData.teamName} onChange={(e) => setFormData({ ...formData, teamName: e.target.value })} placeholder="CODE NAME..." className="input-field text-lg font-black italic h-16 pl-6 bg-black/40" />
                            </div>
                        )}
                    </div>

                    {/* Section 02: Personnel Roster */}
                    {formData.players.length > 0 && (
                        <div className={`space-y-10 transition-all duration-1000 ${step >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
                            <div className="flex items-center gap-6 px-4">
                                <div className="text-4xl font-black italic opacity-10 text-white">02</div>
                                <h3 className="font-accent text-2xl md:text-3xl italic tracking-tighter uppercase leading-none">Personnel <span className="text-secondary text-glow-lime">Roster</span></h3>
                                <div className="flex-1 h-[1px] bg-gradient-to-r from-secondary/30 via-transparent to-transparent"></div>
                            </div>

                            <div className="grid gap-8">
                                {formData.players.map((p, i) => (
                                    <div key={i} className="group/player relative glass-morphism p-8 rounded-[2rem] border border-white/5 hover:border-primary/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
                                        {/* Dynamic Label: Show Substitute for 7th and 8th players in Volleyball */}
                                        <div className="absolute top-6 right-8 text-6xl font-black italic text-white/[0.02] group-hover/player:text-primary/5 transition-colors pointer-events-none">
                                            {formData.game === 'Volleyball' && i >= 6 ? `SUB-${i - 5}` : `#${i + 1}`}
                                        </div>

                                        {/* Substitute Banner */}
                                        {formData.game === 'Volleyball' && i >= 6 && (
                                            <div className="absolute top-0 right-0 bg-secondary/20 text-secondary text-[10px] font-black px-4 py-1 rounded-bl-xl rounded-tr-[2rem] border-b border-l border-secondary/20">
                                                RESERVE UNIT
                                            </div>
                                        )}

                                        <div className="grid lg:grid-cols-2 gap-8 relative z-10">
                                            <div className="space-y-1 group/field">
                                                <label className="text-[8px] font-black uppercase text-white/30 tracking-[0.4em] group-hover/field:text-primary transition-colors italic">Full Identity</label>
                                                <input type="text" value={p.name} onChange={(e) => handlePlayerChange(i, 'name', e.target.value)} className={`bg-transparent border-b w-full py-2 outline-none font-bold text-lg italic transition-all ${errors[`p${i}n`] ? 'border-red-500' : 'border-white/10 focus:border-primary'}`} placeholder="AGENT NAME" />
                                            </div>
                                            <div className="space-y-1 group/field">
                                                <label className="text-[8px] font-black uppercase text-white/30 tracking-[0.4em] group-hover/field:text-primary transition-colors italic">Registry Number (ID)</label>
                                                <input type="text" value={p.regNo} onChange={(e) => handlePlayerChange(i, 'regNo', e.target.value)} className={`bg-transparent border-b w-full py-2 outline-none font-bold text-lg italic transition-all ${errors[`p${i}r`] ? 'border-red-500' : 'border-white/10 focus:border-primary'}`} placeholder="ID-000XXX" />
                                            </div>

                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-1 group/field">
                                                    <label className="text-[8px] font-black uppercase text-white/30 tracking-[0.4em] group-hover/field:text-primary transition-colors italic">Service Year</label>
                                                    <select value={p.year} onChange={(e) => handlePlayerChange(i, 'year', e.target.value)} className={`bg-transparent border-b w-full py-2 outline-none font-bold text-sm italic transition-all cursor-pointer ${errors[`p${i}y`] ? 'border-red-500' : 'border-white/10 focus:border-primary'}`}>
                                                        <option value="" className="bg-black text-white">SELECT</option>
                                                        {YEARS.map(y => <option key={y} value={y} className="bg-black text-white">{y}</option>)}
                                                    </select>
                                                </div>
                                                <div className="space-y-1 group/field">
                                                    <label className="text-[8px] font-black uppercase text-white/30 tracking-[0.4em] group-hover/field:text-primary transition-colors italic">Sex</label>
                                                    <select value={p.gender} onChange={(e) => handlePlayerChange(i, 'gender', e.target.value)} className={`bg-transparent border-b w-full py-2 outline-none font-bold text-sm italic transition-all cursor-pointer ${errors[`p${i}g`] ? 'border-red-500' : 'border-white/10 focus:border-primary'}`}>
                                                        <option value="" className="bg-black text-white">SELECT</option>
                                                        {GENDERS.map(g => <option key={g} value={g} className="bg-black text-white">{g}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-1 group/field">
                                                <label className="text-[8px] font-black uppercase text-white/30 tracking-[0.4em] group-hover/field:text-primary transition-colors italic">WhatsApp</label>
                                                <input type="text" value={p.whatsapp} onChange={(e) => handlePlayerChange(i, 'whatsapp', e.target.value)} maxLength={10} className={`bg-transparent border-b w-full py-2 outline-none font-bold text-lg italic transition-all ${errors[`p${i}w`] ? 'border-red-500' : 'border-white/10 focus:border-primary'}`} placeholder="10-DIGIT MOBILE" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={`flex justify-center pt-6 transition-all duration-1000 ${formData.players.length > 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'}`}>
                        <button
                            type="submit"
                            className="btn-premium w-full md:w-[400px] py-6 text-xl group transition-all hover:scale-[1.02] active:scale-95 shadow-lg border-2 border-white/10"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4 italic font-black">
                                PROCEED TO PAYMENT →
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
