import { useEffect, useState, useMemo } from 'react';
import { getRegistrations, downloadExcel, clearData, getPaymentSettings, updatePaymentSettings, uploadQR } from '../api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const logo = "/logo.png";
    const [logoError, setLogoError] = useState(false);
    const navigate = useNavigate();
    const [registrations, setRegistrations] = useState([]);
    const [gameFilter, setGameFilter] = useState('All');
    const [search, setSearch] = useState('');

    const [upiId, setUpiId] = useState('');
    const [qrPreview, setQrPreview] = useState('');
    const [isSavingSettings, setIsSavingSettings] = useState(false);

    const [selectedSS, setSelectedSS] = useState(null);

    const fetchData = async () => {
        try {
            const res = await getRegistrations();
            setRegistrations(res.data);

            const settings = await getPaymentSettings();
            setUpiId(settings.data.upi_id);
            setQrPreview(settings.data.qr_image);
        } catch (err) { console.error(err); }
    };

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) { navigate('/admin/login'); return; }
        fetchData();
    }, [navigate]);

    const filteredWaitlist = useMemo(() => {
        let result = registrations;
        if (gameFilter !== 'All') result = result.filter(r => r.game === gameFilter);
        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(r =>
                r.teamName?.toLowerCase().includes(lowerSearch) ||
                r.players.some(p => p.name.toLowerCase().includes(lowerSearch) || p.regNo.toLowerCase().includes(lowerSearch))
            );
        }
        return result;
    }, [gameFilter, search, registrations]);

    const handleDownload = async () => {
        try {
            const response = await downloadExcel();
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ground_clash_data.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) { alert('Export Failed'); }
    };

    const handleClearData = async () => {
        if (window.confirm("☢️ CRITICAL ACTION: This will delete all registrations including screenshots. Proceed?")) {
            try {
                await clearData();
                setRegistrations([]);
                alert("Database reset.");
            } catch (err) { alert("Action failed."); }
        }
    };

    const handleUpdateSettings = async () => {
        setIsSavingSettings(true);
        try {
            await updatePaymentSettings({ upi_id: upiId, qr_image: qrPreview });
            alert("Updated.");
        } catch (err) { alert("Failed."); }
        setIsSavingSettings(false);
    };

    const handleQRUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await uploadQR(formData);
            setQrPreview(res.data.url);
        } catch (err) { alert("Upload failed."); }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans relative">

            {/* Modal for Screenshot View */}
            {selectedSS && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-10 animate-fade-in" onClick={() => setSelectedSS(null)}>
                    <div className="max-w-4xl w-full h-full flex flex-col items-center">
                        <img src={selectedSS} alt="Payment Proof" className="max-w-full max-h-[80vh] object-contain border-4 border-white/20 shadow-2xl" />
                        <button onClick={() => setSelectedSS(null)} className="mt-8 px-10 py-4 btn-premium text-lg font-black italic">CLOSE TRANSMISSION</button>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto space-y-12">
                <header className="flex flex-col md:flex-row justify-between items-center gap-8 animate-fade-in-up">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 glass-morphism rounded-2xl p-2 flex items-center justify-center border-white/20 shadow-2xl overflow-hidden hover:scale-110 transition-transform cursor-pointer" onClick={() => navigate('/')}>
                            {!logoError ? (
                                <img src={logo} alt="Electra" className="w-full h-full object-contain p-2" onError={() => setLogoError(true)} />
                            ) : (
                                <span className="font-black italic text-4xl text-primary">E</span>
                            )}
                        </div>
                        <div>
                            <h2 className="font-accent text-4xl italic tracking-tighter uppercase leading-none">COMMAND <span className="text-primary">CENTRE</span></h2>
                            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 mt-2">Ground Clash 2.0 Live Intelligence</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleDownload} className="px-8 py-3 glass-morphism font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">Export XLSX</button>
                        <button onClick={handleClearData} className="px-8 py-3 bg-red-600/10 border border-red-500/50 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 hover:text-white transition-all">Clear All</button>
                        <button onClick={() => { localStorage.removeItem('isAdmin'); navigate('/admin/login'); }} className="px-8 py-3 bg-white/5 border border-white/10 font-black uppercase text-[10px] tracking-widest hover:bg-white/10">Exit</button>
                    </div>
                </header>

                <div className="grid lg:grid-cols-4 gap-12">
                    {/* Main List */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="flex flex-col md:flex-row gap-6">
                            <input type="text" placeholder="FILTER ROSTER..." className="flex-grow bg-white/5 border border-white/10 p-4 outline-none focus:border-primary font-black uppercase text-xs tracking-widest" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <select className="bg-white/5 border border-white/10 p-4 outline-none font-black text-xs uppercase tracking-widest w-48" value={gameFilter} onChange={(e) => setGameFilter(e.target.value)}>
                                <option value="All" className="bg-black">All Sports</option>
                                <option value="Badminton" className="bg-black">Badminton</option>
                                <option value="Volleyball" className="bg-black">Volleyball</option>
                            </select>
                        </div>

                        <div className="glass-morphism overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/30">
                                        <th className="p-6">Game / Type</th>
                                        <th className="p-6">Squad / Proof</th>
                                        <th className="p-6">Operational Roster</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredWaitlist.map((reg, idx) => (
                                        <tr key={idx} className="hover:bg-white/5 transition-all group">
                                            <td className="p-6">
                                                <p className="font-accent text-xl italic text-primary uppercase">{reg.game}</p>
                                                <p className="text-[10px] font-black text-white/20 mt-1 uppercase tracking-widest">{reg.teamType}</p>
                                                <p className="text-[9px] font-bold text-white/10 mt-2 italic">{reg.timestamp}</p>
                                            </td>
                                            <td className="p-6 space-y-4">
                                                <p className="font-accent text-lg italic text-white/80">{reg.teamName || 'SOLO AGENT'}</p>
                                                {reg.ss_url ? (
                                                    <button onClick={() => setSelectedSS(reg.ss_url)} className="text-[9px] font-black uppercase tracking-widest bg-lime-400/10 text-lime-400 px-4 py-2 border border-lime-400/20 hover:bg-lime-400 hover:text-black transition-all">View Proof</button>
                                                ) : (
                                                    <span className="text-[9px] font-black uppercase tracking-widest bg-white/5 text-white/20 px-4 py-2 opacity-50">No Proof</span>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <div className="grid gap-4">
                                                    {reg.players.map((p, i) => (
                                                        <div key={i} className="bg-white/5 p-4 border border-white/5 flex flex-col gap-2 hover:border-primary/40 transition-all">
                                                            <div className="flex justify-between items-start">
                                                                <span className="text-[11px] font-black italic uppercase text-primary">{p.name}</span>
                                                                <span className="text-[9px] font-bold text-white/20 italic">{p.regNo}</span>
                                                            </div>
                                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                                <p className="text-[10px] font-bold text-white/40 italic">Year: <span className="text-white">{p.year}</span></p>
                                                                <p className="text-[10px] font-bold text-white/40 italic">Sex: <span className="text-white">{p.gender}</span></p>
                                                                <p className="text-[10px] font-bold text-white/40 italic col-span-2">WhatsApp: <span className="text-white">{p.whatsapp}</span></p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Settings Side */}
                    <div className="space-y-8">
                        <div className="glass-morphism p-8 rounded-[2rem] border-t-4 border-t-primary sticky top-12 space-y-10">
                            <div>
                                <h3 className="font-accent text-2xl italic tracking-tighter uppercase leading-none">GATEWAY <br /> <span className="text-primary">CONFIG</span></h3>
                                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mt-3 italic underline underline-offset-4">Vault Settings</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">UPI IDENTIFIER</label>
                                    <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 outline-none focus:border-primary transition-all font-bold italic" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30">QR ASSET</label>
                                    <div className="relative group overflow-hidden bg-black/40 rounded-2xl border-2 border-dashed border-white/10 aspect-square flex flex-col items-center justify-center p-4 hover:border-primary transition-all cursor-pointer">
                                        {qrPreview ? <img src={qrPreview} alt="QR" className="w-full h-full object-contain" /> : <span className="text-[10px] font-black text-white/10">No Asset</span>}
                                        <input type="file" accept="image/*" onChange={handleQRUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    </div>
                                </div>
                                <button onClick={handleUpdateSettings} disabled={isSavingSettings} className="w-full btn-premium py-5 text-sm font-black italic tracking-widest">
                                    {isSavingSettings ? 'SYNCING...' : 'SAVE CONFIG'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
