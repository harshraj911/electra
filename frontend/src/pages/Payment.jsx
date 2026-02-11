import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPaymentSettings, register } from '../api';
import DynamicQR from '../components/DynamicQR';

const Payment = () => {
    const logo = "/logo.png";
    const navigate = useNavigate();
    const location = useLocation();
    const [logoError, setLogoError] = useState(false);
    const [screenshot, setScreenshot] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [upiId, setUpiId] = useState('anshulbhuria2006-1@oksbi'); // Default fallback
    const [isRevealed, setIsRevealed] = useState(false);

    const [payeeName, setPayeeName] = useState('Anshul Bhuria');

    useEffect(() => {
        if (!location.state?.regData) {
            navigate('/register');
            return;
        }
        setTimeout(() => setIsRevealed(true), 100);

        getPaymentSettings().then(res => {
            if (res.data.upi_id) setUpiId(res.data.upi_id);
        }).catch(err => console.error("Gateway Offline", err));
    }, [location, navigate]);

    const regData = location.state?.regData || { game: 'Badminton', teamType: 'Single' };

    // Fee logic updated to user's new request
    const getPrice = () => {
        if (regData.game === 'Badminton') {
            return regData.teamType === 'Single' ? 59 : 99;
        }
        if (regData.game === 'Volleyball') {
            return regData.teamType === 'Single' ? 79 : 499;
        }
        return 0;
    };

    const price = getPrice();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setScreenshot(e.target.files[0]);
        }
    };

    const handleFinalize = async () => {
        if (!screenshot) {
            alert('Security Protocol: Please upload your payment receipt for manual verification.');
            return;
        }

        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('regData', JSON.stringify(regData));
        formData.append('screenshot', screenshot);

        try {
            const res = await register(formData);
            const { unique_id } = res.data;
            navigate('/success', {
                state: {
                    uniqueId: unique_id,
                    game: regData.game,
                    teamType: regData.teamType
                }
            });
        } catch (err) {
            const errorMsg = err.response?.data?.error || "Connection failure with backend servers.";
            alert(`SUBMISSION FAILED: ${errorMsg}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-6 relative overflow-hidden font-sans">

            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/10 blur-[250px] -z-10 animate-pulse"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]"></div>
            </div>

            <div className={`w-full max-w-5xl transition-all duration-1000 ${isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>

                <div className="text-center mb-10 sm:mb-16">
                    <div className="flex justify-center mb-6 sm:mb-8">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 glass-morphism rounded-2xl sm:rounded-3xl flex items-center justify-center border-white/20 shadow-2xl overflow-hidden cursor-pointer hover:scale-110 transition-all duration-500 relative z-10" onClick={() => navigate('/')}>
                            {!logoError ? (
                                <img src={logo} alt="Electra" className="w-full h-full object-contain p-3 sm:p-4 transition-transform duration-700" onError={() => setLogoError(true)} />
                            ) : (
                                <span className="font-black italic text-3xl sm:text-4xl text-primary">E</span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        <p className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.5em] sm:tracking-[0.8em] text-cyan-400 mb-1 sm:mb-2 italic">Phase 02: Settlement</p>
                        <h2 className="font-accent text-4xl sm:text-5xl md:text-6xl italic tracking-tighter uppercase mb-4 sm:mb-6 leading-none">SECURE <span className="text-primary text-glow-cyan">VAULT</span></h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-stretch">

                    {/* Left Panel: DYNAMIC UPI QR */}
                    <DynamicQR
                        game={regData.game}
                        teamType={regData.teamType}
                        upiId={upiId}
                        payeeName={payeeName}
                        amount={price}
                    />

                    {/* Right Panel: Proof Upload */}
                    <div className="glass-morphism p-6 sm:p-10 flex flex-col justify-between border-t-8 border-t-lime-500 rounded-[2rem] sm:rounded-[2.5rem]">
                        <div className="space-y-6 sm:space-y-8">
                            <h4 className="font-accent text-2xl sm:text-3xl italic tracking-tighter uppercase leading-none text-white/90">TRANSMIT <span className="text-lime-400">RECEIPT</span></h4>

                            <div className="relative group min-h-[200px] sm:min-h-[250px] flex">
                                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                                <div className={`flex-1 border-2 border-dashed rounded-[1.5rem] sm:rounded-[2rem] flex flex-col items-center justify-center p-6 sm:p-8 transition-all ${screenshot ? 'border-lime-500 bg-lime-500/5' : 'border-white/10 group-hover:border-white/30 bg-white/5'}`}>
                                    {screenshot ? (
                                        <div className="text-center space-y-3 sm:space-y-4 animate-fade-in-up">
                                            <div className="text-4xl sm:text-5xl text-lime-400">✔</div>
                                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-lime-400 truncate max-w-[150px] sm:max-w-[200px]">{screenshot.name}</p>
                                        </div>
                                    ) : (
                                        <div className="text-center space-y-4 sm:space-y-6">
                                            <div className="text-5xl sm:text-6xl opacity-10">📸</div>
                                            <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white/20">Upload Screenshot</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleFinalize}
                            disabled={isSubmitting || !screenshot}
                            className={`w-full py-6 sm:py-8 btn-premium text-lg sm:text-2xl mt-8 sm:mt-0 transition-all ${!screenshot ? 'opacity-20 grayscale cursor-not-allowed' : 'hover:scale-[1.02]'}`}
                        >
                            <span className="relative z-10 font-black italic tracking-widest leading-none">
                                {isSubmitting ? 'UPLOADING...' : 'FINALIZE REGISTRATION →'}
                            </span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Payment;
