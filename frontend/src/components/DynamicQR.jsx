import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';

const DynamicQR = ({ game, teamType, upiId = "7888778370@ybl", payeeName = "Harsh Raj", amount = 0 }) => {
    const qrRef = useRef();

    // Amount is now passed from parent based on centralized logic in Payment.jsx
    const note = `Ground Clash - ${game} ${teamType}`;

    // UPI payment link format: upi://pay?pa=UPI_ID&pn=PAYEE_NAME&am=AMOUNT&cu=INR&tn=NOTE
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}.00&cu=INR&tn=${encodeURIComponent(note)}&mode=02&purpose=00`;

    const downloadQR = () => {
        const canvas = qrRef.current.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL("image/png");
            const link = document.createElement('a');
            link.href = url;
            link.download = `Electra_QR_${game}_${teamType}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 sm:gap-6 p-6 sm:p-8 glass-morphism rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 animate-fade-in-up">
            <div className="relative group p-3 sm:p-4 bg-white rounded-2xl sm:rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500" id="qr-container" ref={qrRef}>
                <a href={upiLink} className="block relative">
                    <QRCodeCanvas
                        value={upiLink}
                        size={window.innerWidth < 640 ? 200 : 250}
                        level="H"
                        includeMargin={true}
                        imageSettings={{
                            src: "/logo.png",
                            x: undefined,
                            y: undefined,
                            height: window.innerWidth < 640 ? 45 : 60,
                            width: window.innerWidth < 640 ? 45 : 60,
                            excavate: true,
                        }}
                    />

                    {/* Scanner animation overlay */}
                    <div className="absolute inset-x-0 h-1 bg-primary/60 animate-scanner top-0 left-0 shadow-[0_0_15px_rgba(6,182,212,0.8)] pointer-events-none"></div>
                </a>
            </div>

            <div className="text-center space-y-2 sm:space-y-3 w-full">
                <div className="px-4 py-1 sm:px-6 sm:py-2 bg-primary/10 rounded-full inline-block border border-primary/20">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary italic">Payable Arena Pass</span>
                </div>

                <h4 className="font-accent text-4xl sm:text-5xl italic text-white text-glow-cyan leading-none">₹{amount}</h4>

                <div className="space-y-1">
                    <p className="text-[10px] sm:text-[11px] font-black uppercase text-white/40 tracking-[0.1em] sm:tracking-[0.2em]">{payeeName}</p>
                    <p className="text-[8px] sm:text-[9px] font-bold text-primary italic underline underline-offset-4 decoration-primary/20">{upiId}</p>
                </div>

                <div className="bg-white/5 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 mt-3 sm:mt-4">
                    <p className="text-[7px] sm:text-[8px] font-black uppercase text-white/20 tracking-widest mb-1">Transaction Protocol</p>
                    <p className="text-[10px] sm:text-[11px] font-bold text-white/80 italic">{note}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-2">
                <a
                    href={upiLink}
                    className="flex-1 py-4 bg-primary text-black text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all active:scale-95 shadow-[0_4px_15px_rgba(6,182,212,0.4)]"
                >
                    <span className="text-base">⚡</span> INSTANT PAY
                </a>
                <button
                    onClick={downloadQR}
                    className="flex-1 py-4 glass-morphism border-primary/30 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:bg-primary/10 transition-all rounded-xl sm:rounded-2xl active:scale-95 flex items-center justify-center gap-2"
                >
                    <span className="text-base">💾</span> DOWNLOAD PASS
                </button>
            </div>

            <p className="text-[7px] sm:text-[8px] font-bold uppercase text-white/20 tracking-[0.05em] sm:tracking-[0.1em] italic text-center">
                Branded Dynamic QR with Electra Security Protocol
            </p>
        </div>
    );
};

export default DynamicQR;
