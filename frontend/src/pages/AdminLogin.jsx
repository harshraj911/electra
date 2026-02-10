import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
    const logo = "/logo.png";
    const [logoError, setLogoError] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (isMobile) {
            setError('ADMIN TERMINAL: DESKTOP AUTHENTICATION REQUIRED');
            return;
        }
        if (username === 'hraj48147' && password === '985250') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('ACCESS DENIED: INVALID CREDENTIALS');
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[200px] -z-10 animate-pulse"></div>

            <div className="w-full max-w-md animate-fade-in-up">
                <div className="text-center mb-12">
                    <button onClick={() => navigate('/')} className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 hover:text-white transition-all mb-8">
                        ← TERMINAL EXIT
                    </button>
                    <div className="flex justify-center mb-4">
                        <div className="w-20 h-20 glass-morphism rounded-3xl p-3 flex items-center justify-center border-white/20 shadow-2xl overflow-hidden hover:scale-110 transition-transform cursor-pointer" onClick={() => navigate('/')}>
                            {!logoError ? (
                                <img src={logo} alt="Electra" className="w-full h-full object-contain p-2" onError={() => setLogoError(true)} />
                            ) : (
                                <span className="font-black italic text-4xl text-primary animate-pulse select-none">E</span>
                            )}
                        </div>
                    </div>
                    <h2 className="font-accent text-5xl italic tracking-tighter uppercase mb-2">AUTH <span className="text-primary text-glow-cyan">LOCK</span></h2>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Secure Personnel Terminal</p>
                </div>

                {isMobile ? (
                    <div className="bg-primary/5 border border-primary/20 p-8 text-center space-y-6 animate-pulse">
                        <div className="text-4xl">🖥️</div>
                        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary italic leading-relaxed">
                            SECURITY PROTOCOL: <br />
                            ADMIN PANEL IS ONLY ACCESSIBLE VIA <br />
                            AUTHORIZED DESKTOP TERMINALS.
                        </p>
                        <button onClick={() => navigate('/')} className="text-[9px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors">
                            RETURN TO MAIN BASE
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className="glass-morphism p-10 space-y-8 rounded-none border-t-4 border-t-primary">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Codename</label>
                                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field text-lg font-bold placeholder:text-white/5" style={{ WebkitTextSecurity: 'disc' }} placeholder="IDENTIFIER" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Security Pattern</label>
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field text-lg font-bold placeholder:text-white/5" placeholder="••••••••" />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border-l-4 border-red-500 p-4 text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn-premium w-full mt-4 py-5 text-xl">
                            AUTHENTICATE →
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
